import { X } from "lucide-react";
import "./Modal.css";
import Button from "../Button";
import { Task, Priority } from "../Routes/AllTasks";
import { useEffect, useState } from "react";
import { RootState } from "../../Store";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask } from "../../Services/Services";
import { Snackbar_Open } from "../../Store/Slices/SnackbarSlice";

interface props {
  closeFunction: React.Dispatch<React.SetStateAction<boolean>>;
  onAddSuccess: (newTask: Task) => void;
}

function AddModal(props: props) {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initDate = () => {
    const date = new Date();
    return date.toISOString().split("T")[0];
  };
  function randomSeed ():string{
    const random = Math.random()*5000;
    return random.toString();
  }
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    priority: "Moderate",
    status: "Not Started",
    deadline: initDate(),
    date: initDate(),
    additional_notes: "",
    image_url: randomSeed(),
  });
  const isFormValid = () => {
    return (
      newTask.title &&
      newTask.title.trim() !== "" &&
      newTask.deadline &&
      newTask.deadline.trim() !== ""
    );
  };
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    setIsSubmitting(true);
    if (!user?.token) {
      dispatch(
        Snackbar_Open({ message: "Authentication Error", type: "error" })
      );
      return;
    }
    createTask(newTask, user.token)
      .then((response) => {
        dispatch(
          Snackbar_Open({
            message: "Task created successfully",
            type: "success",
          })
        );
        props.onAddSuccess(response);
        props.closeFunction(false);
      })
      .catch((err) => {
        let errorMessage = "Failed to create task";
        dispatch(
          Snackbar_Open({
            message: errorMessage,
            type: "error",
          })
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <div className="Modal">
      <div className="Container" style={{ padding: "2rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "1rem 0.4rem 0rem 0.4rem",
          }}
        >
          <h3>Edit Task</h3>
          <X className="ExitIcon" onClick={() => props.closeFunction(false)} />
        </div>
        <form>
          <div className="Column">
            <label>Title</label>
            <input
              name="title"
              type="text"
              value={newTask.title}
              onChange={(e) => handleOnChange(e)}
              placeholder="Task Title"
            ></input>
            <label>DeadLine</label>
            <input
              name="deadline"
              type="date"
              value={newTask.deadline}
              onChange={(e) =>
                setNewTask({ ...newTask, deadline: e.target.value })
              }
            ></input>
            <label>Priority</label>
            <div className="RadioGroup">
              <input
                type="radio"
                id="AccentRed"
                name="priority"
                value={"Extreme"}
                checked={newTask.priority === "Extreme"}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    priority: e.target.value as Priority,
                  })
                }
              />

              <h4>Extreme</h4>
              <input
                type="radio"
                id="AccentBlue"
                name="priority"
                value={"Moderate"}
                checked={newTask.priority === "Moderate"}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    priority: e.target.value as Priority,
                  })
                }
              />

              <h4>Moderate</h4>
              <input
                type="radio"
                id="AccentGreen"
                name="priority"
                value={"Low"}
                checked={newTask.priority === "Low"}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    priority: e.target.value as Priority,
                  })
                }
              />

              <h4>Low</h4>
            </div>
            <label>Description</label>
            <textarea
              value={newTask.description}
              placeholder="Task Description"
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  description: e.target.value,
                })
              }
            ></textarea>
          </div>
        </form>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
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
            disabled={isSubmitting}
          ></Button>
          <Button
            Text="Submit"
            BGcolor="green"
            TextColor="white"
            onClick={handleSubmit}
            disabled={isSubmitting || !isFormValid}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
