import React, { useState, useContext, useEffect } from "react";
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import SelectElement from "../common/selectElementLanguage";

// Import Debate Context
import DebateContext from "../../context/Debates/debateContext";

// Import Constants

import { CUSTOMER, i18n, renderCustomerName } from "../../constants/index";

// Import Components

import DebateResults from "./tabs/DebatesResults--component";
import NewsResults from "./tabs/NewsResults--component";

function Explorer(props) {
  const debateContext = useContext(DebateContext);
  const { searchquery, removeSearchQuery } = debateContext;
  let { path, url } = useRouteMatch();

  // Debug

  // console.info(`[DEBUG] Path is ${path}  url is ${url}`);

  const [ln, setLn] = useState({
    language: "ENG",
  });

  const [searchState, setSearch] = useState({
    searchTerm: "",
  });

  useEffect(() => {
    // Sett Search Query to Local State
    setSearch({ ...searchTerm, searchTerm: searchquery });
    addClassInputElement(CUSTOMER);
    // Remove Query to Local State
    removeSearchQuery();
  }, []);

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
    setLn({ ...ln, language: e.target.value });
  }

  function changeSearchState(e) {
    setSearch({ ...searchState, searchTerm: e.target.value });
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

              <div
                className={
                  CUSTOMER === "KLA"
                    ? "searchContainer-explorer--kla"
                    : "searchContainer-explorer--klc"
                }
              >
                <div className="searchInputWrapper">
                  <div
                    className={CUSTOMER === "KLA" ? "searchIcon" : "searchIcon"}
                  >
                    <i class="fa fa-search"></i>
                  </div>

                  <ReactTransliterate
                    value={searchState.searchTerm}
                    onChange={(e) => setSearch({ searchTerm: e.target.value })}
                    lang="kn"
                  />

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
                </div>
              </div>
              <button
                type="submit"
                className={
                  CUSTOMER === "KLA"
                    ? "searchSubmit-explorer--kla"
                    : "searchSubmit-explorer--klc"
                }
              >
                <i class="fa fa-search"></i>
              </button>

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
                <li>
                  <i class="fa fa-users" aria-hidden="true"></i>
                  <Link to={`${url}/debates`}>
                    {language === "ENG"
                      ? explorerHeaders.debatesHeader.eng
                      : explorerHeaders.debatesHeader.kan}
                  </Link>
                </li>
                <li>
                  <i class="fa fa-newspaper-o" aria-hidden="true"></i>
                  <Link to={`${url}/news`}>
                    {" "}
                    {language === "ENG"
                      ? explorerHeaders.newsHeader.eng
                      : explorerHeaders.newsHeader.kan}
                  </Link>
                </li>
                <li>
                  <i class="fa fa-address-book-o" aria-hidden="true"></i>
                  <Link to={`${url}/review`}>
                    {" "}
                    {language === "ENG"
                      ? explorerHeaders.reviewHeader.eng
                      : explorerHeaders.reviewHeader.kan}
                  </Link>
                </li>
                <li>
                  <i class="fa fa-inr" aria-hidden="true"></i>
                  <Link to={`${url}/budget`}>
                    {" "}
                    {language === "ENG"
                      ? explorerHeaders.budgetHeader.eng
                      : explorerHeaders.budgetHeader.kan}
                  </Link>
                </li>
                <li>
                  <i class="fa fa-user" aria-hidden="true"></i>

                  <Link to={`${url}/whoswho`}>
                    {" "}
                    {language === "ENG"
                      ? explorerHeaders.whoswhoHeader.eng
                      : explorerHeaders.whoswhoHeader.kan}
                  </Link>
                </li>
                <li>
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

            <Route exact path={`${path}/debates`} component={DebateResults} />
            <Route exact path={`${path}/news`} component={NewsResults} />
          </Switch>
        </section>

        <footer>
          <h6>This is footer</h6>
        </footer>
      </div>
    </Router>
  );
}

export default Explorer;
