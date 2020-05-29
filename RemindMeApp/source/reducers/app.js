import { /*FETCH_ALL_DATA,*/ CREATE_MEMO, 
  SELECT_ITEM, REMOVE_ITEMS, CREATE_COLLECTION,
  ADD_TO_COLLECTION, UPDATE_MEMO, UPDATE_COLLECTION } from '../constants/app';
import { CommonActions } from '@react-navigation/core';

const initialState = {
  data: [],
  collections: []
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
    case UPDATE_MEMO:
      return state.map(item => item.id === action.memoId ? 
        Object.assign({},item,{
          title: action.title,
          text: action.text
        }) : item);
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
    case UPDATE_MEMO:
      return {
        data: video_library(state.data, action)
      }
    default:
      return state;
  }
}

const collections_library = (state = [], action) => {
  switch (action.type) {
    case CREATE_COLLECTION:
      return [{
                key: action.key,
                data: [...action.selections]
              }, ...state];
     case ADD_TO_COLLECTION:
      return state.map(collection => 
      collection.key === action.collectionId ?
            Object.assign({}, {...collection}, {
              data: [...action.selections, ...collection.data]
            }) :
            collection
      );
      case UPDATE_COLLECTION:
        return state.map(collection =>
         collection.key === action.colId ? Object.assign({}, collection, { 
              data: collection.data.map(item => item.id === action.memoId ?
                  Object.assign({},item,{
                    title: action.title,
                    text: action.text
                  }): item) 
            }) : collection
        );
    default:
      return state;
  }
}

export const collections = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COLLECTION:
      return {
        collections : collections_library(state.collections, action)
      };
    case ADD_TO_COLLECTION:
      return {
        collections : collections_library(state.collections, action)
      };
    case UPDATE_COLLECTION:
      return {
        collections: collections_library(state.collections, action)
      }
    default:
      return state;
  }
}

/*

console.log('CREATE_COLLECTION');
      const xs = state.data.filter(item => item.isSelected);
      console.log('xs = ' + xs);
      console.log('state.collections = ' + state.collections);
      return {
        collections: [[...xs], ...state.collections] 
      };
*/