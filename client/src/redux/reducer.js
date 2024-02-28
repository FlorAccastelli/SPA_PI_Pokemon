import { FILTER_BY_TYPE } from './actionTypes';

// import { FILTER_BY_ORIGIN_DB, FILTER_BY_ORIGIN_API } from './actionTypes'

const initialState = {
   typeFilter: null,
   pokemonData: []
  // originFilter: null,
  // sortBy: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_BY_TYPE:
    const filteredData = state.pokemonData.filter(pokemon => pokemon.type === action.payload);
    return {
        ...state,
        typeFilter: action.payload,
        pokemonData: filteredData,
    };
    // case FILTER_BY_ORIGIN_DB:
    //   return {
    //     ...state,
    //     originFilter: 'DB',
    //   };
    //   case FILTER_BY_ORIGIN_API:
    //     return {
    //       ...state,
    //       originFilter: 'API',
    //     };
      // case SORT_BY_NAME_ASC:
      //   return {
      //     ...state,
      //     sortBy: 'name_asc',
      //   };
      // case SORT_BY_NAME_DESC:
      //   return {
      //     ...state,
      //     sortBy: 'name_desc',
      //   };
      // case SORT_BY_ATTACK_ASC:
      //   return {
      //     ...state,
      //     sortBy: 'attack_asc',
      //   };
      // case SORT_BY_ATTACK_DESC:
      //   return {
      //     ...state,
      //     sortBy: 'attack_desc',
      //   };
    default:
      return state;
  }
};
// console.log(rootReducer)

export default rootReducer;
