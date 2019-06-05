export const createReducer = (initialState: any, fnMap: any) => {
  return (state = initialState, map: any) => {
    const handler = fnMap[map.type];
    return handler ? handler(state, map.payload) : state;
  };
};
