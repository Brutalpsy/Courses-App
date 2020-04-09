import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from '../courses/CourseForm';
import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

export const ManageCoursePage = ({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  match,
  history,
  isLoading,
  ...props
}) => {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [isLoadingOnSave, setIsLoadingOnSave] = useState(false);

  const onSave = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      setIsLoadingOnSave(true);
      saveCourse(course).then(handleSaveCourseSuccess).catch(handleSaveError);
    }
  };

  const isFormValid = () => {
    const errors = {};
    for (let prop in course) {
      if (!course[prop])
        errors[prop] = `${
          prop.charAt(0).toUpperCase() + prop.slice(1)
        } is required.`;
    }
    setErrors(errors);
    return !Object.keys(errors).length;
  };

  const handleSaveCourseSuccess = () => {
    history.push('/courses');
    toast.success('Successfuly saved course');
  };

  const handleSaveError = (error) => {
    setIsLoadingOnSave(false);
    setErrors({
      onSave: error.message,
    });
  };

  const onChange = (event) => {
    const { name, value } = event.target;

    setCourse((previousCourse) => ({
      ...previousCourse,
      [name]: name === 'authorId' ? +value : value,
    }));
  };

  useEffect(() => {
    if (!courses.length) {
      loadCourses().catch((err) => alert(`error happened ${err}`));
    } else {
      setCourse({ ...props.course });
    }
    if (!authors.length) {
      loadAuthors().catch((err) => alert(`error happened ${err}`));
    }
  }, [props.course]);

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <CourseForm
        saving={isLoadingOnSave}
        errors={errors}
        authors={authors}
        onSave={onSave}
        onChange={onChange}
        course={course}
      />
    </>
  );
};

ManageCoursePage.propTypes = {
  course: PropTypes.object,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  authors: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  saveCourse: PropTypes.func.isRequired,
};

function mapStateToProps({ courses, authors, apiCallsInProgress }, ownProps) {
  const slug = ownProps.match.params.slug;
  const course = courses.find((c) => c.slug == slug) || newCourse;
  return {
    course,
    courses,
    authors,
    isLoading: apiCallsInProgress > 0,
  };
}
const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
