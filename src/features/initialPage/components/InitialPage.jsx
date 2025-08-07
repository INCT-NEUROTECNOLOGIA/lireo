import React from "react";
import "../layout/initialPageStyle.css";
import { InitialPageText } from "../texts/initialPageText.ts";
import { getPublicAssetUrl } from "../../../utils/pathUtils";

const InitialPage = () => {
  return (
    <div className="initialPage">
      <div className="initialPage_mainSection">
        <div className="initialPage_mainSection_text">
          <h1>{InitialPageText.mainSection.title}</h1>
          {InitialPageText.mainSection.texts.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
          <button className="initialPage_mainSection_button">
            {InitialPageText.mainSection.button}
          </button>
        </div>
        <img src={getPublicAssetUrl("/images/icone-lireo.png")} />
      </div>

      <div className="initialPage_howItWorksSection">
        <h1>{InitialPageText.howItWorksSection.title}</h1>
        <div className="initialPage_howItWorksSection_content">
          {InitialPageText.howItWorksSection.cards.map((card, index) => (
            <div key={index} className="initialPage_howItWorksSection_card">
              <i class={card.icon}></i>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="initialPage_forWhomSection">
        <h1>{InitialPageText.forWhomSection.title}</h1>
        <h2>{InitialPageText.forWhomSection.text}</h2>
      </div>

      <div className="initialPage_callSection">
        <h1>{InitialPageText.callSection.title}</h1>
        <button>{InitialPageText.callSection.button}</button>
      </div>
    </div>
  );
};

export default InitialPage;
