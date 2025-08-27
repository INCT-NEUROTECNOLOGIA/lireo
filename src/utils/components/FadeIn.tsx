import React from "react";
import "../layout/fadeInStyle.css";
import useFadeIn from "./hooks/useFadeIn";

interface FadeInProps {
  children: React.ReactNode;
}

const FadeInComponent = ({ children }: FadeInProps) => {
  const fadeInRef = useFadeIn(); // hook que retorna o ref com lógica do IntersectionObserver

  return (
    <div ref={fadeInRef} className="fade-in">
      {children}
    </div>
  );
};

export default FadeInComponent;
