import axios from "axios";

export const getTasks = async () => {
  const { data } = await axios.get("./Items.json");
  return data;
};
const deleteTask = async () => {
  return;
};

export const saveUserInLocalStorage = (user: any) => {
    localStorage.setItem("User",JSON.stringify(user))
};
