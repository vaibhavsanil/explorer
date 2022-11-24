import React, { useState, useEffect, useContext } from "react";
import ReactLoading from "react-loading";
import { Link, useHistory } from "react-router-dom";
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import "antd/dist/antd.css";
import { Drawer } from "antd";
import { notification, Alert } from "antd";

import FilterComponent from "./WelcomeFacetFilterContainer";

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

import SidebarMenu from "../sidebarmenu/Sidebarmenu";
// Import Images

// import SpeakerImage from "../../images/speaker-cropped.jpg";
import SpeakerImage from "../../images/kageri.jpg";

import ChairmanImage from "../../images/chairman.jpg";

import SecretaryKLA from "../../images/secretary-kla.jpg";
import SecretaryKLC from "../../images/secretary-klc.jpg";
import { ADD_LOADING_LOCAL_STATE } from "../../context/types";

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
    addWelcomQueryStats,
    removeWelcomQueryStats,
    loading,
    addLoading,
    removeLoading,
    errors,
    removeError,
    queryObjectCheck,
    showFilter,
    removeFilter,
  } = debateContext;

  const history = useHistory();

  // Ant Toast Notification

  const openNotificationServerError = () => {
    notification.error({
      message: "Server Connection Error !!! Unable to Connect to the Server",
      description:
        "Please Check Your Internet Connection or Contact System Administrator.",
      placement: "bottomLeft",
    });
  };

  const openNotificationEmptyServer = () => {
    notification.info({
      message: "Please enter a search query !!!",
      description: "Please enter a search query to search",
      placement: "bottomLeft",
    });
    // api.info({
    //   message: 'Please enter a search query !!!',
    //   description: 'Please enter a search query to search !!!',
    //   placement: 'bottomLeft',
    // });
  };

  const searchConstObject = {
    ln: "",
    srt: "",
    qt: "PRC",
    qp: "",
    dtf: [],
    anf: "",
    snf: "",
    dsubfEng: [],
    dsubfKan: [],
    dpfEng: [],
    dpfKan: [],
    dbf: "",
    ytf: [],
    sectionDateFrm: "",
    sectionDateTo: "",
    //bookId: [],
    issfEng: [],
    issfKan: [],
    tagfKan: [],
    tagfEng: [],
  };

  useEffect(() => {
    addClassInputElement(CUSTOMER);

    // On Load Push to Explorer If Result Exist
    // pushToExplorer();

    // Clear Global State
    removeSearchQuery();
    // console.info(
    //   `[DEBUG] The Add Search Query from Welcome Screen being called !!! \n ${JSON.stringify(
    //     searchConstObject
    //   )} `
    // );
    addSearchQueryFormat(searchConstObject);
    addWelcomQueryStats();
    removeFilter();

    return () => {
      removeWelcomQueryStats();
      removeError();
    };
  }, []);

  // const [showFilter, ChangeFilter] = useState(false);

  // useEffect(() => {
  //   const filterBool = queryObjectCheck(debateQueryObj);
  //   ChangeFilter(filterBool);
  //   console.log(
  //     `The value of debate Query Object use Effect Called ${showFilter} `
  //   );
  // }, [JSON.stringify(debateQueryObj)]);

  // Local State
  const [ln, setLn] = useState({
    language: "ENG",
    loading: false,
  });

  const [drawer, setDrawer] = useState(false);
  // Local Loading State
  // const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");

  function setShowDrawer() {
    // console.log('from Welecome Component the drawer value is', drawer);
    setDrawer(!drawer);
  }

  function setHideDrawer() {
    setDrawer(false);
  }

  function addClassInputElement(customer, lang) {
    // https://stackoverflow.com/questions/6856871/getting-the-parent-div-of-element
    var element = document.getElementsByTagName("input")[0];
    const placeHolderText = (lang = "ENG"
      ? "Search For Debates, Review, Bills ...."
      : "Search For Debates, Review, Bills ....");
    element.classList.add(
      customer === "KLA" ? "searchInput--kla" : "searchInput--klc"
    );

    element.placeholder = placeHolderText;

    var parentElement = element.parentNode;
    parentElement.style.width = "80%";
  }

  function onChangeQuery(e) {
    e.preventDefault();
    setQuery(e.target.value);
  }

  function setQueryNull() {
    setQuery("");
  }

  // Handle Search Submit

  function handleSearchSubmit(e) {
    e.preventDefault();
    addLoading();
    // TO-DO Fix Empty Request
    // if (query.length === 0) {
    //   // toast.error('Please enter a search Query .');
    //   openNotificationEmptyServer();
    //   removeLoading();
    //   return;
    // }

    let queryObject = addSearchQuery(query.trim(), debateQueryObj);
    // alert("you have searched for - " + query);

    searchRequestBackendProm(queryObject)
      .then((res) => {
        // setLoading(false);
        // setLn({ ...ln, loading: false });
        removeLoading();
        history.push("/explorer/debates");
      })
      .catch((error) => {
        // toast.error(
        //   'Connection to the Server Failed !!! Please Contact System Administrator'
        // );
        openNotificationServerError();
        // setLn({ ...ln, loading: false });
        removeLoading();
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
    // console.info(e.target.value);
    setLn({ ...ln, language: e.target.value });
  }

  const { language } = ln;
  return (
    <>
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
            <div className="errorWelcomeMessage">
              {Object.keys(errors).length > 0 && (
                <Alert
                  message="Error ,Unable to Connect to Server!!!"
                  type="error"
                  showIcon
                  closable
                />
              )}
            </div>

            {showFilter && (
              <div
                className={
                  CUSTOMER === "KLA"
                    ? "fieldSetHeader--kla"
                    : "fieldSetHeader--klc"
                }
              >
                <h5>{language === "ENG" ? "Filter" : "ಫಿಲ್ಟರ್"}</h5>
                <FilterComponent lang={language} />
              </div>
            )}

            {/* <fieldset>
              <legend>{language === "ENG" ? "Filter" : "ಫಿಲ್ಟರ್"}</legend>
              <FilterComponent lang={language} />
            </fieldset> */}

            <div className="welcomeShape"></div>
            <form action="">
              <div className="searchGlassContainer">
                <div className="searchInputWrapper">
                  {loading ? (
                    <ReactLoading
                      type="spin"
                      color={CUSTOMER === "KLA" ? "#017143" : "#c53330"}
                      height={50}
                      width={50}
                    />
                  ) : (
                    <i className="fa fa-search searchIconWelcome"></i>
                  )}
                  <ReactTransliterate
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    lang="kn"
                  />
                  {/* <InputElement language={language} onChangeQuery={onChangeQuery} /> */}

                  {query.length > 0 ? (
                    <a
                      onClick={(e) => setQueryNull()}
                      className="welcome-closeQuery"
                    >
                      X
                    </a>
                  ) : (
                    ""
                  )}

                  <button
                    type="submit"
                    disabled={loading ? true : false}
                    className={
                      CUSTOMER === "KLA"
                        ? "searchSubmit--kla"
                        : "searchSubmit--klc"
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
              </div>
            </form>
            <div className="advancedSearchButton--welcome">
              <button
                id={
                  CUSTOMER === "KLA"
                    ? "advancedButton--kla"
                    : "advancedButton--klc"
                }
                onClick={(e) => setShowDrawer()}
              >
                Advanced Search
              </button>
              {/* <button id="advancedButton--klc">Advanced Search</button> */}
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
        {/* <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> */}
      </section>
      <Drawer
        title="Advanced Search"
        placement="left"
        onClose={setHideDrawer}
        visible={drawer}
        bodyStyle={{
          padding: "2rem 0rem",
        }}
      >
        <SidebarMenu lang={ln.language} customer={CUSTOMER} />
      </Drawer>
      {/* <footer>This is Footer</footer> */}
    </>
  );
};

export default WelcomeScreen;
