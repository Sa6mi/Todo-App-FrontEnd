import { CirclePlus, Ellipsis, Filter, Pencil, Trash2 } from "lucide-react";
import "./scss/Dashboard.css";
import { getTasks } from "../../Services/Services";
import { useState, useEffect } from "react";
import DeleteModal from "../Modals/DeleteModal";
import EditModal from "../Modals/EditModal";
import { RootState } from "../../Store";
import { useSelector } from "react-redux";
import AddModal from "../Modals/AddModal";
import ProgressModal from "../Modals/ProgressModal";
import Button from "../Button";
export type Status = "Completed" | "Not Started" | "In Progress";
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
  const [addModal, setAddModal] = useState(false);
  const [progressModal, setProgressModal] = useState(false);
  const [progressDirection, setProgressDirection] = useState<
    "forward" | "backward"
  >("forward");
  const [statusFilter, setStatusFilter] = useState<Status | "">("");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "">("");
  const [showFilters, setShowFilters] = useState(false);
  const statusOptions: Status[] = ["Not Started", "In Progress", "Completed"];
  const priorityOptions: Priority[] = ["Low", "Moderate", "Extreme"];
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

  const clearFilters = () => {
    setStatusFilter("");
    setPriorityFilter("");
  };
  const getFilteredCount = () => {
    const total = tasks.length;
    const filtered = filteredTasks.length;
    return filtered === total
      ? `${filtered} tasks`
      : `${filtered} of ${total} tasks`;
  };

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter && task.status !== statusFilter) return false;
    if (priorityFilter && task.priority !== priorityFilter) return false;
    return true;
  });

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
      {addModal && (
        <AddModal
          closeFunction={setAddModal}
          onAddSuccess={(newTask: Task) => {
            setTasks((prevTasks) => [...prevTasks, newTask]);
            setCurrentTask(newTask);
            setAddModal(false);
          }}
        />
      )}
      {progressModal && currentTask && (
        <ProgressModal
          Task={currentTask}
          ProgressDirection={progressDirection}
          closeFunction={setProgressModal}
          onProgressSuccess={(updatedTask: Task) => {
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
        <div
          className="Row"
          style={{ justifyContent: "space-between", alignItems: "end" }}
        >
          <h2>My Tasks</h2>
          <div style={{ paddingRight: "2rem", display: "flex", gap: "1rem" }}>
            <Filter
              size={"2.2rem"}
              className="EditIcon"
              fill="white"
              onClick={() => setShowFilters(!showFilters)}
            />
            <CirclePlus
              className="EditIcon"
              size={"2.2rem"}
              fill="white"
              onClick={() => setAddModal(true)}
            />
          </div>
        </div>
        {showFilters && (
          <div
            className="FilterControls"
            style={{
              padding: "0.8rem 2rem 0.8rem 3rem",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "1rem",
              borderBottom: "1px solid #eee",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <label style={{ paddingRight: "0.6rem", fontWeight: "500" }}>
                Status:
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as Status | "")}
                style={{
                  padding: "0.4rem",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">All Statuses</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <label style={{ marginRight: "0.6rem", fontWeight: "500" }}>
                Priority:
              </label>
              <select
                value={priorityFilter}
                onChange={(e) =>
                  setPriorityFilter(e.target.value as Priority | "")
                }
                style={{
                  padding: "0.4rem",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">All Priorities</option>
                {priorityOptions.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
            <div
              style={{ marginLeft: "auto", fontSize: "0.9rem", color: "#666" }}
            >
              {getFilteredCount()}
            </div>
          </div>
        )}

        <div className="ItemContainer">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => {
              return (
                <div
                  className={
                    "Item" + (task.id === currentTask?.id ? " Selected" : "")
                  }
                  key={task.id}
                  onClick={() => setCurrentTask(task)}
                >
                  <div
                    className="StatusIcon"
                    id={getIconColor(task.priority)}
                  />
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
                      style={{ justifyContent: "space-between" }}
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
            })
          ) : (
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                justifyContent: "center",
                color: "#666",
                fontStyle: "italic",
              }}
            >
              No tasks found matching your filters.
              {(statusFilter || priorityFilter) && (
                <div style={{ marginTop: "1rem" }}>
                  <Button
                    Text="Clear Filters"
                    BGcolor="#FF6767"
                    TextColor="white"
                    onClick={clearFilters}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="Card">
        {currentTask !== undefined ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
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
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "0.4rem 1rem 1rem 1rem",
              }}
            >
              <Button
                onClick={() => {
                  setProgressDirection("backward");
                  setProgressModal(true);
                }}
                disabled={currentTask.status === "Not Started"}
                Text={"Revert Status"}
                BGcolor={"#FF6767"}
                TextColor={"white"}
              ></Button>

              <Button
                onClick={() => {
                  setProgressDirection("forward");
                  setProgressModal(true);
                }}
                disabled={currentTask.status === "Completed"}
                Text={"Progress Status"}
                BGcolor={"#4CAF50"}
                TextColor={"white"}
              ></Button>
            </div>
          </div>
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
