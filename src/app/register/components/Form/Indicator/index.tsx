import { cn } from "@/lib/utils";
import { memo } from "react";

const Indicator = ({
  step,
  totalSteps,
}: {
  step: number;
  totalSteps: number;
}) => {
  return (
    <div className="flex items-center justify-center">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex items-center">
          <div
            className={cn(
              "w-8 flex items-center justify-center h-8 text-md rounded-full transition-all duration-300 ease-in-out",
              index <= step
                ? "bg-primary text-white font-bold"
                : "bg-primary/10 text-primary font-normal",
              index < step && "bg-primary"
            )}
          >
            {index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div
              className={cn(
                "w-8 h-0.5",
                index < step ? "bg-primary" : "bg-primary/30"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default memo(Indicator);
