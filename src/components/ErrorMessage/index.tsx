"use client";

import { FC, memo } from "react";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return;
  return (
    <div className="min-h-[20px] transition-all duration-300 ease-in-out">
      <span
        className={`text-red-700 text-xs font-normal block transition-all duration-300 ${
          message
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        {message || " "}
      </span>
    </div>
  );
};

export default memo(ErrorMessage);
