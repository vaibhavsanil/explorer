import {
  ADD_SEARCH_LOCAL_STATE,
  REMOVE_SEARCH_LOCAL_STATE,
  ADD_LOADING_LOCAL_STATE,
  REMOVE_LOADING_LOCAL_STATE,
  SEARCH_REQUEST_SUCCESS,
  SEARCH_REQUEST_ERROR,
  REMOVE_SEARCH_REQUEST,
  REMOVE_SEARCH_REQUEST_ERROR,
  ADD_SEARCH_QUERY_LOCAL_STATE,
  REMOVE_SEARCH_QUERY_LOCAL_STATE,
  ERROR_REMOVE_SEARCH_QUERY_LOCAL_STATE,
  ADD_STATS_QUERY_WELCOME_LOCAL_STATE,
  REMOVE_STATS_QUERY_WELCOME_LOCAL_STATE,
} from '../types';

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
        searchquery: '',
      };

    case ADD_STATS_QUERY_WELCOME_LOCAL_STATE:
      return {
        ...state,
        statsQueryWelcome: action.payload,
      };

    case REMOVE_STATS_QUERY_WELCOME_LOCAL_STATE:
      return {
        ...state,
        statsQueryWelcome: {},
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

    case ADD_SEARCH_QUERY_LOCAL_STATE:
      return {
        ...state,
        debateQueryObj: action.payload,
      };

    case REMOVE_SEARCH_QUERY_LOCAL_STATE:
      return {
        ...state,
        debateQueryObj: {},
      };

    case ERROR_REMOVE_SEARCH_QUERY_LOCAL_STATE:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};
