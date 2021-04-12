import React, { useReducer } from "react";
import { Redirect } from "react-router-dom";
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
} from "../types";

// Import the constants
import { searchQueryConst, urlHeaders, CUSTOMER } from "../../constants/index";

const DebateState = (props) => {
  const initialState = {
    searchquery: "",
    loading: false,
    debatesearchResult: {},
    currentDebateSection: {},

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

  // Add Search Query to Local State
  const addSearchQuery = (searchTerm) => {
    dispatch({
      type: ADD_SEARCH_LOCAL_STATE,
      payload: searchTerm,
    });
    // addLoading();
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
  const searchRequestBackendProm = (reqParams) => {
    return new Promise(async function (resolve, reject) {
      let searchTemplate = searchQueryConst;

      searchTemplate.qp = reqParams;

      console.info(
        `[DEBUG] from promise function The value of search Template ${JSON.stringify(
          searchTemplate,
          null,
          2
        )}`
      );

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
        resolve(response.data);
      } catch (error) {
        dispatch({
          type: SEARCH_REQUEST_ERROR,
          payload: error.response.data,
        });
        console.info(
          `[DEBUG] ERROR The Search Request Header is \n ${error.response.data}`
        );
        reject(error.response.data);
      }
    });
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

    console.info(
      `[DEBUG] The value of search Template ${JSON.stringify(
        searchTemplate,
        null,
        2
      )}`
    );

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
      console.info(
        `[DEBUG] ERROR The Search Request Header is \n ${error.response.data}`
      );
      return error;
    }
  };

  return (
    <DebateContext.Provider
      value={{
        searchquery: state.searchquery,
        loading: state.loading,
        debatesearchResult: state.debatesearchResult,
        newssearchResult: state.newssearchResult,
        currentDebateSection: state.currentDebateSection,

        addSearchQuery,
        removeSearchQuery,
        addLoading,
        removeLoading,
        searchRequestBackend,
        searchRequestBackendProm,
        removeSearchQueryResults,

        errors: {},
      }}
    >
      {props.children}
    </DebateContext.Provider>
  );
};

export default DebateState;
