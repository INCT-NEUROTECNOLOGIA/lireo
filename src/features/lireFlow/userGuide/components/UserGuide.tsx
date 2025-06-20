import "../layout/userGuideStyle.css";
import { userGuideText } from "./TextUserGuide";
import { getPublicAssetUrl } from "../../../../utils/pathUtils";

const UserGuide = () => {
  return (
    <div className="userGuide__container">
      <div className="pageSummary">
        <h1>{userGuideText.title}</h1>
        <p>{userGuideText.text}</p>
      </div>

      <div className="userGuide__content">
        <div className="userGuide__liksSection">
          <a href={`#${userGuideText.sections.loadText.id}`}>
            <i className={userGuideText.sections.loadText.icon}></i>
            {userGuideText.sections.loadText.title}
          </a>
          <a href={`#${userGuideText.sections.readControls.id}`}>
            <i className={userGuideText.sections.readControls.icon}></i>
            {userGuideText.sections.readControls.title}
          </a>
          <a href={`#${userGuideText.sections.readLevels.id}`}>
            <i className={userGuideText.sections.readLevels.icon}></i>
            {userGuideText.sections.readLevels.title}
          </a>
          <a href={`#${userGuideText.sections.tips.id} `}>
            <i className={userGuideText.sections.tips.icon}></i>
            {userGuideText.sections.tips.title}
          </a>
          <a href={`#${userGuideText.sections.support.id}`}>
            <i className={userGuideText.sections.support.icon}></i>
            {userGuideText.sections.support.title}
          </a>
        </div>

        <div className="userGuide__sections">
          <section
            className="userGuide__section loadText"
            id={userGuideText.sections.loadText.id}
          >
            <h2>{userGuideText.sections.loadText.title}</h2>
            <h3>{userGuideText.sections.loadText.subtitle}</h3>
            <p>{userGuideText.sections.loadText.content.text1}</p>
            <ul>
              {userGuideText.sections.loadText.content.items.map(
                (item, index) => (
                  <li key={index}>
                    <strong>{item.bold}</strong>
                    {item.text}
                  </li>
                )
              )}
            </ul>
          </section>

          <section
            className="userGuide__section readControls"
            id={userGuideText.sections.readControls.id}
          >
            <h2>{userGuideText.sections.readControls.title}</h2>
            <p>{userGuideText.sections.readControls.text}</p>
            <img
              src={getPublicAssetUrl(
                userGuideText.sections.readControls.content.image.src
              )}
              alt={userGuideText.sections.readControls.content.image.alt}
            />
            <ul>
              {userGuideText.sections.readControls.content.items.map(
                (item, index) => (
                  <li key={index}>
                    {item.obs && <span className="obs">{item.obs}</span>}
                    <strong>{item.bold}</strong>
                    {item.text}
                  </li>
                )
              )}
            </ul>
            <section id={userGuideText.sections.readLevels.id}>
              <p>
                <span className="obs">
                  {userGuideText.sections.readLevels.content.observation.obs}
                </span>
                {userGuideText.sections.readLevels.content.observation.text}
              </p>
              <ul>
                {userGuideText.sections.readLevels.content.itemsLevels.map(
                  (item, index) => (
                    <li key={index}>{item.text}</li>
                  )
                )}
              </ul>
              <p>{userGuideText.sections.readLevels.content.text}</p>
              <img
                src={getPublicAssetUrl(
                  userGuideText.sections.readLevels.content.imageLevels.src
                )}
                alt={userGuideText.sections.readLevels.content.imageLevels.alt}
              />
            </section>
            <h3>{userGuideText.sections.readControls.subsection.title}</h3>
            <p>{userGuideText.sections.readControls.subsection.content.text}</p>
            <img
              src={getPublicAssetUrl(
                userGuideText.sections.readControls.subsection.content.image.src
              )}
              alt={
                userGuideText.sections.readControls.subsection.content.image.alt
              }
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserGuide;
