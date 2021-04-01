import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

// Import Constants

import { CUSTOMER, i18n } from "../../constants/index";

// Import Components

import SelectElement from "../common/selectElementLanguage";

// Import Images

import SpeakerImage from "../../images/speaker-cropped.jpg";
import ChairmanImage from "../../images/chairman.jpeg";

import SecretaryKLA from "../../images/secretary-kla.jpg";
import SecretaryKLC from "../../images/secretary-kla.jpg";

const WelcomeScreen = (props) => {
  const [ln, setLn] = useState({
    language: "ENG",
  });

  // Helper Functions
  function renderCustomerName(customer, lang, varObject) {
    // This function will conditional render the Logo Name based on customer
    if (customer === "KLA") {
      const logoName =
        lang === "ENG"
          ? varObject.customerName_KLA.eng
          : varObject.customerName_KLA.kan;

      return logoName;
    } else {
      const logoName =
        lang === "KAN"
          ? varObject.customerName_KLC.eng
          : varObject.customerName_KLC.kan;

      return logoName;
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

        <div
          style={{
            marginRight: "1rem",
            verticalAlign: "middle",
          }}
        >
          <SelectElement
            customer={CUSTOMER}
            onClick={languageChangefunc}
            lang={language}
          />
        </div>
      </header>
      <div className="container-main">
        <div className="searchArea">
          <input placeholder="click to search" />
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
              <p classNam="name">Shri Vishweshwar Hegde Kageri</p>
              <p className="designation">Hon'ble Speaker</p>
            </div>
          </div>

          <div className="keypersonImgContainer">
            <div className="imgBx">
              <img
                id="secretary"
                src={CUSTOMER == "KLA" ? SecretaryKLA : SecretaryKLC}
                alt="Secretary Image"
              />
            </div>
            <div className="intro">
              <p className="name">Smt Vishalaskhi </p>
              <p className="designation">Secretary(I/C)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeScreen;
