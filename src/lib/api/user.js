import axios from "axios";

export const metaTicket = (data) => axios.post(`user/meta/ticket`, data);
