import React, { useContext } from "react";
import "antd/dist/antd.css";
import { Select } from "antd";
import DebateContext from "../../../context/Debates/debateContext";
import { returnQueryVariableFilter } from "../../../constants/index";

const { Option } = Select;

function MultiSelect({ holderName, data, name, lang }) {
  const { buckets } = data;
  const { debateQueryObj, manipulateQueryWelcome } = useContext(DebateContext);

  const handleChange = async (value) => {
    // e.preventDefault();
    console.info(`The value called is ${value}`);
    const itemCheckArray = await returnQueryVariableFilter(name);

    const querySideBar = manipulateQueryWelcome(
      value,
      lang,
      itemCheckArray,
      debateQueryObj
    );
    // // console.info(
    // //   `[DEBUG] from Welcome Screen Multi Select ${JSON.stringify({
    // //     [name]: value,
    // //   })}`
    // // );
    console.info(
      `[DEBUG] from Welcome Screen Multi Select ${JSON.stringify(querySideBar)}`
    );
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
    >
      {renderMultiSelectOptions(removeNABucket)}
    </Select>
  );
}

export default MultiSelect;
