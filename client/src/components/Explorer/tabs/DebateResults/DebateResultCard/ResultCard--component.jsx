import React, { Fragment, useState, useEffect } from "react";
import ReactReadMoreReadLess from "react-read-more-read-less";
import Parse from "html-react-parser";
import ReadMore from "../../debateUtils/ReadMore--component";
// import ReadMoreOcr from "../../../../Explorer/tabs/debateUtils/ReadMoreOcr";
import ReadMoreOcr from "../../../../Explorer/tabs/debateUtils/ReadMoreOcrAll--hoc";
import swal from "sweetalert";
import { CUSTOMER, i18n } from "../../../../../constants/index";
function ResultCard({ cardData, lang }) {
  // https://codesandbox.io/s/06mcf?file=/src/index.js:983-1007
  // const [cardItem, setCardItem] = useState({});
  // setCardItem(cardData);
  const { debateParticipants, issues, annexure } = i18n;
  const { _source, highlight, _id } = cardData;

  // function to return debate title subject
  const debateTitleFunc = (ln) => {
    if (
      _source !== undefined &&
      _source !== null &&
      Object.keys(_source).length !== 0
    ) {
      const title =
        ln === "ENG"
          ? _source.debate_title_subject_eng
          : _source.debate_title_subject_kan;

      return title;
    }
  };

  // function to return the debate subject
  const debateSubjectFunc = () => {
    /**
     * Convert a template string into HTML DOM nodes
     * @param  {String} str The template string
     * @return {Node}       The template HTML
     */
    let stringToHTML = function (str) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(str, "text/html");
      return doc.body;
    };
    let returnDebateSubject;
    if (
      highlight !== undefined &&
      Object.keys(highlight).length !== 0 &&
      "debate_subject_kan.suggestion" in highlight
    ) {
      returnDebateSubject = highlight["debate_subject_kan.suggestion"][0];
    } else {
      if (_source !== undefined || _source !== null)
        returnDebateSubject = _source["debate_subject_kan"];
    }
    return returnDebateSubject;
  };
  let debateSUBJECT = debateSubjectFunc();
  // XhqwvcAddJzoVHYSNn96lmNt

  // Parse the OCR Results

  const parseocrResults = () => {
    let returnocrResuts;

    if (
      highlight !== undefined &&
      Object.keys(highlight).length !== 0 &&
      "ocr_schema_section.ocr_text.suggestion" in highlight
    ) {
      returnocrResuts = highlight["ocr_schema_section.ocr_text.suggestion"];
      // console.info(
      //   `[DEBUG][ParseOCR] the value of ${returnocrResuts} \n ${JSON.stringify(
      //     highlight
      //   )} `
      // );
      return returnocrResuts;
    } else {
      return "No Result";
    }
  };

  let parseocr = parseocrResults();

  const renderDebateParticipants = (source, lang) => {
    if (lang === "ENG") {
      const { debate_participants_eng } = source;

      return debate_participants_eng.map((item) => {
        return (
          <>
            <div className="debateParticipants--item">{item}</div>
          </>
        );
      });
    } else {
      const { debate_participants_kan } = source;
      return debate_participants_kan.map((item) => {
        // if (item === "N/A") {
        //   let nodebateParticipants = document.getElementsByClassName(
        //     "resultCard-container--info--debateParticipants"
        //   );

        //   nodebateParticipants[0].style.display = "none";
        //   return;
        // }
        return (
          <>
            <div className="debateParticipants--item">{item}</div>
          </>
        );
      });
    }
  };

  function openAnnexureLink() {
    console.info("The Annexure Link id Clicked");
  }

  function issuesRender() {
    const { issues_section_eng, issues_section_kan } = _source;

    let issues = lang === "ENG" ? issues_section_eng : issues_section_kan;
    // let issuesTest = ["Cauvery Issues", "Farm Issues"];
    return (
      <>
        {issues.map((iss) => {
          return <div className="issuesItem">{iss}</div>;
        })}
      </>
    );
  }
  function renderDateDDMMYY(date) {
    let newDate = date.split("-").reverse().join(".");

    return newDate;
  }

  function renderDebateType(debatetype, language) {
    if (language === "ENG") {
      const debateType =
        debatetype === "part1"
          ? "Question & Answers (Part 1)"
          : "Other than Q&A (Part 2) ";

      return debateType;
    } else {
      const debateType =
        debatetype === "part1"
          ? "ಪ್ರಶ್ನೋತ್ತರ (ಭಾಗ-1)"
          : " ಪ್ರಶ್ನೋತ್ತರವನ್ನು ಹೊರತುಪಡಿಸಿ ಇತರೆ ವಿಷಯಗಳ ಮೇಲೆ ಚರ್ಚೆ (ಭಾಗ-2)";

      return debateType;
    }
  }

  function renderFullPdf() {
    swal({
      title: "Proceed with File ?",
      text:
        "The full pdf being loaded is of large size, it will take time to load ",
      icon: "warning",
      buttons: true,
      dangerMode: false,
    }).then((willDelete) => {
      if (willDelete) {
        console.log(`[DEBUG] The file being downloaded`);
        // https://www.codegrepper.com/code-examples/javascript/frameworks/express/express+send+pdf+to+view
        // https://stackoverflow.com/questions/29987478/pdf-js-using-search-function-on-embedded-pdf
      //  https://stackoverflow.com/questions/14761777/pass-pdf-url-to-pdf-js-in-query-string/20079487
        // window.open()
      }
    });
  }

  return (
    <>
      <div className="resultCard-container">
        <div className="resultCard--row1">
          <div className="resultCard-container--actionButtons">
            <div
              className={
                CUSTOMER === "KLA"
                  ? "actionButtonsHeader--info--kla"
                  : "actionButtonsHeader--info--klc"
              }
            >
              <div>{renderDateDDMMYY(_source["debate_section_date"])}</div>
              <div>{lang === "ENG" ? "Debates" : "ನಡೆವಳಿಕೆಗಳು"}</div>
              <div>{renderDebateType(_source["sectionType"], lang)}</div>
              <div>
                {lang === "ENG" ? "Year" : "ವರ್ಷ"}: {_source["yearBook"]}
              </div>
              <div>
                {lang === "ENG" ? "Assembly" : "ವಿಧಾನ ಸಭೆ"}:{" "}
                {_source["assemblyNumber"]}
              </div>
            </div>
          </div>

          <div className="resultCard-container--info">
            <div
              className={
                CUSTOMER === "KLA"
                  ? "resultCard-container--info--debateSubject--kla"
                  : "resultCard-container--info--debateSubject--klc"
              }
            >
              {cardData._source && debateTitleFunc(lang)}
            </div>
            <div className="resultCard-container--info--debateSubject">
              <ReadMore>{Parse(debateSUBJECT)}</ReadMore>
            </div>

            <div
              className={
                _source.debate_participants_eng[0] !== "N/A" ||
                _source.debate_participants_kan[0] !== "N/A"
                  ? "resultCard-container--info--debateParticipants"
                  : "resultCard-container--info--debateParticipants--nodDisplay"
              }
            >
              <div
                className={
                  CUSTOMER === "KLA"
                    ? "resultCard-container--info--debateParticipants--header-kla"
                    : "resultCard-container--info--debateParticipants--header-klc"
                }
              >
                <div>
                  {lang === "ENG"
                    ? debateParticipants.eng
                    : "ಚರ್ಚೆಯಲ್ಲಿ ಭಾಗವಹಿಸಿದ ಸದಸ್ಯರು"}
                </div>
              </div>
              <div className="resultCard-container--info--debateParticipants--container">
                {renderDebateParticipants(_source, lang)}
              </div>
            </div>
            <div className="resultCard-container--info--ocrInfo">
              {/* <ReadMoreOcr>{Parse(parseocr)}</ReadMoreOcr> */}
              <ReadMoreOcr ocrData={parseocr} />
            </div>
            {_source.annexure_title === "N/A" ? (
              ""
            ) : (
              <div className="resultCard-container--info--annexure-header">
                <div
                  className={
                    CUSTOMER === "KLA"
                      ? "annexureHeader--kla"
                      : "annexureHeader--klc"
                  }
                >
                  {lang === "ENG" ? i18n.annexure.eng : i18n.annexure.kan}
                </div>
                <div className="annexureContainer" onClick={openAnnexureLink}>
                  {_source.annexure_title}
                </div>
              </div>
            )}
            {_source.issues_section_eng[0] === "N/A" ? (
              ""
            ) : (
              <div className="reasultCard--info--issuesContainer">
                <div
                  className={
                    CUSTOMER === "KLA"
                      ? "issuesHeader--kla"
                      : "issuesHeader--klc"
                  }
                >
                  {lang === "ENG" ? i18n.issues.eng : i18n.issues.kan}
                </div>
                <div className="issuesContainer">{issuesRender()}</div>
              </div>
            )}
          </div>
        </div>

        <div className="cardFooter">
          <button
            className={
              CUSTOMER === "KLA"
                ? "resultCard--fullPdf--kla"
                : "resultCard--fullPdf--klc"
            }
            onClick={renderFullPdf}
          >
            <i class="fa fa-file-pdf-o" aria-hidden="true"></i>{" "}
            {lang === "ENG" ? "Debate Book" : "ಪೂರ್ಣ ಪುಸ್ತಕ"}
          </button>
        </div>
      </div>
    </>
  );
}

export default ResultCard;
