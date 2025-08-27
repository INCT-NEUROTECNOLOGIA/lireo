import React from "react";
import "../layout/aboutUs.css";
import Section from "./Section";
import { getPublicAssetUrl } from "../../../utils/pathUtils";
import FadeIn from "../../../utils/components/FadeIn";
import { ABOUT_US_TEAM } from "../texts/aboutUsText";

const AboutUs: React.FC = () => {

  const { aboutUsText, projectCreators, collaborators } = ABOUT_US_TEAM;

  return (
    <div className="aboutUsContainer">
      <div className="pageSummary">
        <h1>{aboutUsText.summary.title}</h1>
        <p>{aboutUsText.summary.description}</p>
      </div>

      <div className="aboutUsContainer__ourStory ">
        <FadeIn>
          <h1 className="aboutUsContainer__ourStory__title">
            {aboutUsText.ourStory.section[0].title}
          </h1>
          {aboutUsText.ourStory.section[0].description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            )
          )}
        </FadeIn>
        <FadeIn>
          <div className="aboutUsContainer__ourStory__originBrandContainer">
            <div className="aboutUsContainer__ourStory__originBrandText">
              <h1>{aboutUsText.ourStory.section[1].title}</h1>
              {aboutUsText.ourStory.section[1].description.map(
                (paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                )
              )}
              <p className="quote">
                {aboutUsText.ourStory.section[1].quote?.text}
                <span>{aboutUsText.ourStory.section[1].quote?.origin}</span>
              </p>
            </div>
            <img src={getPublicAssetUrl("/images/icone-lireo.png")} />
          </div>
        </FadeIn>
      </div>

      <Section title={aboutUsText.creatorsSection} members={projectCreators} />

      <Section
        title={aboutUsText.collaboratorsSection}
        members={collaborators}
      />
    </div>
  );
};

export default AboutUs;
