export const createReducer = (initialState: any, fnMap: any) => {
  return (state = initialState, map: any) => {
    const handler = fnMap[map.type];
    return handler ? handler(state, map.payload) : state;
  };
};

export const initialState = {
  loading: false,
  items: [],
  target: null,
  error: null
};

export const fetchRequest = (state: any) => {
  return Object.assign({}, state, {
    ...state,
    loading: true
  });
};
export const fetchItemsSuccess = (state: any, payload: any) => {
  return Object.assign({}, state, {
    ...state,
    loading: false,
    items: payload
  });
};

export const fetchTargetSuccess = (state: any, payload: any) => {
  return Object.assign({}, state, {
    ...state,
    loading: false,
    target: payload
  });
};

export const fetchError = (state: any, error: any) => {
  return Object.assign({}, state, {
    ...state,
    loading: false,
    error: error
  });
};
