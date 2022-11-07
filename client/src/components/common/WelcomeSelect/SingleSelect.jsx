import React, { useContext } from 'react';

// Importing Debate Context
// import DebateContext from '../../../context/Debates/debateContext';

import 'antd/dist/antd.css';
import { Select } from 'antd';
const { Option } = Select;

function SingleSelect({ data, lang }) {
  const { buckets } = data;

  const removeNABucket = buckets.filter((bukValue) => {
    return bukValue.key !== 'N/A';
  });

  function handleChange(value) {
    // e.preventDefault();
    console.info(`The value of select is ${value}`);
  }
  // console.log(`From the value of the Single Select ${JSON.stringify(buckets)}`);
  function debateTypeRenderOptions(renderData, lang) {
    // Function to render the Option String
    function renderDebateTypeString(optionKey, count, ln) {
      if (ln === 'ENG') {
        const returnOptionString =
          optionKey === 'part1'
            ? `Question & Answers( Part-1 ) (${count})`
            : `Other than Question & Answers( Part-2 ) (${count})`;
        return returnOptionString;
      } else {
        const returnOptionString =
          optionKey === 'part1'
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
          style={{ fontSize: '3rem' }}
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
        allowClear
      >
        {debateTypeRenderOptions(removeNABucket, lang)}
      </Select>
    </div>
  );
}

export default SingleSelect;
