import "../../../../utils/layout/userGuideStyle.css";
import { userGuideText } from "../text/TextUserGuide";
import SectionUserGuide from "../../../../utils/components/SectionUserGuide";
import FadeIn from "../../../../utils/components/FadeIn";

const UserGuide = () => {
  return (
    <div className="userGuide__container">
      <div className="pageSummary">
        <h1>{userGuideText.title}</h1>
        <p>{userGuideText.text}</p>
      </div>

      <div className="userGuide__content">
        <div className="userGuide__liksSection">
          {Object.values(userGuideText.sections).map((section, index) => (
            <a key={index} href={`#${section.id}`}>
              <i className={section.icon}></i>
              {section.title}
            </a>
          ))}
        </div>

        <div className="userGuide__sections">
          {Object.values(userGuideText.sections).map((section, index) => (
            <FadeIn key={index}>
              <SectionUserGuide
                title={section.title}
                id={section.id}
                className={section.className}
                content={section.content}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserGuide;
