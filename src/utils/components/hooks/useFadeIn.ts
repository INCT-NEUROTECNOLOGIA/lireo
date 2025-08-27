import { useEffect, useRef } from "react";

type UseFadeInProps = {
  threshold?: number;
  rootMargin?: string;
};

const useFadeIn = ({ threshold = 0.3, rootMargin = "0px" }: UseFadeInProps = {}) => {
  const fadeInRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = fadeInRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("show");
          observer.unobserve(element); 
        }
      },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin]);

  return fadeInRef;
};

export default useFadeIn;