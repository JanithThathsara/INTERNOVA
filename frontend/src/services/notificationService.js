import axios from "axios";

const API = "http://localhost:5001/api/notifications";

// Create axios instance with default config
const notificationAPI = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add response interceptor for error handling
notificationAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Notification API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getNotifications = async () => {
  try {
    const res = await notificationAPI.get('/');
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch notifications');
  }
};

export const createNotification = async (notification) => {
  try {
    const res = await notificationAPI.post('/', {
      type: notification.type,
      message: notification.message,
      targetUser: notification.targetUser || "all"
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create notification');
  }
};

export const markAsRead = async (notificationId) => {
  try {
    const res = await notificationAPI.put(`/${notificationId}`, { read: true });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to mark notification as read');
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    const res = await notificationAPI.delete(`/${notificationId}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete notification');
  }
};

export const markAllAsRead = async () => {
  try {
    const res = await notificationAPI.put('/mark-all-read');
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to mark all notifications as read');
  }
};
