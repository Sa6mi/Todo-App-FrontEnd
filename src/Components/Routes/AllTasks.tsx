import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import "./scss/Dashboard.css";
import { getTasks } from "../../Services/Services";
import { useState, useEffect } from "react";
import DeleteModal from "../Modals/DeleteModal";
import EditModal from "../Modals/EditModal";
import { RootState } from "../../Store";
import { useSelector } from "react-redux";
type Status = "Completed" | "Not Started" | "In Progress";
export type Priority = "Extreme" | "Moderate" | "Low";
export interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  image_url: string;
  date: string;
  additional_notes: string;
  deadline: string;
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
function formatDate(dateString: string): string {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (error) {
    console.error("Invalid date format:", dateString);
    return dateString;
  }
}
function AllTasks() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task>();
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    if (user?.id) {
      getTasks(user.id, user.token)
        .then((response) => {
          console.log("API Response:", response);
          setTasks(response);
        })
        .catch((err) => {
          console.error("Error fetching tasks:", err);
        });
    }
  }, [user]);

  return (
    <div className="AllTasksContainer">
      {modal && currentTask && (
        <DeleteModal
          closeFunction={setModal}
          Task={currentTask}
          onDeleteSuccess={() => {
            setTasks((prevTasks) =>
              prevTasks.filter((task) => task.id !== currentTask.id)
            );
            setCurrentTask(undefined);
          }}
        />
      )}
      {editModal && currentTask && (
        <EditModal
          closeFunction={setEditModal}
          Task={currentTask}
          onEditSuccess={(updatedTask: Task) => {
            setTasks((prevTasks) =>
              prevTasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
              )
            );
            setCurrentTask(updatedTask);
          }}
        />
      )}
      <div className="Card">
        <h2>My Tasks</h2>
        <div className="ItemContainer">
          {tasks.map((task) => {
            return (
              <div
                className={
                  "Item" + (task.id === currentTask?.id ? " Selected" : "")
                }
                key={task.id}
                onClick={() => setCurrentTask(task)}
              >
                <div className="StatusIcon" id={getIconColor(task.priority)} />
                <div className="ItemDetails">
                  <div
                    className="Row"
                    style={{
                      justifyContent: "space-between",
                      paddingTop: "0.6rem",
                    }}
                  >
                    <h4 className="ItemTitle">{task.title}</h4>
                    <div className="Options">
                      <Ellipsis />
                    </div>
                  </div>
                  <div
                    className="Row"
                    style={{ justifyContent: "space-around" }}
                  >
                    <div className="Description">{task.description}</div>
                    <div className="ImageContainer">
                      <img
                        src={`./${task.image_url}`}
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
                        id={getPriorityColor(task.priority)}
                      >
                        {task.priority}
                      </h5>
                    </div>
                    <div className="Row" style={{ paddingBottom: "0.4rem" }}>
                      <h5 className="BoldedText">Status:&nbsp;</h5>
                      <h5
                        className="BoldedText"
                        id={getStatusColor(task.status)}
                      >
                        {task.status}
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
                <Pencil
                  className="EditIcon"
                  size={"2.2rem"}
                  fill="white"
                  onClick={() => setEditModal(true)}
                />
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
                    src={`./${currentTask?.image_url}`}
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
                  <h3 className="Title">{currentTask?.title}</h3>
                  <div className="Row">
                    <h5 className="BoldedText">Priority:&nbsp;</h5>
                    <h5
                      className="BoldedText"
                      id={getPriorityColor(currentTask.priority)}
                    >
                      {currentTask?.priority}
                    </h5>
                  </div>
                  <div className="Row">
                    <h5 className="BoldedText">Status:&nbsp;</h5>
                    <h5
                      className="BoldedText"
                      id={getStatusColor(currentTask.status)}
                    >
                      {currentTask?.status}
                    </h5>
                  </div>
                  <h6 className="Date">
                    Created on:&nbsp;{formatDate(currentTask.date)}
                  </h6>
                </div>
              </div>
              <h4 className="Pretext">Task Description</h4>
              <p className="Text">{currentTask?.description}</p>
              <h4 className="Pretext">Additional Notes</h4>
              <p className="Text">{currentTask?.additional_notes} </p>
              <h4 className="Pretext">Deadline for Submission</h4>
              <p className="Text">{formatDate(currentTask?.deadline)} </p>
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
