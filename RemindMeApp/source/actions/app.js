import axios from 'axios';
import { /*FETCH_ALL_DATA,*/ CREATE_MEMO, 
  SELECT_ITEM, REMOVE_ITEMS, CREATE_COLLECTION } from '../constants/app';

/*
const dataFetch = data => ({
  type: FETCH_ALL_DATA,
  data
});

export const fetchDataAll = () => dispatch => {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      dispatch(dataFetch(response.data));
    })
}
*/

const createMemo = memo => ({
  type: CREATE_MEMO,
  memo
});

export const getCreateMemo = (memo) => dispatch => {
  dispatch(createMemo(memo));
}

const selectItem = (index,item) => ({ 
  type: SELECT_ITEM,
  index,
  item
});

export const dispatchSelectItem = (index,item) => dispatch => {
  dispatch(selectItem(index,item));
}

const removeItems = () => ({
  type: REMOVE_ITEMS
});

export const dispatchRemoveItems = () => dispatch => {
  dispatch(removeItems());
}

/*
const createCollection = () => ({
  type: CREATE_COLLECTION
});

export const dispatchCreateCollection = () => dispatch => {
  dispatch(createCollection());
}
*/