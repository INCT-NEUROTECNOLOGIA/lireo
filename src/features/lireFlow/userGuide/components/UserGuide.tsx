import "../layout/userGuideStyle.css";
import { userGuideText } from "./TextUserGuide";
import SectionUserGuide from "./SectionUserGuide";
import Support from "./Support";

const UserGuide = () => {
  return (
    <div className="userGuide__container">
      <h1>{userGuideText.title}</h1>
      <h4>{userGuideText.text}</h4>

      {userGuideText.sections.map((section, index) => (
        <SectionUserGuide
          key={index}
          title={section.title}
          content={section.content}
        />
      ))}

      <Support />
    </div>
  );
};

export default UserGuide;
