import { X } from "lucide-react";
import "./Modal.css";
import Button from "../Button";
import { Dispatch, SetStateAction, useState } from "react";
import { Status, Task } from "../Routes/AllTasks";
import { deleteTask, updateTask } from "../../Services/Services";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { Snackbar_Open } from "../../Store/Slices/SnackbarSlice";
interface props {
  closeFunction: React.Dispatch<React.SetStateAction<boolean>>;
  Task: Task;
  onProgressSuccess: (Taskid: Task) => void;
  ProgressDirection: "forward" | "backward";
}
function ProgressModal(props: props) {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isUpdateing, setIsUpdating] = useState(false);
  const dispatch = useDispatch();
  function handleSubmit() {
    if (!user?.token) {
      dispatch(
        Snackbar_Open({ message: "Authentication Error", type: "error" })
      );
      return;
    }
    setIsUpdating(true);
    const newStatus =
      props.ProgressDirection === "forward" ? nextProgress() : pastProgress();

    const updatedTask = { ...props.Task, status: newStatus };
    updateTask(props.Task.id.toString(), updatedTask, user.token)
      .then((response) => {
        props.onProgressSuccess(updatedTask);
        props.closeFunction(false);
        dispatch(
          Snackbar_Open({
            message: `Task ${
              props.ProgressDirection === "forward" ? "progressed" : "reverted"
            } successfully`,
            type: "success",
          })
        );
      })
      .catch((err) => {
        dispatch(
          Snackbar_Open({
            message: `Failed to ${
              props.ProgressDirection === "forward" ? "progress" : "revert"
            } task`,
            type: "error",
          })
        );
      })
      .finally(() => {
        setIsUpdating(false);
      });
  }
  function nextProgress(): Status {
    if (props.Task.status === "Not Started") {
      return "In Progress";
    } else if (props.Task.status === "In Progress") {
      return "Completed";
    } else {
      return "Completed";
    }
  }
  function pastProgress(): Status {
    if (props.Task.status === "Completed") {
      return "In Progress";
    } else if (props.Task.status === "In Progress") {
      return "Not Started";
    } else {
      return "Not Started";
    }
  }
  return (
    <div className="Modal">
      <div className="Container">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "1rem 1.8rem 0rem 1.8rem",
          }}
        >
          <h3>
            {props.ProgressDirection === "forward" ? "Progress" : "Revert"} Task
            Status
          </h3>
          <X className="ExitIcon" onClick={() => props.closeFunction(false)} />
        </div>
        <p style={{ padding: "0rem 1.8rem" }}>
          Change the status of task "{props.Task.title}" from{" "}
          <span style={{ fontWeight: "bold" }}>{props.Task.status}</span> to{" "}
          <span
            style={{
              fontWeight: "bold",
              color:
                props.ProgressDirection === "forward" ? "#4CAF50" : "#FF6767",
            }}
          >
            {props.ProgressDirection === "forward"
              ? nextProgress()
              : pastProgress()}
          </span>
          ?
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            width: "100%",
            padding: "1rem 1.8rem",
          }}
        >
          <Button
            Text="Cancel"
            BGcolor="#a1a3ab"
            TextColor="white"
            onClick={() => props.closeFunction(false)}
            disabled={isUpdateing}
          ></Button>
          <Button
            Text="Update Status"
            BGcolor="#4CAF50"
            TextColor="white"
            onClick={() => {
              handleSubmit();
            }}
            disabled={isUpdateing}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default ProgressModal;
