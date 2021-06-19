// Import the query json File

const queryES = require("./query.json");
const suggestES = require("./suggest.json");

const sourceFields = [
  "assemblyNumber",
  "sessionNumber",
  "placeSession",
  "datesSessions",
  "sectionType",
  "startPage",
  "endPage",
  "debate_title_subject_eng",
  "debate_title_subject_kan",
  "debate_subject_kan",
  "issues_section_eng",
  "issues_section_kan",
  "tags_array_eng",
  "tags_array_kan",
  "questioner_name_eng",
  "questioner_name_kan",
  "minister_name_eng",
  "minister_name_kan",
  "minister_portfolio_eng",
  "minister_portfolio_kan",
  "annexure_title",
  "annexure_start_page",
  "annexure_end_page",
  "debate_participants_eng",
  "debate_participants_kan",
  "ocr_schema_section",
  "debate_section_date",
];

function getShouldQueryParams(queryType, queryString) {
  //  This function returns the should query parameters  for the given query
  let returnShouldArray = [];
  //   The below if statement evaluates the query for Precision & recall
  //   QueryType should be queryType = "PRC" || "REC"
  let queryOperands = queryType === "PRC" ? "and" : "or";
  // let matchQuery = {
  //   match: {
  //     debate_subject_kan: {
  //       query: queryString,
  //       operator: queryOperands,
  //       fuzziness: "AUTO",
  //     },
  //   },
  // };

  let multiMatch_debateSubject_annexure = {
    multi_match: {
      query: queryString,
      operator: queryOperands,
      fields: ["debate_subject_kan.suggestion^2", "annexure_title.suggestion"],
      fuzziness: 1,
      boost: 6,
    },
  };

  let nested_ocr_section_query = {
    nested: {
      path: "ocr_schema_section",
      query: {
        multi_match: {
          query: queryString,
          type: "best_fields",
          fields: ["ocr_schema_section.ocr_text.suggestion"],
          operator: "and",
          fuzziness: 1,
          boost: 5,
        },
      },
    },
  };
  // OCR Match Phrase suggestion
  let nested_ocr_phrase_section_query = {
    nested: {
      path: "ocr_schema_section",
      query: {
        multi_match: {
          query: queryString,
          type: "phrase",
          fields: ["ocr_schema_section.ocr_text"],
          operator: "and",
          slop: 2,
          boost: 10,
        },
      },
    },
  };

  // Multi match of Debate Particiapants
  let multi_match_debate_participants = {
    multi_match: {
      query: queryString,
      type: "best_fields",
      fields: [
        "debate_participants_eng.suggestion",
        "debate_participants_kan.suggestion",
      ],
      boost: 1,
      operator: "and",
    },
  };

  // returnShouldArray.push(matchQuery);
  // returnShouldArray.push(nestedQuery);
  returnShouldArray.push(multiMatch_debateSubject_annexure);
  returnShouldArray.push(nested_ocr_section_query);
  returnShouldArray.push(nested_ocr_phrase_section_query);
  returnShouldArray.push(multi_match_debate_participants);

  return returnShouldArray;
}

function getRangeDateQuery(fromDate, toDate, variablename) {
  return {
    range: {
      [variablename]: {
        gte: fromDate,
        lte: toDate,
      },
    },
  };
}

function getTermQuery(termsString, varName) {
  // This function is used to get the terms query
  // console.log(
  //   `[DEBUG] the value of termsString ${termsString} & varName ${varName}  `
  // );

  if (termsString !== "") {
    let termVarsName = termsString.split(",");

    // terms: {
    //   [varName]: {
    //     value: termVarsName,
    //   },
    // },

    if (termVarsName.length > 1) {
      return {
        terms: {
          [varName]: termVarsName,
        },
      };
    } else {
      return {
        term: {
          [varName]: {
            value: termVarsName[0],
          },
        },
      };
    }
  }
}

function getFilterQueryParams(queryObject) {
  const { sectionDateFrm, sectionDateTo } = queryObject;

  const dictVariableName = {
    dtf: "sectionType",
    anf: "assemblyNumber",
    snf: "sessionNumber",
    dsubfEng: "debate_title_subject_eng",
    dsubfKan: "debate_title_subject_kan",
    dpfEng: "debate_participants_eng.keyword",
    dpfKan: "debate_participants_kan.keyword",
    dbf: "bookId",
    ytf: "yearBook",
    sectionDateFrm: "debate_section_date",
    sectionDateTo: "debate_section_date",
    issfEng: "issues_section_eng.keyword",
    issfKan: "issues_section_kan.keyword",
    tagfKan: "tags_array_kan",
    tagfEng: "tags_array_eng",
  };

  const filterQueryParams = {
    bool: {
      must: [],
    },
  };

  // Get range query for date
  if (sectionDateFrm !== "" && sectionDateTo !== "") {
    var rangeDate = getRangeDateQuery(
      sectionDateFrm,
      sectionDateTo,
      "debate_section_date"
    );

    filterQueryParams.bool.must.push(rangeDate);
  }

  let objectKey = [
    "dtf",
    "anf",
    "snf",
    "dsubfEng",
    "dsubfKan",
    "dpfEng",
    "dpfKan",
    "dbf",
    "ytf",
    "sectionDateFrm",
    "sectionDateTo",
    "issfEng",
    "issfKan",
    "tagfEng",
    "tagfKan",
  ];
  let rangeQueryVariables = ["sectionDateFrm", "sectionDateTo", "qt", "qp"];
  for (key in queryObject) {
    var varHeader = queryObject[key];
    if (!rangeQueryVariables.includes(key)) {
      if (queryObject[key] !== "") {
        // console.log(
        //   `[DEBUG] get Filter Function  ${varHeader} queryObject ${queryObject[varHeader]}  variable name   ${dictVariableName[varHeader]} `
        // );
        let termQuery = getTermQuery(
          // queryObject[varHeader],
          varHeader,
          dictVariableName[key]
        );
        // Filter the null

        filterQueryParams.bool.must.push(termQuery);
      }
    }
  }

  return filterQueryParams;
}

// Get sort filter
function getSortFilter(srtString, variableName, direction) {
  let sortArray = [];

  let sortObject = {
    [variableName]: {
      order: direction,
    },
  };

  sortArray.push({
    _score: {
      order: "desc",
    },
  });
  sortArray.push(sortObject);

  return sortArray;
}

function esQueryBuilder(queryObject) {
  //   1 Read the query parameter

  const { qt, qp, srt } = queryObject;

  // Design a function to return the query

  const shouldQueryParams = getShouldQueryParams(qt, qp);

  // Write the query
  queryES.query.bool.should = shouldQueryParams;

  //   2 Read the filter & put it in appropriate buckets
  const filterQueryParams = getFilterQueryParams(queryObject);
  queryES.query.bool.filter = filterQueryParams;
  //   3 Put the Sort filter

  if (srt !== "") {
    let sortFilter = getSortFilter(srt, "debate_section_date");
    queryES.sort = sortFilter;
  } else {
    let sortFilter = [
      {
        _score: {
          order: "desc",
        },
      },
    ];
    queryES.sort = sortFilter;
  }

  //   console.log(JSON.stringify(shouldQueryParams));

  return queryES;
}

function suggestorTermES(query) {
  // Build query fr suggestor
  suggestES.suggest.text = query;

  return suggestES;
  // console.log(suggestES);
}

// console.log(JSON.stringify(suggestorTermES("bang"), null, 2));

//

module.exports = {
  suggestorTermES,
  esQueryBuilder,
};

// console.log(
//   `Suggestor Terms ES \n ${JSON.stringify(suggestorTermES("water"), null, 2)}`
// );
// console.log(JSON.stringify(queryESSchema, null, 2));
