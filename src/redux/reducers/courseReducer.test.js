import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

it('should add a course when passed CREATE_COURSE_SUCCESS', () => {
  const initState = [
    {
      title: 'a',
    },
    {
      title: 'b',
    },
  ];
  const newCourse = {
    title: 'c',
  };

  const action = actions.createCourseSuccess(newCourse);
  const state = courseReducer(initState, action);

  expect(state.length).toEqual(3);
});

it('should update course when passed UPDATE_COURSE_SUCCESS', () => {
  //arrange
  const initialState = [
    { id: 1, title: 'A' },
    { id: 2, title: 'B' },
    { id: 3, title: 'C' },
  ];
  const course = { id: 2, title: 'NEw title' };

  const action = actions.updateCourseSuccess(course);

  //act

  const newState = courseReducer(initialState, action);
  const updateCourse = newState.find((x) => x.id === course.id);
  const untouchedCOurse = newState.find((x) => x.id === 1);

  //assert

  expect(updateCourse.title).toEqual('NEw title');
  expect(untouchedCOurse.title).toEqual('A');
  expect(newState.length).toEqual(3);
});
