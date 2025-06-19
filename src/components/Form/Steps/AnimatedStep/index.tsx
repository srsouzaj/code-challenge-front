import { memo, useRef, useEffect, useState } from "react";

interface AnimatedStepProps {
  active: boolean;
  children: React.ReactNode;
}

const AnimatedStep = ({ active, children }: AnimatedStepProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>("0px");

  useEffect(() => {
    if (ref.current) {
      if (active) {
        setHeight(`${ref.current.scrollHeight}px`);
      } else {
        setHeight("0px");
      }
    }
  }, [active]);

  return (
    <div
      aria-hidden={!active}
      ref={ref}
      style={{
        minHeight: height,

        overflow: "hidden",
        transition: "height 0.7s ease",
        opacity: active ? 1 : 0,
        transform: active
          ? "translateX(0) scale(1)"
          : "translateX(-20px) scale(0.95)",
        transitionProperty: "height, opacity, transform",
        transitionDuration: "0.7s",
        transitionTimingFunction: "ease",
        pointerEvents: active ? "auto" : "none",
      }}
    >
      {children}
    </div>
  );
};

export default memo(AnimatedStep);
