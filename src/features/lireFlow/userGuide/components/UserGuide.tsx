import React from "react";
import "../layout/userGuideStyle.css";
import { userGuideText } from "./TextUserGuide";

const UserGuide = () => {
  return (
    <div className="userGuide__container">
      <h1>{userGuideText.title}</h1>
      <h4>{userGuideText.description}</h4>

      <div className="userGuide__innerContainer">
        <h2>{userGuideText.homePage}</h2>
        <p>{userGuideText.homePageDescription}</p>
        <ul>
          <li>
            <strong>{userGuideText.homePageHeaderLinks[0]}</strong>
            {userGuideText.homePageHeaderLinks[1]}
          </li>
          <li>
            <strong>{userGuideText.homePageHeaderLinks[2]}</strong>
            {userGuideText.homePageHeaderLinks[3]}
          </li>
          <li>
            <strong>{userGuideText.homePageHeaderLinks[4]}</strong>
            {userGuideText.homePageHeaderLinks[5]}
          </li>
        </ul>
      </div>

      <div className="userGuide__innerContainer">
        <h2>{userGuideText.textReader}</h2>
        <p>{userGuideText.textReaderTextDescription}</p>
        <h3>{userGuideText.textReaderUploadText[0]}</h3>
        <p>{userGuideText.textReaderUploadText[1]}</p>
        <ul>
          <li>
            {userGuideText.textReaderUploadTextOptions[0]}
            <strong>{userGuideText.textReaderUploadTextOptions[1]}</strong>
            {userGuideText.textReaderUploadTextOptions[2]}
          </li>
          <img
            src="../../../../public/userGuideImgs/drag_and_drop_upload.png"
            alt="Drag and Drop Upload"
          />
          <li>{userGuideText.textReaderUploadTextOptions[3]}</li>
          <li>{userGuideText.textReaderUploadTextOptions[4]}</li>
          <img
            src="../../../../public/userGuideImgs/select_texts_defaults.png"
            alt="Select Texts Defaults"
          />
        </ul>
        <p>{userGuideText.textReaderUploadText[2]}</p>

        <h3>{userGuideText.textReaderTextPreview[0]}</h3>
        <p>{userGuideText.textReaderTextPreview[1]}</p>
        <img
          src="../../../../public/userGuideImgs/text_preview.png"
          alt="Text Preview"
        />
      </div>

      <div className="userGuide__innerContainer">
        <h2>{userGuideText.readingControls}</h2>
        <p>{userGuideText.readingControlsDescription}</p>
        <ul>
          <li>
            <span className="obs">{userGuideText.Obs}</span>
            <strong>{userGuideText.readingControlsFeatures[0]}</strong>
            {userGuideText.readingControlsFeatures[1]}
          </li>
          <li>
            <strong>{userGuideText.readingControlsFeatures[2]}</strong>
            {userGuideText.readingControlsFeatures[3]}
          </li>
          <li>
            <strong>{userGuideText.readingControlsFeatures[4]}</strong>
            {userGuideText.readingControlsFeatures[5]}
          </li>
        </ul>
        <img
          src="../../../../public/userGuideImgs/reading_controls.png"
          alt="Reading Controls"
        />
        <p>
          <span className="obs">{userGuideText.Obs}</span>
          {userGuideText.readingControlsObs[0]}
        </p>
        <ul>
          {userGuideText.readingControlsObsList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>{userGuideText.readingControlsObs[1]}</p>
        <p>{userGuideText.readingControlsObs[2]}</p>
        <img
          src="../../../../public/userGuideImgs/tabela_fluencia_leitora.jpg"
          alt="Tabela de Fluência Leitora"
        />
        <h3>{userGuideText.readingControlsButtons[0]}</h3>
        <ul>
          <li>
            <strong>{userGuideText.readingControlsButtons[1]}</strong>
            {userGuideText.readingControlsButtons[2]}
          </li>
          <li>
            <strong>{userGuideText.readingControlsButtons[3]}</strong>
            {userGuideText.readingControlsButtons[4]}
          </li>
          <li>
            <strong>{userGuideText.readingControlsButtons[5]}</strong>
            {userGuideText.readingControlsButtons[6]}
          </li>
        </ul>
      </div>

      <div className="userGuide__innerContainer">
        <h2>{userGuideText.highlightedReading}</h2>
        <p>{userGuideText.highlightedReadingDescription}</p>
        <img
          src="../../../../public/userGuideImgs/highlight_text.png"
          alt="Highlighted Reading"
        />
      </div>

      <div className="userGuide__innerContainer">
        <h2>{userGuideText.tips}</h2>
        <ul>
          {userGuideText.tipsList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="userGuide__innerContainer">
        <h2>{userGuideText.support}</h2>
        <p>
          {userGuideText.supportDescription[0]}
          <a href="/sobre-nos">{userGuideText.supportDescription[1]}</a>
          {userGuideText.supportDescription[2]}
        </p>
      </div>
    </div>
  );
};

export default UserGuide;
