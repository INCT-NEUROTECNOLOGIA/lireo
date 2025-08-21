import React, { useEffect, useRef, useState } from "react";
import MemberCard from "./MemberCard";
import type { Member } from "./Section";
import "../layout/TeamCarouselStyle.css";
import { useMemberCarousel } from "../hooks/useMemberCarousel";

interface MemberCarouselProps {
  members?: Member[];
}

const MemberCarousel: React.FC<MemberCarouselProps> = ({ members = [] }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const { currentIndex, goToIndex, goNext, goPrev } = useMemberCarousel({
    membersLength: members.length,
    isPaused,
    waitTime: 4000,
  });

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  if (members.length === 0) return null;

  return (
    members.length > 0 && (
      <div
        className="aboutUsContainer__teamCarousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="aboutUsContainer__teamCarousel__track" ref={trackRef}>
          {members.map((member, index) => (
            <div className="aboutUsContainer__teamCarousel__item" key={index}>
              <MemberCard member={member} />
            </div>
          ))}
        </div>
        <div className="aboutUsContainer__teamCarousel__controls">
          <button
            className="aboutUsContainer__teamCarousel__button next"
            onClick={goPrev}
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          <div className="aboutUsContainer__teamCarousel__indicators">
            {members.map((_member, index) => (
              <button
                key={index}
                className={
                  "aboutUsContainer__teamCarousel__indicators__dot" +
                  (index === currentIndex ? " active" : "")
                }
                onClick={() => goToIndex(index)}
              ></button>
            ))}
          </div>
          <button
            className="aboutUsContainer__teamCarousel__button prev"
            onClick={goNext}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    )
  );
};

export default MemberCarousel;
