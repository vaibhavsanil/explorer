import React, { useEffect, useContext } from "react";
import { CUSTOMER } from "../../../../constants/index";
import KLA404 from "./404-error-page-kla.gif";
import KLC404 from "./404-Error-Page-klc.gif";
import { useHistory, Redirect } from "react-router-dom";
import DebateContext from "../../../../context/Debates/debateContext";
import FacetFilter from "../../tabs/DebateResults/NotFoundFacetFilter--component";

// import { searchConstQueryObject } from "../../../../constants/index";

function NotFound404({ lang }) {
  // const debatecontext = useContext(DebateContext);

  // const {
  //   debateQueryObj,
  //   addSearchQueryFormat,
  //   removeSearchQueryFormat,
  // } = debatecontext;

  let history = useHistory();
  const goHomePage = () => {
    history.goBack();
  };
  useEffect(() => {
    console.info(`[DEBUG] Called for Not Found`);
  }, [lang]);

  // addSearchQueryFormat(searchConstQueryObject);
  return (
    <div className="not-found--debateresults">
      <div className="not-found--imageContainer">
        <img
          src={CUSTOMER === "KLA" ? KLA404 : KLC404}
          alt="errorIllustration"
        />
      </div>
      <div
        className={
          CUSTOMER === "KLA"
            ? "not-found--dialogue--kla"
            : "not-found--dialogue--klc"
        }
      >
        <div>
          <p className="dialogue">
            {lang === "ENG" ? "No Results Found !!!" : " ಫಲಿತಾಂಶಗಳು ಇಲ್ಲ !!! "}
          </p>

          <FacetFilter lang={lang} />
        </div>

        <button className="not-found--button" onClick={(e) => goHomePage()}>
          {lang === "ENG" ? "Home Page" : "ಮುಖ್ಯ ಪುಟ"}{" "}
          <i class="fa fa-reply" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}

export default NotFound404;
