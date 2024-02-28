import { FILTER_BY_ORIGIN, FILTER_BY_TYPE, SORT_BY_NAME_ASC, SORT_BY_NAME_DESC, SORT_BY_ATTACK_ASC,SORT_BY_ATTACK_DESC, } from "./actionTypes";

export const filterByType = (type) => ({
  type: FILTER_BY_TYPE,
  payload: type,
});

// export const filterByOrigin = (origin) => ({
//   type: FILTER_BY_ORIGIN,
//   payload: origin,
// });

export const sortByAscName = () => ({
  type: SORT_BY_NAME_ASC,
});

export const sortByDescName = () => ({
  type: SORT_BY_NAME_DESC,
});

export const sortByAscAttack = () => ({
  type: SORT_BY_ATTACK_ASC,
});

export const sortByDescAttack = () => ({
  type: SORT_BY_ATTACK_DESC,
});
