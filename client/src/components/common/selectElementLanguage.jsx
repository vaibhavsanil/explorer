import React, { Fragment } from "react";

function selectElement({ onClick, lang, customer }) {
  return (
    <>
      {/* <label for="lang" className="selectLabel">
        {lang === "ENG" ? "Select Language" : "ಭಾಷೆ"}{" "}
      </label> */}
      <select
        for="lang"
        className={
          customer === "KLA"
            ? "custom-select-KLA menu-select-KLA"
            : "custom-select-KLC menu-select-KLC"
        }
        onClick={onClick}
      >
        <option value="ENG">English</option>
        <option value="KAN">ಕನ್ನಡ</option>
      </select>
    </>
  );
}

export default selectElement;
