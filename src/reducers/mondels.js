import {
    CREATE_MONDEL,
    DELETE_ALL_MONDELS,
    DELETE_MONDEL,
    RETRIEVE_MONDELS,
    UPDATE_MONDEL
} from "../actions/types";
  const initialState = [];
  function mondelReducer(mondels = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case CREATE_MONDEL:
        return [...mondels, payload];
      case RETRIEVE_MONDELS:
        return payload;
      case UPDATE_MONDEL:
        return mondels.map((mondel) => {
          if (mondel.id === payload.id) {
            return {
              ...mondel,
              ...payload,
            };
          } else {
            return mondel;
          }
        });
      case DELETE_MONDEL:
        return mondels.filter(({ id }) => id !== payload.id);
      case DELETE_ALL_MONDELS:
        return [];
      default:
        return mondels;
    }
  };
  export default mondelReducer;