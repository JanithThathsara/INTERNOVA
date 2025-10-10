import axios from "axios";
const API = "http://localhost:5001/api/messages";

export const sendMessage = async (msg) => {
  const res = await axios.post(API, msg);
  return res.data;
};

export const getMessages = async (from, to) => {
  const res = await axios.get(`${API}?from=${from}&to=${to}`);
  return res.data;
};
