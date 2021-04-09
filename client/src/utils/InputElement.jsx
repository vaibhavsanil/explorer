import React, { Fragment } from "react";

import { CUSTOMER, i18n } from "../constants/index";
// https://www.geeksforgeeks.org/text-transliteration-from-english-to-indian-languages-using-indic-transliteration/
// https://reactjsexample.com/autocomplete-input-field-for-react/
function InputElement({ language, onChangeQuery }) {
  return (
    <>
      <input
        className={CUSTOMER === "KLA" ? "searchInput--kla" : "searchInput--klc"}
        placeholder={
          language === "ENG"
            ? i18n.searchPlaceHolder.eng
            : i18n.searchPlaceHolder.kan
        }
        onChange={onChangeQuery}
        id="transliteration"
      />
    </>
  );
}

export default InputElement;
