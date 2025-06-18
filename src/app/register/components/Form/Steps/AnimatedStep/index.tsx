import { memo } from "react";

interface AnimatedStepProps {
  active: boolean;
  children: React.ReactNode;
}

const AnimatedStep = ({ active, children }: AnimatedStepProps) => {
  return (
    <div
      aria-hidden={!active}
      className={`
          overflow-hidden
          transition-[opacity,transform,max-height] duration-700
          ${
            active
              ? "opacity-100 translate-x-0 max-h-[1000px] scale-100 ease-out"
              : "opacity-0 -translate-x-5 max-h-0 scale-95 pointer-events-none ease-in"
          }
        `}
      style={{ willChange: "opacity, transform, max-height" }}
    >
      {children}
    </div>
  );
};

export default memo(AnimatedStep);
