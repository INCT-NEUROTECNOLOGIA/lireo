import { useEffect, useRef } from "react";
import "../layout/fadeInStyle.css";

const FadeIn = ({ children }: { children: React.ReactNode }) => {
  const fadeInRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fadeInElement = fadeInRef.current;

    if (!fadeInElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fadeInElement.classList.add("show");
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(fadeInElement);

    return () => {
      observer.unobserve(fadeInElement);
    };
  }, []);

  return (
    <div ref={fadeInRef} className="fade-in">
      {children}
    </div>
  );
};

export default FadeIn;
