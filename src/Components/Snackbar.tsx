import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store";
import { Snackbar_Close, SnackbarType } from "../Store/Slices/SnackbarSlice";
import { useEffect } from "react";
import "./Snackbar.css";

const Snackbar = () => {
  const dispatch = useDispatch();
  const { toggleSnackbar, snackbarMessage, snackbarType } = useSelector(
    (state: RootState) => state.snackbar
  );
  const getBackgroundColor = (type: SnackbarType): string => {
    switch (type) {
      case "success":
        return "#458045";
      case "error":
        return "#DC3545";
      case "info":
        return "#2196F3";
      case "warning":
        return "#FF9800";
      default:
        return "#333333";
    }
  };

  useEffect(() => {
    if (toggleSnackbar) {
      const timer = setTimeout(() => {
        dispatch(Snackbar_Close());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toggleSnackbar, dispatch]);
  if (!toggleSnackbar) return null;
  return (
    <div className="snackbar-container">
      <div
        className="snackbar"
        style={{ backgroundColor: getBackgroundColor(snackbarType) }}
      >
        <span>{snackbarMessage}</span>
        <button onClick={() => dispatch(Snackbar_Close())}>×</button>
      </div>
    </div>
  );
};

export default Snackbar;
