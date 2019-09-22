import * as types from '../actions/actionTypes';
import initialState from './inititalState';

export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS: {
      const { authors } = action;
      return authors;
    }
    default:
      return state;
  }
}
