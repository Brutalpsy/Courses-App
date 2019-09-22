import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadCourses } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';

const ManageCoursePage = ({ courses, authors, loadCourses, loadAuthors }) => {
  useEffect(() => {
    if (!courses.length) {
      loadCourses().catch(err => alert(`error happened ${err}`));
    }
    if (!authors.length) {
      loadAuthors().catch(err => alert(`error happened ${err}`));
    }
  }, []);

  return (
    <>
      <h2>Manage Courses</h2>
      <div></div>
    </>
  );
};

ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  authors: PropTypes.array.isRequired
};

function mapStateToProps({ courses, authors }) {
  return {
    courses,
    authors
  };
}
const mapDispatchToProps = {
  loadCourses,
  loadAuthors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
