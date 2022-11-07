import React, { Fragment, useState, useEffect } from 'react';
// import { FcSearch } from 'react-icons/fc';
// import { SearchOutlined } from '@ant-design/icons';
import './Collpasible.css';
import SourceSelect from './WelcomeSelect/SourceSelect';

function CollapsibleWelcome({
  lang,
  headerEng,
  headerKan,
  icon,
  children,
  customer,
}) {
  const [showContent, changeContent] = useState(false);

  const showContentToggle = () => {
    changeContent(!showContent);
  };

  useEffect(() => {
    // if (showContent) {
    //   let coll = document.getElementsByClassName('collapsibleWelcome');
    //   //   coll.classList.toggle('active');
    //   let content = coll[0].nextElementSibling;
    //   content.style.maxHeight = content.scrollHeight + 'px';
    // } else {
    //   let coll = document.getElementsByClassName('collapsibleWelcome');
    //   console.log(`The value of the class list is ${coll[0].classList}`);
    //   //   coll[0].classList.toggle('active');
    //   let content = coll[0].nextElementSibling;
    //   content.style.maxHeight = null;
    // }
  }, [showContent]);

  let customerButtonClasses =
    customer === 'KLA' ? 'collapsibleWelcome--KLA' : 'collapsibleWelcome--KLC';

  let activeCustomerClasses =
    customer === 'KLA' ? `active--KLA` : `active--KLC`;
  return (
    <div className="colapContainer">
      <button
        type="button"
        className={
          showContent
            ? `${customerButtonClasses} ${activeCustomerClasses}`
            : `${customerButtonClasses}`
        }
        onClick={showContentToggle}
      >
        <i className={`fa ${icon} `} style={{ marginRight: '1rem' }}></i>
        {lang === 'ENG' ? headerEng : headerKan}
      </button>
      <div className={showContent ? 'contentWelcomeOpen' : 'contentWelcome'}>
        {children}
      </div>
    </div>
  );
}

export default CollapsibleWelcome;
