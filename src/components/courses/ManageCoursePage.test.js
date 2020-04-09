import React from 'react';
import { mount } from 'enzyme';
import { authors, newCourse, courses } from '../../../tools/mockData';
import { ManageCoursePage } from './ManageCoursePage';
import configureStore from '../../redux/configureStore.dev';
import { Provider } from 'react-redux';

function render(args) {
  const defaultProps = {
    authors: authors || {},
    courses: courses || {},
    history: {},
    match: {},
    saveCourse: jest.fn(),
    loadAuthors: jest.fn(),
    loadCourses: jest.fn(),
    course: newCourse,
  };
  const props = { ...defaultProps, ...args };
  const store = configureStore();
  return mount(<ManageCoursePage {...props} />);
}

it('sets error when attempting to save an empty title field', () => {
  const wrapper = render();
  wrapper.find('form').simulate('submit');

  const errorText = wrapper.find('#title').text();
  expect(errorText).toEqual('Title is required. ');
});
