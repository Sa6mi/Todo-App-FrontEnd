import { X } from "lucide-react";
import "./Modal.css";
import Button from "../Button";
import { Dispatch, SetStateAction, useState } from "react";
import { Task } from "../Routes/AllTasks";
import { deleteTask } from "../../Services/Services";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { Snackbar_Open } from "../../Store/Slices/SnackbarSlice";
interface props {
  closeFunction: React.Dispatch<React.SetStateAction<boolean>>;
  Task: Task;
  onDeleteSuccess: () => void;
}
function DeleteModal(props: props) {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isUpdateing, setIsUpdating] = useState(false);
  const dispatch = useDispatch();
  function handleDelete(id: string) {
    if (!user?.token) {
      dispatch(
        Snackbar_Open({ message: "Authentication Error", type: "error" })
      );
      return;
    }
    setIsUpdating(true);
    deleteTask(id, user.token)
      .then((response) => {
        props.onDeleteSuccess();
        props.closeFunction(false);
        dispatch(
          Snackbar_Open({
            message: "Task Progressed Successfully",
            type: "success",
          })
        );
      })
      .catch((err) => {
        dispatch(Snackbar_Open({ message: "Failed to progress Task", type: "error" }));
      })
      .finally(() => {
        setIsUpdating(false);
      });
  }
function nextProgress(){
    var nextStatus = "Not Started"
    if (props.Task.status === "Not Started"){
        nextStatus = "In Progress"
    } else if (props.Task.status === "In Progress"){
        nextStatus = "Completed"
    }
    else {
        nextStatus = "Completed"
    }
    return nextStatus
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
          <h3>Progress {props.Task.title} Task ?</h3>
          <X className="ExitIcon" onClick={() => props.closeFunction(false)} />
        </div>
        <p style={{ padding: "0rem 1.8rem" }}>
          Is Task {props.Task.title} 
          <span style={{ color: "red", fontWeight: "bold" }}>{nextProgress()}</span>,
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
            Text="Delete"
            BGcolor="#f21e1e"
            TextColor="white"
            onClick={() => {
              handleDelete(props.Task?.id.toString());
            }}
            disabled={isUpdateing}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
