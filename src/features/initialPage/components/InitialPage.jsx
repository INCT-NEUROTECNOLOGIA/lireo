import "../layout/initialPageStyle.css";
import { InitialPageText } from "../texts/initialPageText.ts";
import { getPublicAssetUrl } from "../../../utils/pathUtils";
import { ROUTE_PATHS } from "../../../config/routes";
import FadeIn from "../../../utils/components/FadeIn";

const InitialPage = () => {
  return (
    <div className="initialPage">
      <div className="initialPage_mainSection">
        <div className="initialPage_mainSection_text">
          <h1>{InitialPageText.mainSection.title}</h1>
          {InitialPageText.mainSection.texts.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
          <button className="button initialPage_mainSection_button">
            <a href="#ACTIVITIES_SECTION">
              {InitialPageText.mainSection.button}
            </a>
          </button>
        </div>
        <FadeIn>
          <img src={getPublicAssetUrl("/images/icone-lireo.png")} />
        </FadeIn>
      </div>

      <div className="section initialPage_howItWorksSection">
        <h1>{InitialPageText.howItWorksSection.title}</h1>
        <FadeIn>
          <div className="initialPage_cardsContainer">
            {InitialPageText.howItWorksSection.cards.map((card, index) => (
              <div key={index} className="initialPage_card">
                <i class={`initialPage_card_icon ${card.icon}`}></i>
                <h2>{card.title}</h2>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      <div className="initialPage_callSection">
        <h1>{InitialPageText.callSection.title}</h1>
        <button className="button initialPage_callSection_button">
          <a href="#ACTIVITIES_SECTION">{InitialPageText.callSection.button}</a>
        </button>
      </div>

      <div className="section initialPage_forWhomSection">
        <h1>{InitialPageText.forWhomSection.title}</h1>
        <p>{InitialPageText.forWhomSection.text}</p>
      </div>

      <div
        className="section initialPage_activitiesSection"
        id="ACTIVITIES_SECTION"
      >
        <h1>{InitialPageText.activitiesSection.title}</h1>
        <FadeIn>
          <div className="initialPage_cardsContainer">
            {InitialPageText.activitiesSection.links.map((activity, index) => (
              <a
                key={index}
                className="initialPage_card activityCard"
                href={ROUTE_PATHS[activity.route]}
              >
                <i class={`initialPage_card_icon ${activity.icon}`}></i>
                <h2>{activity.title}</h2>
                <p>{activity.description}</p>
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default InitialPage;
