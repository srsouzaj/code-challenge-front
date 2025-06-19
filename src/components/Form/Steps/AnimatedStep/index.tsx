import { memo, useRef, useEffect, useState } from "react";

interface AnimatedStepProps {
  active: boolean;
  children: React.ReactNode;
}

const AnimatedStep = ({ active, children }: AnimatedStepProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (active) {
      const scrollHeight = el.scrollHeight;
      setHeight(`${scrollHeight}px`);

      const timeout = setTimeout(() => {
        setHeight("auto"); // libera crescimento natural depois da animação
      }, 700); // mesma duração do transition

      return () => clearTimeout(timeout);
    } else {
      // se estava em auto, primeiro fixa antes de recolher
      if (height === "auto") {
        const currentHeight = `${el.scrollHeight}px`;
        setHeight(currentHeight);

        requestAnimationFrame(() => {
          setHeight("0px");
        });
      } else {
        setHeight("0px");
      }
    }
  }, [active]);

  return (
    <div
      ref={ref}
      style={{
        height,
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
      aria-hidden={!active}
    >
      {children}
    </div>
  );
};

export default memo(AnimatedStep);
