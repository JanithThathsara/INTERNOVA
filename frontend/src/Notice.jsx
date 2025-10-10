import React from "react";
import RoutesIndex from "./routes";

export default function Notice() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #ad91a3 100%)",
      }}
    >
      {/* Header */}
      <header
        className="shadow-sm border-b border-gray-200 sticky top-0 z-50"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #7b5e86, #ad91a3)",
                }}
              >
                <span className="text-white text-xl font-bold">📢</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">NoticeBoard</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <RoutesIndex />
      </main>

      {/* Footer */}
      <footer
        className="border-t border-gray-200 mt-16"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>&copy; 2024 NoticeBoard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
