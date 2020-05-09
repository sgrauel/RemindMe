import { /*FETCH_ALL_DATA,*/ CREATE_MEMO, SELECT_ITEM } from '../constants/app';

const initialState = {
  data: []
}

const video_library = (state = [], action) => {
  switch (action.type) {
    case CREATE_MEMO:
      return [action.memo, ...state];
    case SELECT_ITEM:
      return state.map(item => state.indexOf(item) === action.index ? 
                               action.item  : item);
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
      }
    default:
      return state;
  }
}