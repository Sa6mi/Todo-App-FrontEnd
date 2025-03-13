import { Ellipsis } from "lucide-react";
import "./scss/Dashboard.css";
import getTasks from "../../Services/Services";
import { useState, useEffect } from "react";

interface Task {
  Id: number;
  Title: String;
  Description: String;
  Priority: String;
  Status: String;
  ImageURL: String;
  Date: String;
  AdditionalNotes: String;
  Deadline: String;
}
function AllTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task>();

  useEffect(() => {
    getTasks()
      .then((data) => setTasks(data.Items))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="AllTasksContainer">
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
                <div
                  className="StatusIcon"
                  id={task.Id === currentTask?.Id ? "BlueIcon" : "RedIcon"}
                />
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
                      <h5 className="BoldedText" id="Red">
                        {task.Priority}
                      </h5>
                    </div>
                    <div className="Row" style={{ paddingBottom: "0.4rem" }}>
                      <h5 className="BoldedText">Status:&nbsp;</h5>
                      <h5 className="BoldedText" id="Red">
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
                  <h5 className="BoldedText" id="Red">
                    {currentTask?.Priority}
                  </h5>
                </div>
                <div className="Row">
                  <h5 className="BoldedText">Status:&nbsp;</h5>
                  <h5 className="BoldedText" id="Red">
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
          </>
        ) : <div style={{height:"100%",display:"flex",justifyContent:"center",alignItems:"center",fontFamily:"Inter",fontSize:"1.4rem",fontWeight:"bold"}}> Choose a task to display details</div>}
      </div>
    </div>
  );
}

export default AllTasks;
