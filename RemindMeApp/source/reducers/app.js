import { /*FETCH_ALL_DATA,*/ CREATE_MEMO, 
  SELECT_ITEM, REMOVE_ITEMS/*, CREATE_COLLECTION */} from '../constants/app';
import { CommonActions } from '@react-navigation/core';

const initialState = {
  data: []
  /*,
  collections: [] */
}

const video_library = (state = [], action) => {
  switch (action.type) {
    case CREATE_MEMO:
      return [action.memo, ...state];
    case SELECT_ITEM:
      return state.map(item => state.indexOf(item) === action.index ? 
                               action.item  : item);
    case REMOVE_ITEMS:
      return state.filter(item => !item.isSelected);
    default:
      return state;
  }
}


export const app = (state = initialState, action) => {
  switch (action.type) {
    /*
    case FETCH_ALL_DATA:
      return {
        data: action.data
      };
    */
    case CREATE_MEMO:
      return {
          data : video_library(state.data, action)
      };
    case SELECT_ITEM:
      return {
        data: video_library(state.data, action)
      };
    case REMOVE_ITEMS:
      return {
        data: video_library(state.data, action)
      };
    /*
    case CREATE_COLLECTION:
      const xs = state.data.filter(item => item.isSelected);
      return {
        collections: [[...xs], ...state.collections] 
      };
    */
    default:
      return state;
  }
}