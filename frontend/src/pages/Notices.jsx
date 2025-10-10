import React, { useEffect, useState } from "react";
import NoticeForm from "../components/notices/NoticeForm";
import NoticeList from "../components/notices/NoticeList";
import {
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice,
} from "../services/noticeService";

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getNotices();
      setNotices(data);
    } catch (err) {
      console.error("Failed to load notices:", err);
      setError("Failed to load notices. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (notice) => {
    try {
      await createNotice(notice);
      setIsModalOpen(false);
      await loadNotices();
      setError(null);
    } catch (err) {
      console.error("Failed to create notice:", err);
      setError("Failed to create notice. Please try again.");
    }
  };

  const handleUpdate = async (id, updated) => {
    try {
      await updateNotice(id, updated);
      setEditingNotice(null);
      setIsModalOpen(false);
      await loadNotices();
      setError(null);
    } catch (err) {
      console.error("Failed to update notice:", err);
      setError("Failed to update notice. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      try {
        await deleteNotice(id);
        await loadNotices();
        setError(null);
      } catch (err) {
        console.error("Failed to delete notice:", err);
        setError("Failed to delete notice. Please try again.");
      }
    }
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setIsModalOpen(true);
  };

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || notice.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: notices.length,
    active: notices.filter((n) => n.status === "active").length,
    draft: notices.filter((n) => n.status === "draft").length,
    archived: notices.filter((n) => n.status === "archived").length,
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #ad91a3 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-400 mr-3"
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
                <span className="text-red-700">{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="ml-auto text-red-400 hover:text-red-600"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Notice Management
              </h1>
              <p className="text-gray-600 mt-1">
                Create, manage, and organize your notices
              </p>
            </div>
            <button
              onClick={() => {
                setEditingNotice(null);
                setIsModalOpen(true);
              }}
              style={{
                background: "linear-gradient(135deg, #7b5e86, #ad91a3)",
                color: "white",
              }}
              className="font-medium px-6 py-3 rounded-lg shadow-sm flex items-center space-x-2 transition-colors"
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
              <span>Create Notice</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div
              className="rounded-lg p-6"
              style={{
                background: "rgba(255, 255, 255, 0.85)",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
              }}
            >
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Notices
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.total}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="rounded-lg p-6"
              style={{
                background: "rgba(255, 255, 255, 0.85)",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
              }}
            >
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
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.active}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="rounded-lg p-6"
              style={{
                background: "rgba(255, 255, 255, 0.85)",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Draft</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.draft}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="rounded-lg p-6"
              style={{
                background: "rgba(255, 255, 255, 0.85)",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="flex items-center">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Archived</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.archived}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div
            className="rounded-lg p-6"
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search notices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                {/* Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid"
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-400"
                      } hover:text-indigo-600 transition-colors`}
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
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list"
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-400"
                      } hover:text-indigo-600 transition-colors`}
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
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notice List */}
        <div
          className="rounded-lg"
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
          }}
        >
          <NoticeList
            notices={filteredNotices}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onEdit={handleEdit}
            viewMode={viewMode}
            loading={loading}
          />
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div
              className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 rounded-md"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingNotice ? "Edit Notice" : "Create New Notice"}
                </h3>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingNotice(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <NoticeForm
                onSubmit={
                  editingNotice
                    ? (data) => handleUpdate(editingNotice._id, data)
                    : handleCreate
                }
                initialData={editingNotice}
                onCancel={() => {
                  setIsModalOpen(false);
                  setEditingNotice(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
