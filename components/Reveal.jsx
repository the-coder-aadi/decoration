import { useEffect, useRef, useState } from "react";

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = true,
}) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1100ms] ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : `opacity-0 ${y ? "translate-y-10" : ""}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}