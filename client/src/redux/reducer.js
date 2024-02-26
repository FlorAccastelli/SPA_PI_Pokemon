import { FILTER_BY_TYPE, FILTER_BY_ORIGIN } from './actions';

const initialState = {
  typeFilter: null,
  originFilter: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_BY_TYPE:
      return {
        ...state,
        typeFilter: action.payload,
      };
    case FILTER_BY_ORIGIN:
      return {
        ...state,
        originFilter: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
