import React, { useEffect, useContext } from "react";
import DebateContext from "../../context/Debates/debateContext";
import { searchConstQueryObject } from "../../constants/index";

function NotFound() {
  // console.info(
  //   `[DEBUG][Not Found] the search Query ${JSON.stringify(
  //     searchConstQueryObject
  //   )}`
  // );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "100px",
      }}
    >
      <h1>404 Not Found </h1>
      <h4>This Page Dont Exists .... Please Contact System Administrator</h4>
    </div>
  );
}

export default NotFound;
