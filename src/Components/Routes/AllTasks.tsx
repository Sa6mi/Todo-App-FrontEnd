import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import "./scss/Dashboard.css";
import getTasks from "../../Services/Services";
import { useState, useEffect } from "react";
import DeleteModal from "../Modals/DeleteModal";
import EditModal from "../Modals/EditModal";
type Status = "Completed" | "Not Started" | "In Progress";
export type Priority = "Extreme" | "Moderate" | "Low";
export interface Task {
  Id: number;
  Title: string;
  Description: string;
  Priority: Priority;
  Status: Status;
  ImageURL: string;
  Date: string;
  AdditionalNotes: string;
  Deadline: string;
}
function getStatusColor(Status: Status): string {
  switch (Status) {
    case "Completed":
      return "Green";
    case "Not Started":
      return "Red";
    case "In Progress":
      return "Blue";
    default:
      throw new Error("Unsupported Status Type");
  }
}
function getPriorityColor(Priority: Priority): string {
  switch (Priority) {
    case "Extreme":
      return "Red";
    case "Moderate":
      return "Blue";
    case "Low":
      return "Green";
    default:
      throw new Error("Unsupported Priority Type");
  }
}
function getIconColor(Priority: Priority): string {
  switch (Priority) {
    case "Extreme":
      return "RedIcon";
    case "Moderate":
      return "BlueIcon";
    case "Low":
      return "GreenIcon";
    default:
      throw new Error("Unsupported Priority Type");
  }
}
function AllTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task>();
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    getTasks()
      .then((data) => setTasks(data.Items))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="AllTasksContainer">
      {modal && <DeleteModal closeFunction={setModal} />}
      {editModal && currentTask && <EditModal closeFunction={setEditModal} Task={currentTask} />}
      <div className="Card">
        <h2>My Tasks</h2>
        <div className="ItemContainer">
          {tasks.map((task) => {
            return (
              <div
                className={
                  "Item" + (task.Id === currentTask?.Id ? " Selected" : "")
                }
                key={task.Id}
                onClick={() => setCurrentTask(task)}
              >
                <div className="StatusIcon" id={getIconColor(task.Priority)} />
                <div className="ItemDetails">
                  <div
                    className="Row"
                    style={{
                      justifyContent: "space-between",
                      paddingTop: "0.6rem",
                    }}
                  >
                    <h4 className="ItemTitle">{task.Title}</h4>
                    <div className="Options">
                      <Ellipsis />
                    </div>
                  </div>
                  <div
                    className="Row"
                    style={{ justifyContent: "space-around" }}
                  >
                    <div className="Description">{task.Description}</div>
                    <div className="ImageContainer">
                      <img
                        src={`./${task.ImageURL}`}
                        alt=""
                        className="Image"
                      />
                    </div>
                  </div>
                  <div className="Row" style={{ gap: "1rem" }}>
                    <div className="Row">
                      <h5 className="BoldedText">Priority:&nbsp;</h5>
                      <h5
                        className="BoldedText"
                        id={getPriorityColor(task.Priority)}
                      >
                        {task.Priority}
                      </h5>
                    </div>
                    <div className="Row" style={{ paddingBottom: "0.4rem" }}>
                      <h5 className="BoldedText">Status:&nbsp;</h5>
                      <h5
                        className="BoldedText"
                        id={getStatusColor(task.Status)}
                      >
                        {task.Status}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="Card">
        {currentTask != undefined ? (
          <>
            <div
              className="Row"
              style={{ justifyContent: "space-between", alignItems: "end" }}
            >
              <h2>Details</h2>
              <div
                className="Row"
                style={{ gap: "1rem", paddingRight: "2rem" }}
              >
                <Pencil className="EditIcon" size={"2.2rem"} fill="white" onClick={()=> setEditModal(true)} />
                <Trash2
                  className="TrashIcon"
                  size={"2.2rem"}
                  fill="white"
                  color="black"
                  onClick={() => setModal(true)}
                />
              </div>
            </div>
            <div className="ItemContainer">
              <div className="Row">
                <div className="FullImageContainer">
                  <img
                    src={`./${currentTask?.ImageURL}`}
                    alt=""
                    className="FullImage"
                  />
                </div>
                <div
                  className="Column"
                  style={{
                    justifyContent: "center",
                    gap: "1rem",
                    paddingTop: "2rem",
                  }}
                >
                  <h3 className="Title">{currentTask?.Title}</h3>
                  <div className="Row">
                    <h5 className="BoldedText">Priority:&nbsp;</h5>
                    <h5
                      className="BoldedText"
                      id={getPriorityColor(currentTask.Priority)}
                    >
                      {currentTask?.Priority}
                    </h5>
                  </div>
                  <div className="Row">
                    <h5 className="BoldedText">Status:&nbsp;</h5>
                    <h5
                      className="BoldedText"
                      id={getStatusColor(currentTask.Status)}
                    >
                      {currentTask?.Status}
                    </h5>
                  </div>
                  <h6 className="Date">Created on:&nbsp;20/6/2023</h6>
                </div>
              </div>
              <h4 className="Pretext">Task Description</h4>
              <p className="Text">{currentTask?.Description}</p>
              <h4 className="Pretext">Additional Notes</h4>
              <p className="Text">{currentTask?.AdditionalNotes} </p>
              <h4 className="Pretext">Deadline for Submission</h4>
              <p className="Text">{currentTask?.Deadline} </p>
            </div>
          </>
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "Inter",
              fontSize: "1.4rem",
              fontWeight: "bold",
            }}
          >
            Choose a task to display details
          </div>
        )}
      </div>
    </div>
  );
}

export default AllTasks;
