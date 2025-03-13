import axios from "axios";

const getTasks = async () => {
    const {data} = await axios.get("./Items.json");
    return data;
}
const deleteTask = async () => {
    return
}

export default getTasks;