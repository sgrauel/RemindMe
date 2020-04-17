import { FETCH_ALL_DATA, CREATE_MEMO } from '../constants/app';

const initialState = {
  data: []
}

const video_library = (state = [], action) => {
  switch (action.type) {
    case CREATE_MEMO:
      return [action.video, ...state];
    default:
      return state;
  }
}


export const app = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_DATA:
      return {
        data: action.data
      };
    case CREATE_MEMO:
      return {
          data : video_library(state.data, action)
      };
    default:
      return state;
  }
}