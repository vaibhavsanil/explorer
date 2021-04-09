import axios from "axios";

// GLOBAL CONSTANTS
export const CUSTOMER = "KLA";

export const i18n = {
  customerName_KLA: {
    eng: "Karnataka Legislative Assembly",
    kan: "ಕರ್ನಾಟಕ ವಿಧಾನಸಭೆ",
  },

  customerName_KLC: {
    eng: "Karnataka Legislative Council",
    kan: "ಕರ್ನಾಟಕ ವಿಧಾನ ಪರಿಷತ್ತು",
  },

  speakerName_KLA: {
    eng: "Shri Vishweshwar Hegde Kageri",
    kan: "ಶ್ರೀ ವಿಶ್ವೇಶ್ವರ ಹೆಗಡೆ ಕಾಗೇರಿ",
    photo_location: "",
  },

  speaker_KLA: {
    eng: "Hon'ble Speaker",
    kan: "ಗೌರವಾನ್ವಿತ ಸ್ಪೀಕರ್",
  },

  chairmanName_KLC: {
    eng: "Shri Basavaraja Horatti",
    kan: "ಶ್ರೀ ಬಸವರಾಜ ಶಿವಲಿಂಗಪ್ಪ ಹೊರಟ್ಟಿ",
    photo_location: "",
  },

  chairman_KLC: {
    eng: "Hon'ble Chairman",
    kan: "ಗೌರವಾನ್ವಿತ ಸಭಾಪತಿ",
  },

  secretaryName_KLA: {
    eng: "Smt M.K. VISHALAKSHI",
    kan: "ಶ್ರೀಮತಿ ಎಂ.ಕೆ. ವಿಶಾಲಕ್ಷಿ",
    photo_location: "",
  },

  secretary_KLA: {
    eng: "Secretary (I/C)",
    kan: "ಕಾರ್ಯದರ್ಶಿ (ಕಾ /ಭಾ )",
  },

  secretaryName_KLC: {
    eng: "Smt K R Mahalakshmi",
    kan: "ಶ್ರೀಮತಿ ಕೆ ಆರ್ ಮಹಾಲಕ್ಷ್ಮಿ",
    photo_location: "",
  },

  secretary_KLC: {
    eng: "Secretary",
    kan: "ಕಾರ್ಯದರ್ಶಿ",
  },

  // Explorer Constants

  debateType: {
    eng: "Debate Type",
    kan: "ಚರ್ಚೆಯ ವಿಧಾ ",
  },

  assemblyNumber: {
    eng: "Assembly Number",
    kan: "ವಿಧಾನ ಸಭೆಯ ಸಂಖ್ಯೆ",
  },

  sessionNumber: {
    eng: "Session Number",
    kan: "ಅಧಿವೇಶನ ಸಂಖ್ಯೆ",
  },

  debateTitle: {
    eng: "Debate Title",
    kan: "ಚರ್ಚೆಯ ಶೀರ್ಷಿಕೆ",
  },

  debateParticipants: {
    eng: "Debate Participants",
    kan: "ಚರ್ಚೆಯಲ್ಲಿ ಭಾಗವಹಿಸಿದ ಸದಸ್ಯರು/ಸಚಿವರು",
  },

  bookId: {
    eng: "Book Id",
    kan: "ನಡವಳಿ ಪುಸ್ತಕ ಸಂಖ್ಯೆ",
  },

  annexure: {
    eng: "Annexure",
    kan: "ಅನುಬಂಧಗಳು",
  },

  searchPlaceHolder: {
    eng: "Click to search in Debates",
    kan: "ಚರ್ಚೆಗಳಲ್ಲಿ ಹುಡುಕಲು ಕ್ಲಿಕ್ ಮಾಡಿ",
  },

  explorerHeaders: {
    debatesHeader: {
      eng: "Debates",
      kan: "ಚರ್ಚೆಗಳು",
    },
    newsHeader: {
      eng: "News",
      kan: "ಸುದ್ದಿ",
    },
    reviewHeader: {
      eng: "Review",
      kan: "ಪುನರ್ ವಲೋಕನ",
    },
    budgetHeader: {
      eng: "Budget",
      kan: "ಆಯವ್ಯಯ ಪತ್ರ",
    },
    whoswhoHeader: {
      eng: "Who's Who",
      kan: "ಸದ್ಯಸರ ಪರಿಚಯ",
    },
    vedioHeader: {
      eng: "Vedios",
      kan: "ವೀಡಿಯೊಗಳು",
    },
    advancedSearch: {
      eng: "Advanced Search",
      kan: "ಸಾಧನಗಳು",
    },
  },
};
// Global Constants of the Request Headers
export const urlHeaders = {
  requestHeadersKLA: {
    searchQuery: "http://localhost:9201/api/sd/sh",
    suggestQuery: "http://localhost:9201/api/sd/0",
  },
  requestHeadersKLC: {
    searchQuery: "http://localhost:9101/api/sd/sh",
    suggestQuery: "http://localhost:9101/api/sd/0",
  },

  requestpublicDir: {
    requestURlLink: [
      "https://spin.atomicobject.com/2015/10/03/remote-pfs-node-js-express/",
      "https://gist.github.com/adamgibbons/af2de54c011e68a7b85a",
    ],
    serverPublicFilesKLA: "",
    serverPublicFilesKLC: "",
  },
};

// Search Request  Constants
export const searchQueryConst = {
  srt: "",
  qt: "PRC",
  qp: "",
  dtf: "",
  anf: "",
  snf: "",
  dsubfEng: "",
  dsubfKan: "",
  dpfEng: "",
  dpfKan: "",
  dbf: "",
  ytf: "",
  sectionDateFrm: "",
  sectionDateTo: "",
  issfEng: "",
  issfKan: "",
  tagfKan: "",
  tagfEng: "",
};

// Search Request Constants Exmaple
export const searchObject = {
  ln: "kn",
  srt: "",
  qt: "PRC",
  qp: "world bank",
  dtf: "part1,part2",
  anf: "13[2005-2008]",
  snf: "13[2007]",
  dsubfEng: "zero hour,rule 69",
  dsubfKan: "",
  dpfEng: "",
  dpfKan: "",
  dbf: "24",
  ytf: "2000,2001",
  sectionDateFrm: "2000-01-01",
  sectionDateTo: "1999-01-01",
  issfEng: "cauvery,river",
  issfKan: "",
  tagfKan: "krishna,water",
  tagfEng: "",
};

// Helper Functions
export function renderCustomerName(customer, lang, varObject) {
  // This function will conditional render the Logo Name based on customer
  if (customer === "KLA") {
    const logoName =
      lang === "ENG"
        ? varObject.customerName_KLA.eng
        : varObject.customerName_KLA.kan;

    return logoName;
  } else {
    const logoName =
      lang === "ENG"
        ? varObject.customerName_KLC.eng
        : varObject.customerName_KLC.kan;

    return logoName;
  }
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
