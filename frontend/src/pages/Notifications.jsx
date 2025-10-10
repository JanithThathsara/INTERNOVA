import React, { useEffect, useState } from "react";
import NotificationList from "../components/notifications/NotificationList";
import NotificationForm from "../components/notifications/NotificationForm";
import {
  getNotifications,
  createNotification,
  markAsRead,
  deleteNotification,
  markAllAsRead,
} from "../services/notificationService";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getNotifications();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load notifications:", err);
      setError("Failed to load notifications. Please try again.");
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreateNotification = async (notificationData) => {
    try {
      await createNotification(notificationData);
      await load();
      setError(null);
    } catch (err) {
      console.error("Failed to create notification:", err);
      throw new Error("Failed to create notification. Please try again.");
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markAsRead(notificationId);
      await load(); // Reload to update the UI
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
      setError("Failed to mark notification as read. Please try again.");
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      await deleteNotification(notificationId);
      await load(); // Reload to update the UI
    } catch (err) {
      console.error("Failed to delete notification:", err);
      setError("Failed to delete notification. Please try again.");
    }
  };

  const handleMarkAllAsRead = async () => {
    if (stats.unread === 0) {
      return;
    }

    try {
      await markAllAsRead();
      await load(); // Reload to update the UI
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
      setError("Failed to mark all notifications as read. Please try again.");
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.type?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      filterType === "all" || notification.type === filterType;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "read" && notification.read) ||
      (filterStatus === "unread" && !notification.read);
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: notifications.length,
    unread: notifications.filter((n) => !n.read).length,
    system: notifications.filter((n) => n.type === "system").length,
    user: notifications.filter((n) => n.type === "user").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-4 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
              <p className="text-gray-600">Loading notifications...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #ad91a3 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Notifications
              </h1>
              <p className="mt-1 text-gray-600">
                Manage and view all your notifications
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsModalOpen(true)}
                style={{
                  background: "linear-gradient(135deg, #7b5e86, #ad91a3)",
                  color: "white",
                }}
                className="flex items-center px-6 py-3 space-x-2 font-medium transition-colors rounded-lg shadow-sm"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span>Create Notification</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h-5l-5 5v-5zM15 17H9a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v10z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.total}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Unread</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.unread}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">System</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.system}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">User</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.user}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div
            className="p-6 mb-6 rounded-lg"
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <svg
                  className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <div className="flex items-center space-x-4">
                {/* Type Filter */}
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="system">System</option>
                  <option value="user">User</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>

                {/* Status Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                </select>

                {/* Refresh Button */}
                <button
                  onClick={load}
                  disabled={loading}
                  className="p-2 text-gray-400 transition-colors rounded-lg hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                  title="Refresh notifications"
                >
                  <svg
                    className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div
          className="rounded-lg"
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
          }}
        >
          <NotificationList
            notifications={filteredNotifications}
            onRefresh={load}
            loading={loading}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDelete}
          />
        </div>

        {/* Notification Form Modal */}
        <NotificationForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateNotification}
        />
      </div>
    </div>
  );
}
