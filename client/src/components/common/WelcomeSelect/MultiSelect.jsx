import React from 'react';
import 'antd/dist/antd.css';
import { Select } from 'antd';
const { Option } = Select;

function MultiSelect({ holderName, data }) {
  const { buckets } = data;

  const handleChange = () => {};

  // console.info(`The Data from the Assembly Number ${JSON.stringify(data)}`);
  const removeNABucket = buckets.filter((bukValue) => {
    return bukValue.key !== 'N/A';
  });

  function renderMultiSelectOptions(bucket) {
    return bucket.map((dta) => {
      const { key, doc_count } = dta;
      return (
        <Option
          style={{ fontSize: '3rem' }}
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
      style={{ width: '100%' }}
      placeholder={holderName}
      onChange={handleChange}
    >
      {renderMultiSelectOptions(removeNABucket)}
    </Select>
  );
}

export default MultiSelect;
