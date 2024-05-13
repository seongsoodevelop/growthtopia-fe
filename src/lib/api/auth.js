import axios from "axios";

export const sessionHi = (data) => axios.post(`auth/session/hi`, data);
export const sessionBye = (data) => axios.post(`auth/session/bye`, data);

export const socialKakao = (data) => axios.post(`auth/social/kakao`, data);
