import * as types from '../actions/actionTypes';
import initialState from './inititalState';

const actionTypeEndsInSuccess = type => {
  return type.substring(type.length - 8) === '_SUCCESS';
};

export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type === types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    actionTypeEndsInSuccess(action.type) ||
    action.type === types.API_CALL_ERROR
  ) {
    if (state > 0) {
      return state - 1;
    }
  }

  return state;
}
