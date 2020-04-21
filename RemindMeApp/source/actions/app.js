import axios from 'axios';
import { /*FETCH_ALL_DATA,*/ CREATE_MEMO } from '../constants/app';

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