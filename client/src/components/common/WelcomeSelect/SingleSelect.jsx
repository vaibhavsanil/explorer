import React, { useContext, useState, useEffect } from "react";
import DebateContext from "../../../context/Debates/debateContext";
import {
  returnQueryVariableFilter,
  getListeningSelectVarArray,
} from "../../../constants/index";
// Importing Debate Context
// import DebateContext from '../../../context/Debates/debateContext';

import "antd/dist/antd.css";
import { Select } from "antd";
const { Option } = Select;

function SingleSelect({ data, lang, name }) {
  const { buckets } = data;
  const { debateQueryObj, manipulateQueryWelcome } = useContext(DebateContext);
  const [defaultSelect, SetDefault] = useState("");

  let useEffectVar = getListeningSelectVarArray(debateQueryObj, name, lang);

  useEffect(() => {
    SetDefault(useEffectVar);
  }, [useEffectVar]);

  const removeNABucket = buckets.filter((bukValue) => {
    return bukValue.key !== "N/A";
  });

  async function handleChange(value) {
    // e.preventDefault();
    // console.info(`The value of select is ${typeof value}`);
    SetDefault(value);

    const itemCheckArray = await returnQueryVariableFilter(name);

    const querySideBar = manipulateQueryWelcome(
      value,
      lang,
      itemCheckArray,
      debateQueryObj
    );
    SetDefault(value);
    console.info(
      `[DEBUG] from Welcome Screen Multi Select ${JSON.stringify(querySideBar)}`
    );
  }
  // console.log(`From the value of the Single Select ${JSON.stringify(buckets)}`);
  function debateTypeRenderOptions(renderData, lang) {
    // Function to render the Option String
    function renderDebateTypeString(optionKey, count, ln) {
      if (ln === "ENG") {
        const returnOptionString =
          optionKey === "part1"
            ? `Question & Answers( Part-1 ) (${count})`
            : `Other than Question & Answers( Part-2 ) (${count})`;
        return returnOptionString;
      } else {
        const returnOptionString =
          optionKey === "part1"
            ? `ಭಾಗ-1: ಪ್ರಶ್ನೋತ್ತರ(${count})`
            : `ಭಾಗ-2: ಪ್ರಶ್ನೋತ್ತರವನ್ನು ಹೊರತುಪಡಿಸಿ ಇತರೆ ವಿಷಯಗಳ ಮೇಲೆ ಚರ್ಚೆ(${count})`;
        return returnOptionString;
      }
    }

    return renderData.map((dta) => {
      // console.info(`The value of the data is ${JSON.stringify(dta)}`);
      const { key, doc_count } = dta;
      let returnOptionValue = renderDebateTypeString(key, doc_count, lang);

      // if key is part1 || part 2 render Debate Type

      // else render other Keys

      return (
        <Option
          style={{ fontSize: "3rem" }}
          className="optionSourceWelcome"
          key={key}
        >
          {returnOptionValue}
        </Option>
      );
    });
  }

  return (
    <div>
      <Select
        size="large"
        onChange={handleChange}
        style={{ width: 300 }}
        placeholder="Please Select Debate Type"
        value={defaultSelect}
        allowClear
      >
        {debateTypeRenderOptions(removeNABucket, lang)}
      </Select>
    </div>
  );
}

export default SingleSelect;
