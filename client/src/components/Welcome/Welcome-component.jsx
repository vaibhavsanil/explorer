import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

// Import Constants

import { CUSTOMER, i18n, renderCustomerName } from "../../constants/index";

// Import Components

import SelectElement from "../common/selectElementLanguage";

// Import Images

import SpeakerImage from "../../images/speaker-cropped.jpg";
import ChairmanImage from "../../images/chairman.jpeg";

import SecretaryKLA from "../../images/secretary-kla.jpg";
import SecretaryKLC from "../../images/secretary-klc.jpg";

const WelcomeScreen = (props) => {
  const [ln, setLn] = useState({
    language: "ENG",
  });

  function renderSpeaker(customer, lang, varObject, type) {
    // This function will render the secretary s Name & Designation
    if (customer === "KLA") {
      if (type === "name") {
        const speakerName =
          lang === "ENG"
            ? varObject.speakerName_KLA.eng
            : varObject.speakerName_KLA.kan;
        return speakerName;
      } else {
        const speakerDesigination =
          lang === "ENG"
            ? varObject.speaker_KLA.eng
            : varObject.speaker_KLA.kan;

        return speakerDesigination;
      }
    } else {
      if (type === "name") {
        const secretaryName =
          lang === "ENG"
            ? varObject.chairmanName_KLC.eng
            : varObject.chairmanName_KLC.kan;
        return secretaryName;
      } else {
        const chairmanDesigination =
          lang === "ENG"
            ? varObject.chairman_KLC.eng
            : varObject.chairman_KLC.kan;

        return chairmanDesigination;
      }
    }
  }

  function renderSecretary(customer, lang, varObject, type) {
    // This function will render the secretary s Name & Designation
    if (customer === "KLA") {
      if (type === "name") {
        const secretaryName =
          lang === "ENG"
            ? varObject.secretaryName_KLA.eng
            : varObject.secretaryName_KLA.kan;
        return secretaryName;
      } else {
        const secretaryDesigination =
          lang === "ENG"
            ? varObject.secretary_KLA.eng
            : varObject.secretary_KLA.kan;

        return secretaryDesigination;
      }
    } else {
      if (type === "name") {
        const secretaryName =
          lang === "ENG"
            ? varObject.secretaryName_KLC.eng
            : varObject.secretaryName_KLC.kan;
        return secretaryName;
      } else {
        const secretaryDesigination =
          lang === "ENG"
            ? varObject.secretary_KLC.eng
            : varObject.secretary_KLC.kan;

        return secretaryDesigination;
      }
    }
  }

  function languageChangefunc(e) {
    console.info(e.target.value);
    setLn({ ...ln, language: e.target.value });
  }

  const { language } = ln;
  return (
    <section>
      {/* <div className="circle" /> */}

      <header>
        <div
          className={CUSTOMER === "KLA" ? "logo-name--kla" : "logo-name--klc"}
        >
          {renderCustomerName(CUSTOMER, language, i18n)}
        </div>
        <div>
          <SelectElement customer={CUSTOMER} onClick={languageChangefunc} />
        </div>
      </header>
      <div className="container-main">
        <div className="searchArea">
          <div className="searchInputWrapper">
            <input
              className={
                CUSTOMER === "KLA" ? "searchInput--kla" : "searchInput--klc"
              }
              placeholder={
                language === "ENG"
                  ? i18n.searchPlaceHolder.eng
                  : i18n.searchPlaceHolder.kan
              }
            />
            <button
              type="submit"
              className={
                CUSTOMER === "KLA" ? "searchSubmit--kla" : "searchSubmit--klc"
              }
            >
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div className="imgContainer">
          <div className="keypersonImgContainer">
            <div className="imgBx">
              <img
                id="speaker"
                src={CUSTOMER === "KLA" ? SpeakerImage : ChairmanImage}
                alt="SpeakerImage"
              />
            </div>
            <div className="intro">
              <h4 className="name">
                {renderSpeaker(CUSTOMER, language, i18n, "name")}
              </h4>
              <h5 className="designation">
                {renderSpeaker(CUSTOMER, language, i18n, "desg")}
              </h5>
            </div>
          </div>

          <div className="keypersonImgContainer">
            <div className="imgBx">
              <img
                id="secretary"
                src={CUSTOMER == "KLA" ? SecretaryKLA : SecretaryKLC}
                alt="Secretary "
              />
            </div>
            <div className="intro">
              <h4 className="name">
                {renderSecretary(CUSTOMER, language, i18n, "name")}
              </h4>
              <h5 className="designation">
                {renderSecretary(CUSTOMER, language, i18n, "desg")}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeScreen;
