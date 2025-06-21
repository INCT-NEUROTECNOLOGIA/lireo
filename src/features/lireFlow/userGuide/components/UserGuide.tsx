import "../layout/userGuideStyle.css";
import { userGuideText } from "./TextUserGuide";
import SectionUserGuide from "./SectionUserGuide";

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
          <SectionUserGuide
            title={userGuideText.sections.loadText.title}
            id={userGuideText.sections.loadText.id}
            className={userGuideText.sections.loadText.className}
            content={userGuideText.sections.loadText.content}
          />

          <SectionUserGuide
            title={userGuideText.sections.readingControls.title}
            id={userGuideText.sections.readingControls.id}
            className={userGuideText.sections.readingControls.className}
            content={userGuideText.sections.readingControls.content}
          />

          <SectionUserGuide
            title={userGuideText.sections.readingLevels.title}
            id={userGuideText.sections.readingLevels.id}
            className={userGuideText.sections.readingLevels.className}
            content={userGuideText.sections.readingLevels.content}
          />

          <SectionUserGuide
            title={userGuideText.sections.manualReadingControls.title}
            id={userGuideText.sections.manualReadingControls.id}
            className={userGuideText.sections.manualReadingControls.className}
            content={userGuideText.sections.manualReadingControls.content}
          />

          <SectionUserGuide
            title={userGuideText.sections.tips.title}
            id={userGuideText.sections.tips.id}
            className={userGuideText.sections.tips.className}
            content={userGuideText.sections.tips.content}
          />

          <SectionUserGuide
            title={userGuideText.sections.support.title}
            id={userGuideText.sections.support.id}
            className={userGuideText.sections.support.className}
            content={userGuideText.sections.support.content}
          />
        </div>
      </div>
    </div>
  );
};

export default UserGuide;
