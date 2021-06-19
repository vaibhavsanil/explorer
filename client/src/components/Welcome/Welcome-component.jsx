import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Contexts
import DebateContext from "../../context/Debates/debateContext";

// Import Constants

import {
  CUSTOMER,
  i18n,
  renderCustomerName,
  searchConstQueryObject,
} from "../../constants/index";

// Import Components

import SelectElement from "../common/selectElementLanguage";

import InputElement from "../../utils/InputElement";

// Import Images

import SpeakerImage from "../../images/speaker-cropped.jpg";
import ChairmanImage from "../../images/chairman.jpeg";

import SecretaryKLA from "../../images/secretary-kla.jpg";
import SecretaryKLC from "../../images/secretary-klc.jpg";

const WelcomeScreen = (props) => {
  const debateContext = useContext(DebateContext);

  const {
    addSearchQuery,
    removeSearchQuery,
    searchQuery,
    debatesearchResult,
    searchRequestBackend,
    searchRequestBackendProm,
    addSearchQueryFormat,
    removeSearchQueryFormat,
    debateQueryObj,
  } = debateContext;

  const history = useHistory();

  // function to push to explorer page if results exists in the state

  useEffect(() => {
    addClassInputElement(CUSTOMER);

    // On Load Push to Explorer If Result Exist
    // pushToExplorer();

    // Clear Global State
    removeSearchQuery();

    addSearchQueryFormat(searchConstQueryObject);
  }, []);

  // Local State
  const [ln, setLn] = useState({
    language: "ENG",
    loading: false,
  });
  // Local Loading State
  // const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");

  function addClassInputElement(customer) {
    // https://stackoverflow.com/questions/6856871/getting-the-parent-div-of-element
    var element = document.getElementsByTagName("input")[0];

    element.classList.add(
      customer === "KLA" ? "searchInput--kla" : "searchInput--klc"
    );

    var parentElement = element.parentNode;
    parentElement.style.width = "80%";
  }

  function onChangeQuery(e) {
    setQuery(e.target.value);
  }

  // Handle Search Submit

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (query.length === 0) {
      toast.error("Please enter a search Query .");
      return;
    }
    // Setting Loading True
    // setLoading(true);
    setLn({ ...ln, loading: true });
    // Pass the query to the gobal state
    let queryObject = addSearchQuery(query.trim(), debateQueryObj);
    // alert("you have searched for - " + query);

    searchRequestBackendProm(queryObject)
      .then((res) => {
        // setLoading(false);
        setLn({ ...ln, loading: false });
        history.push("/explorer/debates");
      })
      .catch((error) => {
        toast.error(
          "Connection to the Server Failed !!! Please Contact System Administrator"
        );
        setLn({ ...ln, loading: false });
      });

    // history.push("/explorer");
  }

  // // Handle Keyboard Submit

  // function keyboardSubmit(e) {
  //   //it triggers by pressing the enter key
  //   if (e.keyCode === 13) {
  //     handleSearchSubmit();
  //     // this.btn.click();
  //   }
  // }

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
          <form action="">
            <div className="searchInputWrapper">
              {/* <input
              className={
                CUSTOMER === "KLA" ? "searchInput--kla" : "searchInput--klc"
              }
              placeholder={
                language === "ENG"
                  ? i18n.searchPlaceHolder.eng
                  : i18n.searchPlaceHolder.kan
              }
              onChange={onChangeQuery}
              id="transliteration"
            /> */}
              <ReactTransliterate
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                lang="kn"
              />
              {/* <InputElement language={language} onChangeQuery={onChangeQuery} /> */}
              <button
                type="submit"
                disabled={ln.loading ? true : false}
                className={
                  CUSTOMER === "KLA" ? "searchSubmit--kla" : "searchSubmit--klc"
                }
                onClick={handleSearchSubmit}
              >
                {ln.loading ? (
                  <i
                    class="fa fa-spinner fa-2x animateLoader"
                    aria-hidden="true"
                  ></i>
                ) : (
                  <i class="fa fa-search"></i>
                )}
                {/* <i class="fa fa-search"></i> */}
              </button>
            </div>
          </form>
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
                src={CUSTOMER === "KLA" ? SecretaryKLA : SecretaryKLC}
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
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
};

export default WelcomeScreen;
