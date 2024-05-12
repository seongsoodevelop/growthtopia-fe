import axios from "axios";

export const socialKakao = (data) => axios.post(`auth/social/kakao`, data);
export const greeting = (data) => axios.post(`auth/greeting`, data);
