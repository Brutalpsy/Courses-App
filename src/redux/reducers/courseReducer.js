import * as types from '../actions/actionTypes';
import initialState from './inititalState';

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE:
      return [...state, { ...action.course }];
    case types.LOAD_COURSES_SUCCESS: {
      const { courses } = action;
      return courses;
    }

    default:
      return state;
  }
}
