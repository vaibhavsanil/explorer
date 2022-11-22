import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import { disableBookId } from "../../constants/index";

// import {
//   AppstoreOutlined,
//   MailOutlined,
//   SettingOutlined,
//   SearchOutlined,
// } from '@ant-design/icons';

import Collapsible from "../common/CollapsibleWelcome";
import SourceSelect from "../common/WelcomeSelect/SourceSelect";
import SingleSelect from "../common/WelcomeSelect/SingleSelect";

import DebateContext from "../../context/Debates/debateContext";
import MultiSelect from "../common/WelcomeSelect/MultiSelect";
import "./SidebarMenu.css";

function Sidebarmenu({ lang, customer }) {
  const debateContext = useContext(DebateContext);
  const history = useHistory();
  const { statsQueryWelcome } = debateContext;

  const { analysis } = statsQueryWelcome;

  // Get Full Debates

  const pushGetDebates = () => {
    history.push("/debates");
  };

  // Debate Title Value

  const debateTitle =
    lang === "ENG"
      ? analysis.debateTitleEng_bucket
      : analysis.debateTitleKan_bucket;

  return (
    <div className="sidebarMenu">
      <Collapsible
        lang={lang}
        headerEng="Select Source"
        headerKan="ಮೂಲವನ್ನು ಆಯ್ಕೆಮಾಡಿ"
        icon="fa-home"
        customer={customer}
      >
        <SourceSelect lang={lang} />
      </Collapsible>
      <Collapsible
        lang={lang}
        headerEng="Debate Type"
        headerKan="ಚರ್ಚೆಯ ವಿಧಾ"
        icon="fa "
        customer={customer}
      >
        <SingleSelect
          name="debateType"
          lang={lang}
          data={analysis.debateType_bucket}
        />
      </Collapsible>
      <Collapsible
        lang={lang}
        headerEng="Assembly Number"
        headerKan="ವಿಧಾನ ಸಭೆಯ ಸಂಖ್ಯೆ "
        icon="fa"
        customer={customer}
      >
        <MultiSelect
          name="assemblyNumber"
          holderName="Please Select Assembly Number"
          data={analysis.assemblyNumber_bucket}
          lang={lang}
        />
      </Collapsible>
      <Collapsible
        lang={lang}
        headerEng="Session Number"
        headerKan="ವಿಧಾನ ಸಭೆಯ ಸಂಖ್ಯೆ "
        icon="fa"
        customer={customer}
      >
        <MultiSelect
          name="sessionNumber"
          holderName="Please Select Session Number"
          data={analysis.sessionNumber_bucket}
          lang={lang}
        />
      </Collapsible>
      <Collapsible
        lang={lang}
        headerEng="Debate Title"
        headerKan="ಚರ್ಚೆಯ ಶೀರ್ಷಕೆ"
        icon="fa"
        customer={customer}
      >
        <MultiSelect
          name="debateTitle"
          holderName="Please Select Debate Title"
          data={
            lang === "ENG"
              ? analysis.debateTitleEng_bucket
              : analysis.debateTitleKan_bucket
          }
          lang={lang}
        />
      </Collapsible>
      <Collapsible
        lang={lang}
        headerEng="Debate Participants"
        headerKan="ಚರ್ಚೆಯಲ್ಲಿ ಭಾಗವಹಿಸಿದ ಸದಸ್ಯರು/ಸಚಿವರು"
        icon="fa"
        customer={customer}
      >
        <MultiSelect
          name="debatePart"
          holderName="Please Select Debate Participants"
          data={
            lang === "ENG"
              ? analysis.debateParticiapantsEng_bucket
              : analysis.debateParticiapantsKan_bucket
          }
          lang={lang}
        />
      </Collapsible>
      <Collapsible
        lang={lang}
        headerEng="Questioner's Name"
        headerKan="ಚರ್ಚೆಯ ಶೀರ್ಷಕೆ"
        icon="fa"
        customer={customer}
      >
        <MultiSelect
          name="debatePart"
          holderName="Please Select Questioner's Name"
          data={
            lang === "ENG"
              ? analysis.debateParticiapantsEng_bucket
              : analysis.debateParticiapantsKan_bucket
          }
          lang={lang}
        />
      </Collapsible>

      {!disableBookId && (
        <Collapsible
          lang={lang}
          headerEng="Book Id"
          headerKan="ಪುಸ್ತಕ ಸಂಖ್ಯೆ"
          icon="fa"
          customer={customer}
        >
          <MultiSelect
            name="bookId"
            holderName="Please Select Questioner's Name"
            data={analysis.bookId_bucket}
          />
        </Collapsible>
      )}
      <div className="footerWelcomeButtons">
        <button
          className={
            customer === "KLA"
              ? "linkToDebatesWelcome--kla"
              : "linkToDebatesWelcome--klc"
          }
          onClick={pushGetDebates}
        >
          <i
            style={{ marginRight: "0.5rem" }}
            class="fa fa-book"
            aria-hidden="true"
          ></i>
          {lang === "ENG" ? "Search Full Debates" : "ಪೂರ್ಣ ಪುಸ್ತಕ"}
        </button>
      </div>
    </div>
  );
}

export default Sidebarmenu;
