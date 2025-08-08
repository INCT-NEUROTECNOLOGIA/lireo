import React from "react";
import "../layout/initialPageStyle.css";
import { InitialPageText } from "../texts/initialPageText.ts";
import { getPublicAssetUrl } from "../../../utils/pathUtils";
import { ROUTE_PATHS } from "../../../config/routes";

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
            {InitialPageText.mainSection.button}
          </button>
        </div>
        <img src={getPublicAssetUrl("/images/icone-lireo.png")} />
      </div>

      <div className="initialPage_howItWorksSection">
        <h1>{InitialPageText.howItWorksSection.title}</h1>
        <div className="initialPage_cardsContainer">
          {InitialPageText.howItWorksSection.cards.map((card, index) => (
            <div key={index} className="initialPage_card">
              <i class={card.icon}></i>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="initialPage_forWhomSection">
        <h1>{InitialPageText.forWhomSection.title}</h1>
        <p>{InitialPageText.forWhomSection.text}</p>
      </div>

      <div className="initialPage_callSection">
        <h1>{InitialPageText.callSection.title}</h1>
        <button className="button initialPage_callSection_button">{InitialPageText.callSection.button}</button>
      </div>

      <div className="initialPage_activitiesSection">
        <h1>{InitialPageText.activitiesSection.title}</h1>
        <div className="initialPage_cardsContainer">
          {InitialPageText.activitiesSection.links.map((activity, index) => (
            <a key={index} className="initialPage_card" href={ROUTE_PATHS[activity.route]} target="_blank" rel="noopener noreferrer">
              <h2>{activity.title}</h2>
              <p>{activity.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InitialPage;
