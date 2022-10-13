import {
    CREATE_MONDEL,
    UPDATE_MONDEL,
    RETRIEVE_MONDELS,
    DELETE_MONDEL,
    DELETE_ALL_MONDELS
} from "./types"

import MondelDataService from "../services/mondel.service"

export const createMondel = (name, age, food) => async (dispatch) => {
    try {
      const res = await MondelDataService.create({ name, age, food });
      dispatch({
        type: CREATE_MONDEL,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const retrieveMondels = () => async (dispatch) => {
    try {
      const res = await MondelDataService.getAll();
  
      dispatch({
        type: RETRIEVE_MONDELS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateMondel = (id, data) => async (dispatch) => {
    try {
      const res = await MondelDataService.update(id, data);
  
      dispatch({
        type: UPDATE_MONDEL,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteMondel = (id) => async (dispatch) => {
    try {
      await MondelDataService.delete(id);
  
      dispatch({
        type: DELETE_MONDEL,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllMondels = () => async (dispatch) => {
    try {
      const res = await MondelDataService.deleteAll();
  
      dispatch({
        type: DELETE_ALL_MONDELS,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findMondelsByName = (name) => async (dispatch) => {
    try {
      const res = await MondelDataService.findByName(name);
  
      dispatch({
        type: RETRIEVE_MONDELS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };