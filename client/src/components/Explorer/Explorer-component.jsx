import React, { useState, useContext, useEffect } from "react";

import { Link } from "react-router-dom";

import SelectElement from "../common/selectElementLanguage";

// Import Constants

import { CUSTOMER, i18n, renderCustomerName } from "../../constants/index";

function Explorer(props) {
  const [ln, setLn] = useState({
    language: "ENG",
  });

  const [searchState, setSearch] = useState({
    searchTerm: "",
  });

  // Change Language Function
  function languageChangefunc(e) {
    // console.info(e.target.value);
    setLn({ ...ln, language: e.target.value });
  }

  function changeSearchState(e) {
    setSearch({ searchTerm: e.target.value });
  }

  const { language } = ln;

  const { searchTerm } = searchState;
  const { explorerHeaders } = i18n;

  return (
    <div className="container-main-explorer">
      <div
        className={
          CUSTOMER === "KLA" ? "gradient-ribbon--KLA" : "gradient-ribbon--KLC"
        }
      ></div>

      <header>
        <div className="header-main">
          <div className="header--level1">
            <div
              className={
                CUSTOMER === "KLA" ? "logo-name--kla" : "logo-name--klc"
              }
            >
              {renderCustomerName(CUSTOMER, language, i18n)}
            </div>
            <div
              className={
                CUSTOMER === "KLA"
                  ? "searchContainer-explorer--kla"
                  : "searchContainer-explorer--klc"
              }
            >
              <div className="searchInputWrapper">
                <div className="searchIcon">
                  <i class="fa fa-search"></i>
                </div>
                <input
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
                  value={searchTerm}
                  onChange={changeSearchState}
                />
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
                <a href="#banner">
                  {language === "ENG"
                    ? explorerHeaders.debatesHeader.eng
                    : explorerHeaders.debatesHeader.kan}
                </a>
              </li>
              <li>
                <i class="fa fa-newspaper-o" aria-hidden="true"></i>
                <a href="#about">
                  {" "}
                  {language === "ENG"
                    ? explorerHeaders.newsHeader.eng
                    : explorerHeaders.newsHeader.kan}
                </a>
              </li>
              <li>
                <i class="fa fa-address-book-o" aria-hidden="true"></i>
                <a href="#menu">
                  {" "}
                  {language === "ENG"
                    ? explorerHeaders.reviewHeader.eng
                    : explorerHeaders.reviewHeader.kan}
                </a>
              </li>
              <li>
                <i class="fa fa-inr" aria-hidden="true"></i>
                <a href="#expert">
                  {" "}
                  {language === "ENG"
                    ? explorerHeaders.budgetHeader.eng
                    : explorerHeaders.budgetHeader.kan}
                </a>
              </li>
              <li>
                <i class="fa fa-user" aria-hidden="true"></i>

                <a href="#expert">
                  {" "}
                  {language === "ENG"
                    ? explorerHeaders.whoswhoHeader.eng
                    : explorerHeaders.whoswhoHeader.kan}
                </a>
              </li>
              <li>
                <i class="fa fa-video-camera" aria-hidden="true"></i>
                <a href="#testi">
                  {" "}
                  {language === "ENG"
                    ? explorerHeaders.vedioHeader.eng
                    : explorerHeaders.vedioHeader.kan}
                </a>
              </li>
              <li>
                <a href="#contact">
                  {" "}
                  {language === "ENG"
                    ? explorerHeaders.advancedSearch.eng
                    : explorerHeaders.advancedSearch.kan}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <section className="section-results-main">
        <h6>This is Section</h6>
      </section>
      <footer>
        <h6>This is footer</h6>
      </footer>
    </div>
  );
}

export default Explorer;
