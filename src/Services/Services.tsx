import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store";

export const getTasks = async (id: string, token: string) => {
  const data = axios
    .get(`http://localhost:3001/tasks/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data);
  return data;
};
export const deleteTask = async (id: string, token: string) => {
  const response = await axios
    .delete(`http://localhost:3001/tasks/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });
  return response;
};

export const saveUserInLocalStorage = (user: any) => {
  localStorage.setItem("User", JSON.stringify(user));
};

export const updateTask = async (
  taskId: string,
  taskData: any,
  token: string
) => {
  return axios
    .put(`http://localhost:3001/tasks/${taskId}`, taskData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });
};
