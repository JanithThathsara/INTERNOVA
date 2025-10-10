import React from "react";

export default function Input({
  label,
  error,
  icon,
  helperText,
  className = "",
  containerClassName = "",
  ...props
}) {
  const baseClasses = "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors disabled:bg-gray-50 disabled:text-gray-500";

  const errorClasses = error ? "border-red-300 focus:ring-red-500" : "border-gray-300";

  const classes = `${baseClasses} ${errorClasses} ${icon ? 'pl-12' : ''} ${className}`;

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{icon}</span>
          </div>
        )}

        <input
          className={classes}
          {...props}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
