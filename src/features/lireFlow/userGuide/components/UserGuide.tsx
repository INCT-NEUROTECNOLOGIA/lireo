import "../layout/userGuideStyle.css";
import { userGuideText } from "./TextUserGuide";
import SectionUserGuide from "./SectionUserGuide";
import Support from "./Support";

const UserGuide = () => {
  return (
    <div className="userGuide__container">
      <div className="pageSummary">
        <h1>{userGuideText.title}</h1>
        <p>{userGuideText.text}</p>
      </div>

      <div className="userGuide__content">
        <div className="userGuide__liksSection">
          {userGuideText.sections.map((section, index) => (
            <a key={index} href={`#${section.title.replace(/\s+/g, "-")}`}>
              <i className={`bi ${section.icon}`}></i>
              {section.title}
            </a>
          ))}
        </div>

        <div className="userGuide__sections">
          {userGuideText.sections.map((section, index) => (
            <SectionUserGuide
              key={index}
              title={section.title}
              content={section.content}
            />
          ))}

          <Support />
        </div>
      </div>
    </div>
  );
};

export default UserGuide;
