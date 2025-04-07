import { X } from "lucide-react";
import "./Modal.css";
import Button from "../Button";
import { Task, Priority } from "../Routes/AllTasks";
import { useEffect, useState } from "react";
import { RootState } from "../../Store";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../Services/Services";
import { Snackbar_Open } from "../../Store/Slices/SnackbarSlice";

interface props {
  closeFunction: React.Dispatch<React.SetStateAction<boolean>>;
  Task: Task;
  onEditSuccess: (updatedTask: Task) => void;
}
function EditModal(props: props) {
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditableTask({ ...editableTask, [e.target.name]: e.target.value });
  }
  const { user } = useSelector((state: RootState) => state.auth);
  const [editableTask, setEditableTask] = useState<Task>(props.Task);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const dispatch = useDispatch();
  function handleSubmit() {
    setIsSubmitting(true);
    if (!user?.token) {
      dispatch(
        Snackbar_Open({ message: "Authentication Error", type: "error" })
      );
      return;
    }
    updateTask(editableTask.id.toString(), editableTask, user?.token)
      .then(() => {
        props.closeFunction(false);
        props.onEditSuccess(editableTask);
        dispatch(
          Snackbar_Open({ message: "Updated Successfully", type: "success" })
        );
      })
      .catch((err) => {
        let errormessage;
        if (err.response.error) {
          errormessage = err.response.error;
        } else {
          errormessage = "Failed to update task";
        }
        dispatch(Snackbar_Open({ message: errormessage, type: "error" }));
      })
      .finally(() => setIsSubmitting(false));
  }
  const isTasksEqual = (task1: Task, task2: Task) => {
    return (
      task1.title === task2.title &&
      task1.description === task2.description &&
      task1.priority === task2.priority &&
      task1.status === task2.status &&
      task1.deadline === task2.deadline &&
      task1.additional_notes === task2.additional_notes
    );
  };
  useEffect(() => {
    const TaskChanged = !isTasksEqual(editableTask, props.Task);
    setHasChanged(TaskChanged);
  }, [editableTask]);
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
              value={editableTask.title}
              onChange={(e) => handleOnChange(e)}
            ></input>
            <label>DeadLine</label>
            <input
              name="deadline"
              type="date"
              value={editableTask.deadline}
              onChange={(e) =>
                setEditableTask({ ...editableTask, deadline: e.target.value })
              }
            ></input>
            <label>Priority</label>
            <div className="RadioGroup">
              <input
                type="radio"
                id="AccentRed"
                name="priority"
                value={"Extreme"}
                checked={editableTask.priority === "Extreme"}
                onChange={(e) =>
                  setEditableTask({
                    ...editableTask,
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
                checked={editableTask.priority === "Moderate"}
                onChange={(e) =>
                  setEditableTask({
                    ...editableTask,
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
                checked={editableTask.priority === "Low"}
                onChange={(e) =>
                  setEditableTask({
                    ...editableTask,
                    priority: e.target.value as Priority,
                  })
                }
              />

              <h4>Low</h4>
            </div>
            <label>Description</label>
            <textarea
              value={editableTask.description}
              onChange={(e) =>
                setEditableTask({
                  ...editableTask,
                  description: e.target.value,
                })
              }
            ></textarea>
          </div>
          <div className="Column">
            <label> Image </label>
            <div className="FileChooser">
              <input type="file" className="File"></input>
              <div className="FileImage">Upload Image</div>
              <div className="FileName"></div>
            </div>
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
            disabled={isSubmitting || !hasChanged}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
