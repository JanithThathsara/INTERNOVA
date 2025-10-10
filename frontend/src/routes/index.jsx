import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Notices from "../pages/Notices";
import Messages from "../pages/Messages";
import Notifications from "../pages/Notifications";

export default function RoutesIndex() {
  const location = useLocation();

  const navItems = [
    { path: "/notices-dashboard", label: "Home", icon: "🏠" },
    { path: "/notices-dashboard/notices", label: "Notices", icon: "📋" },
    { path: "/notices-dashboard/messages", label: "Messages", icon: "💬" },
    { path: "/notices-dashboard/notifications", label: "Notifications", icon: "🔔" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white shadow-sm border-r border-gray-200">
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                        ? "bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Quick Stats */}
        <div className="mt-12 px-4">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-4 text-white">
            <h3 className="font-semibold mb-2">Quick Stats</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Active Notices</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between">
                <span>Unread Messages</span>
                <span className="font-semibold">5</span>
              </div>
              <div className="flex justify-between">
                <span>New Notifications</span>
                <span className="font-semibold">3</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="notices" element={<Notices />} />
            <Route path="messages" element={<Messages />} />
            <Route path="notifications" element={<Notifications />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
