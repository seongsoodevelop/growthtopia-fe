import axios from "axios";

export const metaTicket = (data) => axios.post(`user/meta/ticket`, data);

export const workStart = (data) => axios.post(`user/work/start`, data);
export const workEnd = (data) => axios.post(`user/work/end`, data);
