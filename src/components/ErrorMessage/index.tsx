"use client";

import { FC, memo } from "react";

interface ErrorMessageProps {
  message?: string;
  id?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({
  message,
  id = "form-error",
}) => {
  if (!message) return null;

  return (
    <div
      className="min-h-[20px] transition-all duration-300 ease-in-out"
      role="alert"
      aria-live="polite"
      id={id}
    >
      <p
        className={`text-red-700 text-xs font-normal transition-all duration-300 ${
          message
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        {message}
      </p>
    </div>
  );
};

export default memo(ErrorMessage);
