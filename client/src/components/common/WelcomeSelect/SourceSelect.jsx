import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Select } from 'antd';
const { Option } = Select;

function SourceSelect({ lang }) {
  useEffect(() => {}, [lang]);

  const knowledgeSources = [
    'Debates',
    'News',
    'Bills',
    'Review',
    'Budget',
    "Who's Who",
    'Videos',
  ];
  const knowledgeSourcesKan = [
    'ಚರ್ಚೆಗಳು',
    'ಸುದ್ದಿ',
    'ವಿಧೇಯಕಗಳು',
    'ಪುನರ್ ವಲೋಕನ',
    'ಆಯವ್ಯಯ ಪತ್ರ',
    'ಸದ್ಯಸರ ಪರಿಚಯ',
    'ವೀಡಿಯೊಗಳು',
  ];

  const knwSource = lang === 'ENG' ? knowledgeSources : knowledgeSourcesKan;

  const handleChange = () => {};

  function returnOptions(knw) {
    return knw.map((value) => (
      <Option
        style={{ fontSize: '3rem' }}
        className="optionSourceWelcome"
        key={value.toLowerCase()}
      >
        {value}
      </Option>
    ));
  }

  return (
    <Select
      size="large"
      defaultValue="debates"
      onChange={handleChange}
      style={{ width: 300 }}
    >
      {returnOptions(knwSource)}
    </Select>
  );
}

export default SourceSelect;
