import { useLocation, useNavigate } from "react-router";
import "./Menu.css";
import {
  CircleAlert,
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store";
import { logout } from "../Store/Slices/AuthSlice";

export const Menu = () => {
  const {user} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let Location = useLocation();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="Menu">
      <section className="User">
        <img src={user?.imageUrl || "./Avatar.jpg"} className="Avatar" />
        <div className="Name">
          {user?.firstName} {user?.lastName}
        </div>
        <div className="Email">{user?.email}</div>
      </section>
      <ul className="MenuItems">
        <li
          className="MenuItem"
          id={Location.pathname == "/" ? "Active" : ""}
          onClick={() => navigate("/")}
        >
          <LayoutDashboard />
          <a>Dashboard</a>
        </li>
        <li
          className="MenuItem"
          id={Location.pathname == "/OpenTasks" ? "Active" : ""}
          onClick={() => navigate("/OpenTasks")}
        >
          <CircleAlert />
          <a>Open Tasks</a>
        </li>
        <li
          className="MenuItem"
          id={Location.pathname == "/AllTasks" ? "Active" : ""}
          onClick={() => navigate("/AllTasks")}
        >
          <ClipboardCheck />
          <a>All Tasks</a>
        </li>
        <li
          className="MenuItem"
          id={Location.pathname == "/Settings" ? "Active" : ""}
          onClick={() => navigate("/Settings")}
        >
          <Settings />
          <a>Settings</a>
        </li>
        <li className="MenuItem" onClick={handleLogout}>
          <LogOut />
          <a>Log out</a>
        </li>
      </ul>
    </div>
  );
};
