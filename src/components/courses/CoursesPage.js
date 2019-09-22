import React from 'react';
import { connect } from 'react-redux';
import * as courseAction from '../../redux/actions/courseActions';
import * as authorAction from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';

class CoursesPage extends React.Component {
  componentDidMount() {
    const { courses, authors, actions } = this.props;
    if (!courses.length) {
      actions.loadCourses().catch(err => alert(`error happened ${err}`));
    }
    if (!authors.length) {
      actions.loadAuthors().catch(err => alert(`error happened ${err}`));
    }
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
        <div></div>
        <CourseList courses={this.props.courses}></CourseList>
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps({ courses, authors }) {
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
    authors
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseAction.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorAction.loadAuthors, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
