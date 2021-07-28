import React, { useReducer } from "react";

import axios from "axios";
import DebateContext from "./debateContext";
import debateReducer from "./debateReducer";

import {
  ADD_SEARCH_LOCAL_STATE,
  REMOVE_SEARCH_LOCAL_STATE,
  ADD_LOADING_LOCAL_STATE,
  REMOVE_LOADING_LOCAL_STATE,
  SEARCH_REQUEST_SUCCESS,
  SEARCH_REQUEST_ERROR,
  REMOVE_SEARCH_REQUEST,
  ADD_SEARCH_QUERY_LOCAL_STATE,
  REMOVE_SEARCH_QUERY_LOCAL_STATE,
  ERROR_REMOVE_SEARCH_QUERY_LOCAL_STATE,
  REMOVE_SEARCH_REQUEST_ERROR,
} from "../types";

// Import the constants
import {
  searchQueryConst,
  urlHeaders,
  CUSTOMER,
  searchConstQueryObject,
  returnObjQuery,
  arrayToString,
} from "../../constants/index";

const DebateState = (props) => {
  const initialState = {
    searchquery: "",
    loading: false,
    debatesearchResult: {},
    currentDebateSection: {},
    debateQueryObj: searchConstQueryObject,

    errors: {},
  };

  const [state, dispatch] = useReducer(debateReducer, initialState);

  // Set Global Constants
  let requestHeaders =
    CUSTOMER === "KLA"
      ? urlHeaders.requestHeadersKLA
      : urlHeaders.requestHeadersKLC;

  //   All Your Actions will go down

  // Add Loading to Global State
  const addLoading = () => {
    dispatch({
      type: ADD_LOADING_LOCAL_STATE,
    });
  };

  // Add Loading to Global State
  const removeLoading = () => {
    dispatch({
      type: REMOVE_LOADING_LOCAL_STATE,
    });
  };

  // Add Error
  const addError = (errObject) => {
    dispatch({
      type: SEARCH_REQUEST_ERROR,
      payload: errObject,
    });
  };

  // Remove Error
  const removeError = () => {
    dispatch({
      type: REMOVE_SEARCH_REQUEST_ERROR,
    });
  };

  // Add Search Query to Local State
  const addSearchQuery = (searchTerm, queryObj) => {
    queryObj["qp"] = searchTerm;
    dispatch({
      type: ADD_SEARCH_LOCAL_STATE,
      payload: searchTerm,
    });

    dispatch({
      type: ADD_SEARCH_QUERY_LOCAL_STATE,
      payload: queryObj,
    });

    // addLoading();
    return queryObj;
  };

  // Add Search Query to Local State
  const removeSearchQuery = () => {
    dispatch({
      type: REMOVE_SEARCH_LOCAL_STATE,
      payload: "",
    });
  };

  // Remove Search Results from the local state

  const removeSearchQueryResults = () => {
    dispatch({
      type: REMOVE_SEARCH_REQUEST,
    });
  };

  // Request the server for Search Results
  const searchRequestBackendProm = (reqObj) => {
    return new Promise(async function (resolve, reject) {
      // https://stackoverflow.com/questions/49944387/how-to-correctly-use-axios-params-with-arrays

      console.info(
        `[DEBUG] from promise function The value of search Template ${JSON.stringify(
          reqObj,
          null,
          2
        )}`
      );

      try {
        const response = await axios.get(
          "/api/sd/sh",

          {
            params: reqObj,
          }
        );

        dispatch({ type: SEARCH_REQUEST_SUCCESS, payload: response.data });
        resolve(response.data);
      } catch (error) {
        dispatch({
          type: SEARCH_REQUEST_ERROR,
          payload: error.response.data,
        });
        console.info(
          `[DEBUG] ERROR The Search Request Header is \n ${JSON.stringify(
            error.response.data
          )}`
        );
        reject(error.response.data);
      }
    });
  };
  // Request the server for Search Results
  const searchRequestExplorerProm = (reqObj) => {
    return new Promise(async function (resolve, reject) {
      let urlObj = arrayToString(reqObj);
      // console.info(
      //   `[DEBUG][DEBATE-STATE] from promise function Explorer Search The value of search Template ${JSON.stringify(
      //     urlObj,
      //     null,
      //     2
      //   )}`
      // );

      try {
        const response = await axios.get(
          "/api/sd/sh",

          {
            params: urlObj,
          }
        );
        // console.info(
        //   `[DEBUG] The Search Request Header is \n ${JSON.stringify(
        //     response.data,
        //     null,
        //     2
        //   )}`
        // );
        dispatch({ type: SEARCH_REQUEST_SUCCESS, payload: response.data });
        resolve(response.data);
      } catch (error) {
        console.info(
          `[DEBUG] ERROR The Search Request Header is \n ${JSON.stringify(
            error.response
          )}`
        );
        dispatch({
          type: SEARCH_REQUEST_ERROR,
          payload: error.response.data,
        });

        reject(error.response.data);
      }
    });
  };

  // Manipulate the query state

  const manipulateQuery = (event, lang, arrayObject, queryObj) => {
    let queryToDispatch = returnObjQuery(event, lang, arrayObject, queryObj);
    // console.info(
    //   `[DEBUG] from Debate State Manipulate Query the query is \n ${JSON.stringify(
    //     queryToDispatch
    //   )}`
    // );
    // Adding query to the local state
    addSearchQueryFormat(queryToDispatch);
    // [TODO] Whether to keep the request in state or client
    // searchRequestExplorerProm(state.debateQueryObj).then().catch();
    // console.info(
    //   `[DEBUG] The manipulateQuery is called from \n ${JSON.stringify(
    //     state.debateQueryObj
    //   )} `
    // );

    return queryToDispatch;
  };

  // Request The server for Search Results

  const searchRequestBackend = async (reqPrams) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let searchTemplate = searchQueryConst;

    searchTemplate.qp = reqPrams;

    // console.info(
    //   `[DEBUG] The value of search Template ${JSON.stringify(
    //     searchTemplate,
    //     null,
    //     2
    //   )}`
    // );

    try {
      const response = await axios.get(
        "/api/sd/sh",

        {
          params: searchTemplate,
        }
      );
      // console.info(
      //   `[DEBUG] The Search Request Header is \n ${JSON.stringify(
      //     response.data,
      //     null,
      //     2
      //   )}`
      // );
      dispatch({ type: SEARCH_REQUEST_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: SEARCH_REQUEST_ERROR,
        payload: error.response.data,
      });
      // console.info(
      //   `[DEBUG] ERROR The Search Request Header is \n ${error.response.data}`
      // );
      return error;
    }
  };

  // Actions Search Query

  const addSearchQueryFormat = (queryload) => {
    console.log(
      `[DEBUG][ADD SEARCH QUERY] called with query load ${JSON.stringify(
        queryload
      )}`
    );
    dispatch({
      type: ADD_SEARCH_QUERY_LOCAL_STATE,
      payload: queryload,
    });
  };

  const removeSearchQueryFormat = (queryload) => {
    dispatch({
      type: REMOVE_SEARCH_QUERY_LOCAL_STATE,
      payload: queryload,
    });
  };

  const errorSearchQueryFormat = (errorload) => {
    dispatch({
      type: ERROR_REMOVE_SEARCH_QUERY_LOCAL_STATE,
      payload: errorload,
    });
  };

  return (
    <DebateContext.Provider
      value={{
        searchquery: state.searchquery,
        loading: state.loading,
        debatesearchResult: state.debatesearchResult,
        newssearchResult: state.newssearchResult,
        currentDebateSection: state.currentDebateSection,
        debateQueryObj: state.debateQueryObj,

        addSearchQuery,
        removeSearchQuery,
        addLoading,
        removeLoading,
        searchRequestBackend,
        searchRequestBackendProm,
        removeSearchQueryResults,
        addSearchQueryFormat,
        removeSearchQueryFormat,
        errorSearchQueryFormat,
        manipulateQuery,
        searchRequestExplorerProm,
        addError,
        removeError,

        errors: {},
      }}
    >
      {props.children}
    </DebateContext.Provider>
  );
};

export default DebateState;
