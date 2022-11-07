import React, { useContext, useEffect } from 'react';
import 'antd/dist/antd.css';
import { disableBookId } from '../../constants/index';

// import {
//   AppstoreOutlined,
//   MailOutlined,
//   SettingOutlined,
//   SearchOutlined,
// } from '@ant-design/icons';

import Collapsible from '../common/CollapsibleWelcome';
import SourceSelect from '../common/WelcomeSelect/SourceSelect';
import SingleSelect from '../common/WelcomeSelect/SingleSelect';

import DebateContext from '../../context/Debates/debateContext';
import MultiSelect from '../common/WelcomeSelect/MultiSelect';
import './SidebarMenu.css';

function Sidebarmenu({ lang, customer }) {
  const debateContext = useContext(DebateContext);

  const { statsQueryWelcome } = debateContext;

  // useEffect(() => {}, [statsQueryWelcome]);
  // const {
  //   analysis: {
  //     debateParticiapantsEng_bucket,
  //     debateParticiapantsKan_bucket,
  //     assemblyNumber_bucket,
  //     issuesSection_eng_bucket,
  //     issuesSection_kan_bucket,
  //     yearFilter_bucket,
  //     debateTitleEng_bucket,
  //     debateTitleKan_bucket,
  //     debateType_bucket,
  //     sessionNumber_bucket,
  //     bookId_bucket,
  //   },
  // } = statsQueryWelcome;

  const { analysis } = statsQueryWelcome;

  // console.log(
  //   ` The value of the stats Query Welcome ${JSON.stringify(analysis)} `
  // );
  // Get Full Debates

  const pushGetDebates = () => {};

  // Debate Title Value

  const debateTitle =
    lang === 'ENG'
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
        <SingleSelect lang={lang} data={analysis.debateType_bucket} />
      </Collapsible>
      <Collapsible
        lang={lang}
        headerEng="Assembly Number"
        headerKan="ವಿಧಾನ ಸಭೆಯ ಸಂಖ್ಯೆ "
        icon="fa"
        customer={customer}
      >
        <MultiSelect
          holderName="Please Select Assembly Number"
          data={analysis.assemblyNumber_bucket}
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
          holderName="Please Select Session Number"
          data={analysis.sessionNumber_bucket}
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
          holderName="Please Select Debate Title"
          data={
            lang === 'ENG'
              ? analysis.debateTitleEng_bucket
              : analysis.debateTitleKan_bucket
          }
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
          holderName="Please Select Debate Participants"
          data={
            lang === 'ENG'
              ? analysis.debateParticiapantsEng_bucket
              : analysis.debateParticiapantsKan_bucket
          }
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
          holderName="Please Select Questioner's Name"
          data={
            lang === 'ENG'
              ? analysis.debateParticiapantsEng_bucket
              : analysis.debateParticiapantsKan_bucket
          }
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
            holderName="Please Select Questioner's Name"
            data={analysis.bookId_bucket}
          />
        </Collapsible>
      )}
      <div className="footerWelcomeButtons">
        <button
          className={
            customer === 'KLA'
              ? 'linkToDebatesWelcome--kla'
              : 'linkToDebatesWelcome--klc'
          }
          onClick={pushGetDebates}
        >
          <i
            style={{ marginRight: '0.5rem' }}
            class="fa fa-book"
            aria-hidden="true"
          ></i>
          {lang === 'ENG' ? 'Search Full Debates' : 'ಪೂರ್ಣ ಪುಸ್ತಕ'}
        </button>
      </div>
    </div>
  );
}

export default Sidebarmenu;
