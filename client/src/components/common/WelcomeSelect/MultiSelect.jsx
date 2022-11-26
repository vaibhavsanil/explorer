import React, { useContext, useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Select } from "antd";
import DebateContext from "../../../context/Debates/debateContext";
import {
  returnQueryVariableFilter,
  getListeningSelectVarArray,
} from "../../../constants/index";

const { Option } = Select;

function MultiSelect({ holderName, data, name, lang }) {
  // https://github.com/ant-design/ant-design/issues/4347
  const { buckets } = data;
  const { debateQueryObj, manipulateQueryWelcome } = useContext(DebateContext);
  const [defaultVar, SetDefault] = useState([]);

  let useEffectVar = getListeningSelectVarArray(debateQueryObj, name, lang);
  // SetDefault(useEffectVar);
  // console.log(`The default values from DEBUG MULTISELECT is ${useEffectVar} `);
  useEffect(() => {
    if (useEffectVar === "") {
      SetDefault([]);
    } else {
      SetDefault(useEffectVar);
    }
  }, [useEffectVar]);

  // useEffect(() => {
  //   // https://stackoverflow.com/questions/59477296/default-value-for-multiple-select-in-form-antd-4
  //   let useEffectVar = getListeningSelectVarArray(debateQueryObj, name, lang);
  //   console.log(
  //     `The default values from DEBUG MULTISELECT is ${useEffectVar} `
  //   );
  //   SetDefault(defaultVar);
  // }, [debateQueryObj]);

  const handleChange = async (value) => {
    // e.preventDefault();
    // console.info(`The value called is ${value}`);
    const itemCheckArray = await returnQueryVariableFilter(name);

    const querySideBar = manipulateQueryWelcome(
      value,
      lang,
      itemCheckArray,
      debateQueryObj
    );
    SetDefault(value);
    // // console.info(
    // //   `[DEBUG] from Welcome Screen Multi Select ${JSON.stringify({
    // //     [name]: value,
    // //   })}`
    // // );
    // console.info(
    //   `[DEBUG] from Welcome Screen Multi Select ${JSON.stringify(querySideBar)}`
    // );
    // console.info(
    //   `[DEBUG] from Welcome Screen Multi Select ${JSON.stringify(value)}`
    // );
  };

  // console.info(`The Data from the Assembly Number ${JSON.stringify(data)}`);
  const removeNABucket = buckets.filter((bukValue) => {
    return bukValue.key !== "N/A";
  });

  function renderMultiSelectOptions(bucket) {
    return bucket.map((dta) => {
      const { key, doc_count } = dta;
      return (
        <Option
          style={{ fontSize: "3rem" }}
          className="optionSourceWelcome"
          key={key}
        >
          {`${key} (${doc_count})`}
        </Option>
      );
    });
  }

  return (
    <Select
      mode="multiple"
      allowClear
      style={{ width: "100%" }}
      placeholder={holderName}
      onChange={handleChange}
      // defaultValue={defaultVar}
      value={defaultVar}
    >
      {renderMultiSelectOptions(removeNABucket)}
    </Select>
  );
}

export default MultiSelect;
