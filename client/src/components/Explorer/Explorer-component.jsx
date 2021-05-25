import React, { useState, useContext, useEffect } from "react";
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useHistory,
} from "react-router-dom";

import SelectElement from "../common/selectElementLanguage";

// Import Loading
import LoadingButton from "../../utils/Loading";

// Import Debate Context
import DebateContext from "../../context/Debates/debateContext";

// Import Constants

import { CUSTOMER, i18n, renderCustomerName } from "../../constants/index";

// Import Components

import DebateResults from "./tabs/DebatesResults--component";
import NewsResults from "./tabs/NewsResults--component";
import NotFound from "./tabs/NotFound--component";

function Explorer(props) {
  const debateContext = useContext(DebateContext);
  const {
    searchquery,
    removeSearchQuery,
    debatesearchResult,
    removeSearchQueryResults,
    searchRequestBackendProm,
    searchRequestExplorerProm,
    debateQueryObj,
    addSearchQueryFormat,
  } = debateContext;
  let { path, url } = useRouteMatch();

  // Debug
  const history = useHistory();

  // console.info(`[DEBUG] Path is ${path}  url is ${url}`);

  const [ln, setLn] = useState({
    language: "ENG",
  });

  const [searchState, setSearch] = useState({
    searchTerm: "",
  });

  const searchTermQuery = searchState.searchTerm;

  const [loading, setLoading] = useState(false);
  // REF  https://dev.to/otamnitram/react-useeffect-cleanup-how-and-when-to-use-it-2hbm
  useEffect(() => {
    // Push to Welcome if the result state is zero
    pushToWelcome();
    // Sett Search Query to Local State
    setSearch({ ...searchTerm, searchTerm: debateQueryObj["qp"] });
    addClassInputElement(CUSTOMER);
    // Remove Query to Local State
    removeSearchQuery();

    // Add Event Listener to Enter Key Press
    // keyBoardEnterPress();

    return function cleanUp() {
      removeSearchQueryResults();
    };
  }, []);

  //
  function pushToWelcome() {
    var sizeObject = Object.keys(debatesearchResult).length;
    if (sizeObject === 0) {
      history.push("/");
    }
  }

  // Function detect Keyboard Enter
  function keyBoardEnterPress() {
    // Get the input field
    var input = document.getElementsByTagName("input")[0];

    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function (event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("searchButton").click();
      }
    });
  }

  // Change the atribute of the element
  function addClassInputElement(customer) {
    // https://stackoverflow.com/questions/6856871/getting-the-parent-div-of-element
    var element = document.getElementsByTagName("input")[0];

    element.classList.add(
      customer === "KLA" ? "searchInput-explorer" : "searchInput-explorer"
    );

    var parentElement = element.parentNode;
    parentElement.style.width = "80%";
  }

  // Change Language Function
  function languageChangefunc(e) {
    // console.info(e.target.value);
    setLn({ language: e.target.value });
  }

  function changeSearchState(e) {
    setSearch({ ...searchState, searchTerm: e.target.value });
  }

  // On Submit of Button
  function onSubmitAction(e) {
    e.preventDefault();
    setLoading(true);
    if (searchTermQuery.length === 0) {
      toast.error("Please enter a Search Query .");
      setLoading(false);
      return;
    }

    let globalSearchQuery = debateQueryObj;
    // Storing the query phrase
    globalSearchQuery["qp"] = searchState.searchTerm.trim();
    addSearchQueryFormat(globalSearchQuery);
    searchRequestExplorerProm(debateContext)
      .then((res) => {
        // setLoading(false);
        // setLn({ ...ln, loading: false });
        setLoading(false);
        // history.push("/explorer/debates");
      })
      .catch((error) => {
        toast.error(
          "Connection to the Server Failed !!! Please Contact System Administrator"
        );
        setLoading(false);
      });
  }

  const { language } = ln;

  const { searchTerm } = searchState;
  const { explorerHeaders } = i18n;

  return (
    <Router>
      <div className="container-main-explorer">
        <div
          className={
            CUSTOMER === "KLA" ? "gradient-ribbon--KLA" : "gradient-ribbon--KLC"
          }
        ></div>

        <header>
          <div className="header-main">
            <div className="header--level1">
              <Link
                to="/"
                className={
                  CUSTOMER === "KLA" ? "logo-name--kla" : "logo-name--klc"
                }
              >
                {renderCustomerName(CUSTOMER, language, i18n)}
              </Link>

              <div>
                <form
                  style={{
                    display: "flex",
                    width: "100%",
                  }}
                  action=""
                >
                  <div
                    className={
                      CUSTOMER === "KLA"
                        ? "searchContainer-explorer--kla"
                        : "searchContainer-explorer--klc"
                    }
                  >
                    {/* <div className="searchInputWrapper"> */}
                    <div
                      className={
                        CUSTOMER === "KLA" ? "searchIcon" : "searchIcon"
                      }
                    >
                      <i class="fa fa-search"></i>
                    </div>

                    <ReactTransliterate
                      value={searchState.searchTerm}
                      onChange={(e) =>
                        setSearch({ searchTerm: e.target.value })
                      }
                      lang="kn"
                    />
                  </div>
                  {/* <input
                    className={
                      CUSTOMER === "KLA"
                        ? "searchInput-explorer"
                        : "searchInput-explorer"
                    }
                    placeholder={
                      language === "ENG"
                        ? i18n.searchPlaceHolder.eng
                        : i18n.searchPlaceHolder.kan
                    }
                    value={searchState.searchTerm}
                    onChange={changeSearchState}
                  /> */}
                  {/* </div> */}
                  <button
                    type="submit"
                    id="searchButton"
                    disabled={loading ? true : false}
                    className={
                      CUSTOMER === "KLA"
                        ? "searchSubmit-explorer--kla"
                        : "searchSubmit-explorer--klc"
                    }
                    onClick={onSubmitAction}
                  >
                    {loading ? <LoadingButton /> : <i class="fa fa-search"></i>}
                  </button>
                </form>
              </div>

              <div
                style={{
                  marginLeft: "1rem",
                  verticalAlign: "middle",
                }}
              >
                <SelectElement
                  customer={CUSTOMER}
                  onClick={languageChangefunc}
                  lang={language}
                />
              </div>
            </div>
            <div className="header--level2">
              <ul
                className={
                  CUSTOMER === "KLA"
                    ? "header-navigation--kla"
                    : "header-navigation--klc"
                }
              >
                <li id="debatesTab">
                  <i class="fa fa-users" aria-hidden="true"></i>
                  <Link to={`${url}/debates`}>
                    {language === "ENG"
                      ? explorerHeaders.debatesHeader.eng
                      : explorerHeaders.debatesHeader.kan}
                  </Link>
                </li>
                <li id="newsTab">
                  <i class="fa fa-newspaper-o" aria-hidden="true"></i>
                  <Link to={`${url}/news`}>
                    {" "}
                    {language === "ENG"
                      ? explorerHeaders.newsHeader.eng
                      : explorerHeaders.newsHeader.kan}
                  </Link>
                </li>
                <li id="reviewTab">
                  <i class="fa fa-address-book-o" aria-hidden="true"></i>
                  <Link to={`${url}/review`}>
                    {" "}
                    {language === "ENG"
                      ? explorerHeaders.reviewHeader.eng
                      : explorerHeaders.reviewHeader.kan}
                  </Link>
                </li>
                <li id="budgetTab">
                  <i class="fa fa-inr" aria-hidden="true"></i>
                  <Link to={`${url}/budget`}>
                    {" "}
                    {language === "ENG"
                      ? explorerHeaders.budgetHeader.eng
                      : explorerHeaders.budgetHeader.kan}
                  </Link>
                </li>
                <li id="whowhoTab">
                  <i class="fa fa-user" aria-hidden="true"></i>

                  <Link to={`${url}/whoswho`}>
                    {" "}
                    {language === "ENG"
                      ? explorerHeaders.whoswhoHeader.eng
                      : explorerHeaders.whoswhoHeader.kan}
                  </Link>
                </li>
                <li id="vedioTab">
                  <i class="fa fa-video-camera" aria-hidden="true"></i>
                  <Link to={`${url}/vedio`}>
                    {" "}
                    {language === "ENG"
                      ? explorerHeaders.vedioHeader.eng
                      : explorerHeaders.vedioHeader.kan}
                  </Link>
                </li>
                <li>
                  <Link to={`${url}/vedio`}>
                    {" "}
                    {language === "ENG"
                      ? explorerHeaders.advancedSearch.eng
                      : explorerHeaders.advancedSearch.kan}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </header>
        <section className="section-results-main">
          <Switch>
            <Route exact path={path}>
              <DebateResults />
            </Route>

            <Route
              exact
              path={`${path}/debates`}
              component={() => (
                <DebateResults lang={language} searchTerm={searchTermQuery} />
              )}
            />
            <Route exact path={`${path}/news`} component={NewsResults} />
            <Route component={NotFound} />
          </Switch>
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

        <footer>
          <h6>This is footer</h6>
        </footer>
      </div>
    </Router>
  );
}

export default Explorer;
