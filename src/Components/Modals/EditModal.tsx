import { X } from "lucide-react";
import "./Modal.css";
import Button from "../Button";
import { Task, Priority } from "../Routes/AllTasks";
import { useState } from "react";

interface props {
  closeFunction: React.Dispatch<React.SetStateAction<boolean>>;
  Task: Task;
}
function handleSubmit( editableTask: Task) {
  console.log("Submitted");
  console.log(editableTask);
}
function EditModal(props: props) {
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditableTask({ ...editableTask, [e.target.name]: e.target.value });
  }
  const [editableTask, setEditableTask] = useState<Task>(props.Task);
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
              name="Title"
              type="text"
              value={editableTask.Title}
              onChange={(e) => handleOnChange(e)}
            ></input>
            <label>DeadLine</label>
            <input
              name="Deadline"
              type="date"
              value={editableTask.Deadline}
              onChange={(e) =>
                setEditableTask({ ...editableTask, Deadline: e.target.value })
              }
            ></input>
            <label>Priority</label>
            <div className="RadioGroup">
              <input
                type="radio"
                id="AccentRed"
                name="Priority"
                value={"Extreme"}
                checked={editableTask.Priority === "Extreme"}
                onChange={(e) =>
                  setEditableTask({
                    ...editableTask,
                    Priority: e.target.value as Priority,
                  })
                }
              />

              <h4>Extreme</h4>
              <input
                type="radio"
                id="AccentBlue"
                name="Priority"
                value={"Moderate"}
                checked={editableTask.Priority === "Moderate"}
                onChange={(e) =>
                  setEditableTask({
                    ...editableTask,
                    Priority: e.target.value as Priority,
                  })
                }
              />

              <h4>Moderate</h4>
              <input
                type="radio"
                id="AccentGreen"
                name="Priority"
                value={"Low"}
                checked={editableTask.Priority === "Low"}
                onChange={(e) =>
                  setEditableTask({
                    ...editableTask,
                    Priority: e.target.value as Priority,
                  })
                }
              />

              <h4>Low</h4>
            </div>
            <label>Description</label>
            <textarea
              value={editableTask.Description}
              onChange={(e) =>
                setEditableTask({
                  ...editableTask,
                  Description: e.target.value,
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
          ></Button>
          <Button
            Text="Submit"
            BGcolor="green"
            TextColor="white"
            onClick={() => {
              handleSubmit(editableTask);
              props.closeFunction(false);
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
