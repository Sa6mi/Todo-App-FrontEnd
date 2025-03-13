import { useLocation, useNavigate } from "react-router";
import "./Menu.css";
import {
  CircleAlert,
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";


export const Menu = () => {
  const Fname = "Sami";
  const Lname = "Shelbayeh"
  const Email = "Sa6mi@gmail.com";
  let navigate = useNavigate();
  let Location = useLocation();
  return (
    <div className="Menu">
      <section className="User">
        <img src="./Avatar.jpg" className="Avatar" />
        <div className="Name">{Fname} {Lname}</div>
        <div className="Email">{Email}</div>
      </section>
      <ul className="MenuItems">
        <li className="MenuItem" id={Location.pathname == "/" ? "Active" : ""} onClick={()=>navigate("/")}>
          <LayoutDashboard/>
          <a>Dashboard</a>
        </li>
        <li className="MenuItem" id={Location.pathname == "/OpenTasks" ? "Active" : ""} onClick={()=>navigate("/OpenTasks")}>
          <CircleAlert />
          <a>Open Tasks</a>
        </li>
        <li className="MenuItem" id={Location.pathname == "/AllTasks" ? "Active" : ""} onClick={()=>navigate("/AllTasks")}>
          <ClipboardCheck />
          <a>All Tasks</a>
        </li>
        <li className="MenuItem" id={Location.pathname == "/Settings" ? "Active" : ""} onClick={()=>navigate("/Settings")}>
          <Settings />
          <a>Settings</a>
        </li>
        <li className="MenuItem">
          <LogOut />
          <a>Log out</a>
        </li>
      </ul>
    </div>
  );
};
