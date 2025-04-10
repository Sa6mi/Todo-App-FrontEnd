import { useSelector } from "react-redux";
import "./scss/Dashboard.css";
import { useEffect, useMemo, useState } from "react";
import { Task } from "./AllTasks";
import { useNavigate } from "react-router";
import Button from "../Button";
import { RootState } from "../../Store";
import { getTasks } from "../../Services/Services";
import {
  AlertCircle,
  CheckCircle,
  Clipboard,
  ClipboardList,
  Clock,
} from "lucide-react";
function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.id) {
      setLoading(true);
      getTasks(user.id, user.token)
        .then((response) => {
          setTasks(response);
        })
        .catch((err) => {
          console.error("Error fetching tasks:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };
  const TasksStats = useMemo(() => {
    const notStarted = tasks.filter(
      (task) => task.status === "Not Started"
    ).length;
    const inProgress = tasks.filter(
      (task) => task.status === "In Progress"
    ).length;
    const completed = tasks.filter(
      (task) => task.status === "Completed"
    ).length;
    return {
      notStarted,
      inProgress,
      completed,
    };
  }, [tasks]);
  const upcomingTasks = useMemo(() => {
    return tasks
      .filter((task) => task.status !== "Completed")
      .sort((a, b) => {
        const dateA = new Date(a.deadline);
        const dateB = new Date(b.deadline);
        return dateA.getTime() - dateB.getTime();
      });
  }, [tasks]);
  const isOverDue = (deadline: string) => {
    const taskDate = new Date(deadline);
    const now = new Date();
    taskDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    if (taskDate < now) {
      return true;
    }
    return false;
  };
  const urgentTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        task.status !== "Completed" &&
        (task.priority === "Extreme" || isOverDue(task.deadline))
    ).length;
  }, [tasks]);
const getTimeLeft = (taskdate: string) => {
  const now = new Date();
  const date = new Date(taskdate);
  const diff = date.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? `${days} days left` : 'Overdue';
};
  return (
    <div className="Dashboard">
      <h2 className="Greeting">Welcome back, {user?.firstName} !👋</h2>
      <div className="StatCardsRow">
        <div className="StatCard">
          <div className="StatIcon">
            <ClipboardList />
          </div>
          <div className="StatLabel">Total Tasks</div>
          <div className="StatValue">{tasks.length}</div>
        </div>
        <div className="StatCard Urgent">
          <div className="StatIcon">
            <Clock />
          </div>
          <div className="StatLabel">Not Started</div>
          <div className="StatValue">{TasksStats.notStarted}</div>
        </div>
        <div className="StatCard InProgress">
          <div className="StatIcon">
            <Clock />
          </div>
          <div className="StatLabel ">In Progress</div>
          <div className="StatValue">{TasksStats.inProgress}</div>
        </div>
        <div className="StatCard Completed">
          <div className="StatIcon">
            <CheckCircle />
          </div>
          <div className="StatLabel ">Completed</div>
          <div className="StatValue">{TasksStats.completed}</div>
        </div>
        <div className="StatCard Urgent">
          <div className="StatIcon">
            <AlertCircle />
          </div>
          <div className="StatLabel">Urgent</div>
          <div className="StatValue"></div>
        </div>
      </div>
      <div className="DashboardContent">
        <div className="DashboardCard">
          <h3>Upcoming Deadlines</h3>
          <div className="timeline">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map((task) => (
                <div
                  className={`timeline-item ${task.priority} ${
                    isOverDue(task.deadline) ? "overdue" : ""
                  }`}
                  key={task.id}
                  onClick={() => navigate("/AllTasks")}
                >
                  <div className="timeline-content">
                    <div className="timeline-date">
                      {formatDate(task.deadline)}
                    </div>
                    <div className="timeline-title">{task.title}</div>
                        <div className="timeline-timeleft" id={isOverDue(task.deadline)?"overdue":""}>
                        <Clock size={12} style={{marginRight: '4px', verticalAlign: 'middle'}} />
                        {getTimeLeft(task.deadline)}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">No upcoming tasks</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
