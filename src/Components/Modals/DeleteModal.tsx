import { X } from "lucide-react";
import "./Modal.css";
import Button from "../Button";
import { Dispatch, SetStateAction, useState } from "react";
interface props{
  closeFunction:React.Dispatch<React.SetStateAction<boolean>>
}
function DeleteModal(props:props) {
  const TaskName = "Submit";
  return  <div className="Modal">
      <div className="Container">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "1rem 1.8rem 0rem 1.8rem",
          }}
        >
          <h3>Delete "{TaskName}" Task ?</h3>
          <X className="ExitIcon" onClick={()=>props.closeFunction(false)}/>
        </div>
        <p style={{ padding: "0rem 1.8rem" }}>
          This step is{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>permenant</span>,
          You'll lose all the task information.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            width: "100%",
            padding: "1rem 1.8rem",
          }}
        >
          <Button Text="Cancel" BGcolor="#a1a3ab" TextColor="white" onClick={()=>props.closeFunction(false)}></Button>
          <Button Text="Delete" BGcolor="#f21e1e" TextColor="white" onClick={()=>props.closeFunction(false)}></Button>
        </div>
      </div>
    </div>
}

export default DeleteModal;
