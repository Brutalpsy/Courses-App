import * as types from '../actions/actionTypes';
import initialState from './inititalState';

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS: {
      const { courses } = action;
      return courses;
    }
    case types.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }];
    case types.UPDATE_COURSE_SUCCESS: {
      const { course } = action;
      course.isLoading = false;
      return state.map(x => (x.id === course.id ? course : x));
    }
    case types.DELETE_COURSE_OPTIMISTIC:
      return state.filter(course => course.id !== action.id);
    default:
      return state;
  }
}
