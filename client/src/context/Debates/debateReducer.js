import {
  ADD_SEARCH_LOCAL_STATE,
  REMOVE_SEARCH_LOCAL_STATE,
  ADD_LOADING_LOCAL_STATE,
  REMOVE_LOADING_LOCAL_STATE,
  SEARCH_REQUEST_SUCCESS,
  SEARCH_REQUEST_ERROR,
  REMOVE_SEARCH_REQUEST,
  REMOVE_SEARCH_REQUEST_ERROR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_SEARCH_LOCAL_STATE:
      return {
        ...state,
        searchquery: action.payload,
      };

    case REMOVE_SEARCH_LOCAL_STATE:
      return {
        ...state,
        searchquery: "",
      };

    case ADD_LOADING_LOCAL_STATE:
      return {
        ...state,
        loading: true,
      };

    case REMOVE_LOADING_LOCAL_STATE:
      return {
        ...state,
        loading: false,
      };

    case SEARCH_REQUEST_SUCCESS:
      return {
        ...state,
        debatesearchResult: action.payload,
      };

    case REMOVE_SEARCH_REQUEST:
      return {
        ...state,
        debatesearchResult: {},
      };

    case SEARCH_REQUEST_ERROR:
      return {
        ...state,
        errors: action.payload,
      };

    case REMOVE_SEARCH_REQUEST_ERROR:
      return {
        ...state,
        errors: {},
      };

    default:
      return state;
  }
};
