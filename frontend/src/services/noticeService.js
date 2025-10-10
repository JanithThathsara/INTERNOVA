import axios from "axios";

const API = "http://localhost:5001/api/notices";

// Create axios instance with default config
const noticeAPI = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for error handling
noticeAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Notice API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getNotices = async () => {
  try {
    const res = await noticeAPI.get("/");
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch notices"
    );
  }
};

export const createNotice = async (notice) => {
  try {
    const res = await noticeAPI.post("/", notice);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create notice"
    );
  }
};

export const updateNotice = async (id, data) => {
  try {
    if (!id) {
      throw new Error("Notice ID is required for update");
    }
    const res = await noticeAPI.put(`/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update notice"
    );
  }
};

export const deleteNotice = async (id) => {
  try {
    if (!id) {
      throw new Error("Notice ID is required for deletion");
    }
    const res = await noticeAPI.delete(`/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete notice"
    );
  }
};
