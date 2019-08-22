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

export const reset = (state: any) => {
  return Object.assign({}, state, {
    ...initialState,
    loading: true
  });
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
    error
  });
};

export const fetchRequestSub = (state: any) => {
  return Object.assign({}, state, {
    ...state,
    loadingSub: true
  });
};

export const fetchItemsSuccessSub = (state: any, payload: any) => {
  return Object.assign({}, state, {
    ...state,
    loadingSub: false,
    itemsSub: payload
  });
};

export const fetchTargetSuccessSub = (state: any, payload: any) => {
  return Object.assign({}, state, {
    ...state,
    loadingSub: false,
    targetSub: payload
  });
};

export const fetchErrorSub = (state: any, error: any) => {
  return Object.assign({}, state, {
    ...state,
    loadingSub: false,
    errorSub: error
  });
};

export const fetchExistRequest = (state: any) => {
  return Object.assign({}, state, {
    ...state,
    loadingExist: true
  });
};

export const fetchExistSuccess = (state: any, payload: any) => {
  return Object.assign({}, state, {
    ...state,
    loadingExist: false,
    exist: payload
  });
};

export const fetchExistError = (state: any, error: any) => {
  return Object.assign({}, state, {
    ...state,
    loadingExist: false,
    errorExist: error
  });
};
