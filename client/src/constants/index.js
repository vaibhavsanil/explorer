// import axios from 'axios';

// GLOBAL CONSTANTS
export const CUSTOMER = 'KLA';
// Dont add / at the end
export const FILESERVER_KLA = 'http://103.138.196.55:9200';
// export const FILESERVER_KLA = "http://localhost:9201";

export const FILESERVER_KLC = 'http://103.138.196.55:9101';

// variable to disable Book Id in Welcome Menu
export const disableBookId = false;

export const i18n = {
  customerName_KLA: {
    eng: 'Karnataka Legislative Assembly',
    kan: 'ಕರ್ನಾಟಕ ವಿಧಾನಸಭೆ',
  },

  customerName_KLC: {
    eng: 'Karnataka Legislative Council',
    kan: 'ಕರ್ನಾಟಕ ವಿಧಾನ ಪರಿಷತ್ತು',
  },

  speakerName_KLA: {
    eng: 'Shri Vishweshwar Hegde Kageri',
    kan: 'ಶ್ರೀ ವಿಶ್ವೇಶ್ವರ ಹೆಗಡೆ ಕಾಗೇರಿ',
    photo_location: '',
  },

  speaker_KLA: {
    eng: "Hon'ble Speaker",
    kan: 'ಗೌರವಾನ್ವಿತ ಸ್ಪೀಕರ್',
  },

  chairmanName_KLC: {
    eng: 'Shri Basavaraja Horatti',
    kan: 'ಶ್ರೀ ಬಸವರಾಜ ಶಿವಲಿಂಗಪ್ಪ ಹೊರಟ್ಟಿ',
    photo_location: '',
  },

  chairman_KLC: {
    eng: "Hon'ble Chairman",
    kan: 'ಗೌರವಾನ್ವಿತ ಸಭಾಪತಿ',
  },

  secretaryName_KLA: {
    eng: 'Smt M.K. VISHALAKSHI',
    kan: 'ಶ್ರೀಮತಿ ಎಂ.ಕೆ. ವಿಶಾಲಕ್ಷಿ',
    photo_location: '',
  },

  secretary_KLA: {
    eng: 'Secretary (I/C)',
    kan: 'ಕಾರ್ಯದರ್ಶಿ (ಕಾ /ಭಾ )',
  },

  secretaryName_KLC: {
    eng: 'Smt K R Mahalakshmi',
    kan: 'ಶ್ರೀಮತಿ ಕೆ ಆರ್ ಮಹಾಲಕ್ಷ್ಮಿ',
    photo_location: '',
  },

  secretary_KLC: {
    eng: 'Secretary',
    kan: 'ಕಾರ್ಯದರ್ಶಿ',
  },

  // Explorer Constants

  debateType: {
    eng: 'Debate Type',
    kan: 'ಚರ್ಚೆಯ ವಿಧಾ ',
  },
  year: {
    eng: 'Year',
    kan: 'ವರ್ಷ',
  },
  bookId: {
    eng: 'Book Id',
    kan: 'ಪುಸ್ತಕ ಸಂಖ್ಯೆ',
  },

  assemblyNumber: {
    eng: 'Assembly Number',
    kan: 'ವಿಧಾನ ಸಭೆಯ ಸಂಖ್ಯೆ',
  },

  sessionNumber: {
    eng: 'Session Number',
    kan: 'ಅಧಿವೇಶನ ಸಂಖ್ಯೆ',
  },

  debateTitle: {
    eng: 'Debate Title',
    kan: 'ಚರ್ಚೆಯ ಶೀರ್ಷಿಕೆ',
  },

  debateParticipants: {
    eng: 'Debate Participants',
    kan: 'ಚರ್ಚೆಯಲ್ಲಿ ಭಾಗವಹಿಸಿದ ಸದಸ್ಯರು/ಸಚಿವರು',
  },

  bookId: {
    eng: 'Book Id',
    kan: 'ನಡವಳಿ ಪುಸ್ತಕ ಸಂಖ್ಯೆ',
  },

  issues: {
    eng: 'Issues',
    kan: 'ಸಮಸ್ಯೆಗಳು',
  },

  annexure: {
    eng: 'Annexure',
    kan: 'ಅನುಬಂಧಗಳು',
  },

  searchPlaceHolder: {
    eng: 'Click to search in Debates',
    kan: 'ಚರ್ಚೆಗಳಲ್ಲಿ ಹುಡುಕಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
  },

  explorerHeaders: {
    debatesHeader: {
      eng: 'Debates',
      kan: 'ಚರ್ಚೆಗಳು',
    },
    newsHeader: {
      eng: 'News',
      kan: 'ಸುದ್ದಿ',
    },
    billHeader: {
      eng: 'Bills',
      kan: 'ವಿಧೇಯಕಗಳು',
    },
    reviewHeader: {
      eng: 'Review',
      kan: 'ಪುನರ್ ವಲೋಕನ',
    },
    budgetHeader: {
      eng: 'Budget',
      kan: 'ಆಯವ್ಯಯ ಪತ್ರ',
    },
    whoswhoHeader: {
      eng: "Who's Who",
      kan: 'ಸದ್ಯಸರ ಪರಿಚಯ',
    },
    vedioHeader: {
      eng: 'Videos',
      kan: 'ವೀಡಿಯೊಗಳು',
    },
    advancedSearch: {
      eng: 'Advanced Search',
      kan: 'ಸಾಧನಗಳು',
    },
  },
};
// Global Constants of the Request Headers
export const urlHeaders = {
  requestHeadersKLA: {
    searchQuery: 'http://localhost:9201/api/sd/sh',
    suggestQuery: 'http://localhost:9201/api/sd/0',
  },
  requestHeadersKLC: {
    searchQuery: 'http://localhost:9101/api/sd/sh',
    suggestQuery: 'http://localhost:9101/api/sd/0',
  },

  requestpublicDir: {
    requestURlLink: [
      'https://spin.atomicobject.com/2015/10/03/remote-pfs-node-js-express/',
      'https://gist.github.com/adamgibbons/af2de54c011e68a7b85a',
    ],
    serverPublicFilesKLA: '',
    serverPublicFilesKLC: '',
  },
};

// Search Request  Constants
export const searchQueryConst = {
  srt: '',
  qt: 'PRC',
  qp: '',
  dtf: '',
  anf: '',
  snf: '',
  dsubfEng: '',
  dsubfKan: '',
  dpfEng: '',
  dpfKan: '',
  dbf: '',
  ytf: '',
  sectionDateFrm: '',
  sectionDateTo: '',
  issfEng: '',
  issfKan: '',
  tagfKan: '',
  tagfEng: '',
};

// Function to convert array keys which has arrays  to string
export function arrayToString(obj) {
  let replicaObj = {
    ...obj,
  };
  for (const i in replicaObj) {
    if (replicaObj[i] instanceof Array) {
      replicaObj[i] = replicaObj[i].toString();
    }
  }

  return replicaObj;
}

// Search Request Constants Exmaple
export const searchObject = {
  ln: 'kn',
  srt: '',
  qt: 'PRC',
  qp: 'world bank',
  dtf: 'part1,part2',
  anf: '13[2005-2008]',
  snf: '13[2007]',
  dsubfEng: 'zero hour,rule 69',
  dsubfKan: '',
  dpfEng: '',
  dpfKan: '',
  dbf: '24',
  ytf: '2000,2001',
  sectionDateFrm: '2000-01-01',
  sectionDateTo: '1999-01-01',
  issfEng: 'cauvery,river',
  issfKan: '',
  tagfKan: 'krishna,water',
  tagfEng: '',
};

// Elasticsearch Contansts
export const elasticSearchConst = {
  userName: 'elastic',
  password: 'kab4XXLhezhvc5IDUXBAT4Nj',
  webAddr: 'my-deployment-5fea49.es.asia-south1.gcp.elastic-cloud.com:9243',
  local: '',
  collection_test_kla: 'klatest',
  collection_test_klc: 'klctest',
  collection_prod_kla: 'klaprod',
  collection_prod_klc: 'klcprod',
};

// Search Query Request Constants Exmaple
export const searchConstQueryObject = {
  ln: '',
  srt: '',
  qt: 'PRC',
  qp: '',
  dtf: [],
  anf: '',
  snf: '',
  dsubfEng: [],
  dsubfKan: [],
  dpfEng: [],
  dpfKan: [],
  dbf: '',
  ytf: [],
  sectionDateFrm: '',
  sectionDateTo: '',
  //bookId: [],
  issfEng: [],
  issfKan: [],
  tagfKan: [],
  tagfEng: [],
};

// Filter Mapping to Tag Name
export function filterMappingObject(lang, itemType) {
  const queryObj = {
    dtf: 'ENG' ? 'Debate Type' : 'ಚರ್ಚೆಯ ವಿಧಾ',
    anf: 'ENG' ? 'Assembly Number' : 'ವಿಧಾನ ಸಭೆಯ ಸಂಖ್ಯೆ',
    snf: 'ENG' ? 'Session Number' : 'ಅಧಿವೇಶನ ಸಂಖ್ಯೆ',
    dsubfEng: 'Debate Title',
    dsubfKan: 'ಚರ್ಚೆಯ ಶೀರ್ಷಿಕೆ',
    dpfEng: 'Debate Participants',
    dpfKan: 'ಚರ್ಚೆಯಲ್ಲಿ ಭಾಗವಹಿಸಿದ ಸದಸ್ಯರು/ಸಚಿವರು',
    dbf: lang === 'ENG' ? 'Book Id' : 'ಪುಸ್ತಕ ಸಂಖ್ಯೆ',
    ytf: lang === 'ENG' ? 'Year' : 'ವರ್ಷ',
    sectionDateFrm: 'ENG' ? 'Date' : 'ದಿನಾಂಕ ',
    sectionDateTo: 'ENG' ? 'Date' : 'ಪುಸ್ತಕ ಸಂಖ್ಯೆ',
    bookId: lang === 'ENG' ? 'Book Id' : 'ಪುಸ್ತಕ ಸಂಖ್ಯೆ',
    issfEng: 'Issues',
    issfKan: 'ಸಮಸ್ಯೆಗಳು',
    tagfKan: 'Tags',
    tagfEng: 'Tags',
  };
  return queryObj[itemType];
}

// Date Formats

export function dateFormat(dateString) {
  const dateSplit = dateString.split('-');
  // Changing the date to dd/MM/yyyy
  const newDate = `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`;
  return newDate;
}

// Filter Mapping to Tag Name
export function filterMappingObjectForKey(lang, itemValue) {
  const queryObj = {
    dtf: 'ENG' ? 'Debate Type' : 'ಚರ್ಚೆಯ ವಿಧಾ',
    anf: 'ENG' ? 'Assembly Number' : 'ವಿಧಾನ ಸಭೆಯ ಸಂಖ್ಯೆ',
    snf: 'ENG' ? 'Session Number' : 'ಅಧಿವೇಶನ ಸಂಖ್ಯೆ',
    dsubfEng: 'Debate Title',
    dsubfKan: 'ಚರ್ಚೆಯ ಶೀರ್ಷಿಕೆ',
    dpfEng: 'Debate Participants',
    dpfKan: 'ಚರ್ಚೆಯಲ್ಲಿ ಭಾಗವಹಿಸಿದ ಸದಸ್ಯರು/ಸಚಿವರು',
    dbf: lang === 'ENG' ? 'Book Id' : 'ಪುಸ್ತಕ ಸಂಖ್ಯೆ',
    ytf: lang === 'ENG' ? 'Year' : 'ವರ್ಷ',
    sectionDateFrm: 'Date-From',
    sectionDateTo: 'Date-To',
    bookId: lang === 'ENG' ? 'Book Id' : 'ಪುಸ್ತಕ ಸಂಖ್ಯೆ',
    issfEng: 'Issues',
    issfKan: 'ಸಮಸ್ಯೆಗಳು',
    tagfKan: 'Tags',
    tagfEng: 'Tags',
  };

  for (let key in queryObj) {
    if (queryObj[key] === itemValue) {
      return key;
    }
  }
}

// Helper Functions
export function renderCustomerName(customer, lang, varObject) {
  // This function will conditional render the Logo Name based on customer
  if (customer === 'KLA') {
    const logoName =
      lang === 'ENG'
        ? varObject.customerName_KLA.eng
        : varObject.customerName_KLA.kan;

    return logoName;
  } else {
    const logoName =
      lang === 'ENG'
        ? varObject.customerName_KLC.eng
        : varObject.customerName_KLC.kan;

    return logoName;
  }
}

export function returnQueryVariableFilter(debatetype) {
  const mappingField = {
    debateType: ['dtf', 'array'],
    assemblyNumber: ['anf', 'string'],
    sessionNumber: ['snf', 'string'],
    debateTitle: ['dsubfEng', 'array', 'dsubfKan'],
    debatePart: ['dpfEng', 'array', 'dpfKan'],
    year: ['ytf', 'array'],
    dateFrom: ['sectionDateFrm', 'string'],
    dateTo: ['sectionDateTo', 'string'],
    bookId: ['dbf', 'string'],
    issue: ['issfEng', 'array', 'issfKan'],
  };
  return mappingField[debatetype];
}

// Generate File Path to the server

export function generateFSPath(
  knwType,
  types,
  customer,
  bookid,
  frompageNumber = 0,
  topageNumber = 0
) {
  if (knwType === 'debates') {
    if (types === 'section') {
      return `/api/fs/${types}/${knwType}/${customer}/${bookid}/${frompageNumber}/${topageNumber}`;
    }

    if (types === 'fullPDF') {
      return `/api/fs/full/${knwType}/${customer}/${bookid}`;
    }

    if (types === 'annex') {
      return `/api/fs/annex/${knwType}/${customer}/${bookid}/${frompageNumber}/${topageNumber}`;
    }
  }
}

// Export return the query object after manipulating it

export function returnObjQuery(eventObj, lang, arrayObject, queryObject) {
  let queryParameter = queryObject;

  var parameterVariable;

  if (arrayObject.length === 2) {
    parameterVariable = [arrayObject[0]];
  } else {
    parameterVariable = lang === 'ENG' ? arrayObject[0] : arrayObject[2];
  }

  // let queryObject = {...queryParameter,parameterVariable:eventObj.target.value}
  // console.info(
  //   `[DEBUG] The value of the paramerter variable is ${parameterVariable}`
  // );
  if (arrayObject[1] === 'string') {
    // Checking if the string value is checked or not
    if (eventObj.target.checked) {
      queryObject[parameterVariable] = eventObj.target.value;
      return queryObject;
    } else {
      queryObject[parameterVariable] = '';
      return queryObject;
    }
  } else {
    // Checking if the array value is checked or not
    if (eventObj.target.checked) {
      queryObject[parameterVariable] = [
        ...queryObject[parameterVariable],
        eventObj.target.value,
      ];
      return queryObject;
    } else {
      let arrayVar = queryObject[parameterVariable];
      arrayVar = arrayVar.filter(function (item) {
        return item !== eventObj.target.value;
      });

      // let queryObject = {
      //   ...queryParameter,
      //   parameterVariable: arrayVar,
      // };
      queryObject[parameterVariable] = arrayVar;
      return queryObject;
    }
  }
}
// return Date Query Obj
export function returnDateObjQuery(arrayName, queryObject, startdate, enddate) {
  let queryParameter = queryObject;

  queryParameter[arrayName[0]] = startdate;
  queryParameter[arrayName[1]] = enddate;

  return queryParameter;
}

export function returnObjRemoveQuery(eventKey, queryObject, value) {
  // This function is to remove the Query Key if its array or string

  let query = queryObject;

  if (query[eventKey] instanceof Array) {
    let filteredAry = query[eventKey].filter(function (item) {
      return item !== value;
    });
    query[eventKey] = filteredAry;
    return query;
  } else {
    query[eventKey] = '';
    return query;
  }
}

// Add the Highlight To Tab
export function addHiglightToTab(tabType) {
  function nodeType(type) {
    if (type === 'debate') {
      return 'debatesTab';
    } else if (type === 'news') {
      return 'newsTab';
    } else if (type === 'review') {
      return 'reviewTab';
    } else if (type === 'budget') {
      return 'budgetTab';
    } else if ('vedio') {
      return 'vedioTab';
    } else if (type === 'whoswho') {
      return 'whowhotab';
    }
  }
  const node = document.getElementById(nodeType(tabType));
  if (node === null) {
    return;
  }

  node.classList.toggle(
    CUSTOMER === 'KLA' ? 'active_tab--kla' : 'active_tab--klc'
  );
}

// Filter Keys in Object

export function filterRemoveKeysObject(queryObj, filterArray) {
  // This function filters the keys names present in the keys array

  const filteredObj = Object.keys(queryObj)
    .filter((key) => !filterArray.includes(key))
    .reduce((obj, key) => {
      obj[key] = queryObj[key];
      return obj;
    }, {});

  return filteredObj;
}

// Cancel Token

// export function cancelToken() {
//   useEffect(() => {
//     let cancel;

//     axios({
//       method: "GET",
//       url: "http://openlibrary.org/search.json",
//       params: { q: query, page: pageNumber },
//       cancelToken: new axios.CancelToken((c) => (cancel = c)),
//     })
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((e) => {
//         if (axios.isCancel(e)) return;
//       });

//     return () => {
//       cancel();
//     };
//   }, [input]);

//   return null;
// }
