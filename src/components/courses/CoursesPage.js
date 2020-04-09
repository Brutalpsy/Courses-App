import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadCourses, deleteCourse } from '../../redux/actions/courseActions';
import * as authorAction from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';
import { Redirect } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

const CoursesPage = ({ courses, authors, actions, isLoading, ...props }) => {
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);

  const navigateToAddNewCourse = () => {
    setRedirectToAddCoursePage(true);
  };

  useEffect(() => {
    if (!courses.length) {
      actions.loadCourses().catch(err => alert(`error happened ${err}`));
    }
    if (!authors.length) {
      actions.loadAuthors().catch(err => alert(`error happened ${err}`));
    }
  }, []);

  const handleDeleteCourse = async id => {
    toast.success('Course deleted');
    try {
      await actions.deleteCourse(id);
    } catch (err) {
      handleDeleteCourseError(err);
    }
  };

  const handleDeleteCourseError = err => {
    toast.error('Delete failed.' + err.message, { autoClose: false });
  };
  return (
    <>
      {redirectToAddCoursePage && <Redirect to={'/course'} />}
      <h2>Courses</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <button
            style={{ marginBottom: 20 }}
            className="btn btn-primary add-course"
            onClick={navigateToAddNewCourse}
          >
            Add Course
          </button>
          <CourseList
            courses={courses}
            onDeleteClick={handleDeleteCourse}
          ></CourseList>
        </>
      )}
    </>
  );
};

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
};

function mapStateToProps({ courses, authors, apiCallsInProgress }) {
  return {
    courses: authors.length
      ? courses.map(course => {
          const authorName = authors.find(
            author => author.id === course.authorId
          );
          return {
            ...course,
            authorName: (authorName && authorName.name) || ''
          };
        })
      : [],
    authors,
    isLoading: apiCallsInProgress > 0
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorAction.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(deleteCourse, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
