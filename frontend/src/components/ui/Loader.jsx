import React from "react";

export default function Loader({
  size = "md",
  variant = "spinner",
  color = "indigo",
  text = null,
  className = ""
}) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  const colors = {
    indigo: "border-indigo-600 border-t-transparent",
    blue: "border-blue-600 border-t-transparent",
    gray: "border-gray-600 border-t-transparent",
    red: "border-red-600 border-t-transparent",
    green: "border-green-600 border-t-transparent"
  };

  if (variant === "dots") {
    return (
      <div className={`flex items-center space-x-1 ${className}`}>
        <div className={`${sizes[size]} bg-indigo-600 rounded-full animate-pulse`} style={{ animationDelay: '0ms' }} />
        <div className={`${sizes[size]} bg-indigo-600 rounded-full animate-pulse`} style={{ animationDelay: '150ms' }} />
        <div className={`${sizes[size]} bg-indigo-600 rounded-full animate-pulse`} style={{ animationDelay: '300ms' }} />
        {text && <span className="ml-3 text-gray-600">{text}</span>}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={`flex items-center ${className}`}>
        <div className={`${sizes[size]} bg-indigo-600 rounded animate-pulse`} />
        {text && <span className="ml-3 text-gray-600">{text}</span>}
      </div>
    );
  }

  // Default spinner
  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizes[size]} border-4 ${colors[color]} rounded-full animate-spin`} />
      {text && <span className="ml-3 text-gray-600">{text}</span>}
    </div>
  );
}
