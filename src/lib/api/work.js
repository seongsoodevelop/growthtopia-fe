import axios from "axios";

export const taskQuery = (data) => axios.post(`work/task/query`, data);
export const taskInsert = (data) => axios.post(`work/task/insert`, data);
export const taskRemove = (data) => axios.post(`work/task/remove`, data);
export const taskUpdate = (data) => axios.post(`work/task/update`, data);
