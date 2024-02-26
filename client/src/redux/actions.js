export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';

export const filterByType = (type) => ({
  type: FILTER_BY_TYPE,
  payload: type,
});

export const filterByOrigin = (origin) => ({
  type: FILTER_BY_ORIGIN,
  payload: origin,
});
