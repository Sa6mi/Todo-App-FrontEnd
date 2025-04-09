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
  const [notStartedCount, setNotStartedCount] = useState(0);
  const [InProgressCount, setInProgressCount] = useState(0);
  const [CompletedCount, setCompletedCount] = useState(0);
  const [UrgentCount, setUrgentCount] = useState(0);

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
        <div className="StatCard">
          <div className="StatIcon">
            <Clock />
          </div>
          <div className="StatLabel">Not Started</div>
          <div className="StatValue">{TasksStats.notStarted}</div>
        </div>
        <div className="StatCard">
          <div className="StatIcon">
            <Clock />
          </div>
          <div className="StatLabel">In Progress</div>
          <div className="StatValue">{TasksStats.inProgress}</div>
        </div>
        <div className="StatCard">
          <div className="StatIcon">
            <CheckCircle />
          </div>
          <div className="StatLabel">Completed</div>
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
    </div>
  );
}

export default Dashboard;
