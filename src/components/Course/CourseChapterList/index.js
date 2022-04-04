import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Alert, ListGroup } from 'react-bootstrap';
import { useDispatch, connect } from 'react-redux';
import { useAlert } from 'react-alert';

import CourseAddChapter from './components/CourseAddChapter';
import ChapterCard from './components/ChapterCard';
import { deleteChapter, upChapter, downChapter } from '../../../redux/courses/chapterActions';
import { deleteChapterAPI, swapChapterAPI } from '../../../api/chapters';


const CourseChapterList = (props) => {
  const { chapters, course, edit = false } = props;
  const dispatch = useDispatch();
  const alert = useAlert();

  if (chapters.length === 0) {
    return (
      <Fragment>
        <Alert variant="warning">No Chapters yet.</Alert>
        <CourseAddChapter courseId={course.id} />
      </Fragment>
    );
  }

  const handleRemove = async (chapId, courseId, index) => {
    if (window.confirm('Are you sure? This is permanent!')) {
      try {
        await deleteChapterAPI(courseId, chapId, index);
        dispatch(deleteChapter(chapId, courseId));
        alert.success('Chapter deleted!');
      } catch (e) {
        alert.error("Unable to delete chapter");
      }
    }
  }

  const handleUp = async (chapId, courseId, index) => {
    if (index === 0) return;
    const newIndex = index - 1;
    try {
      await swapChapterAPI(courseId, chapId, index, chapters[newIndex].id, newIndex);
      dispatch(upChapter(chapId, courseId, index));
    } catch (e) {
      alert.error("Unable to move chapter");
    }
  };

  const handleDown = async (chapId, courseId, index) => {
    if (index === chapters.length - 1) return;
    const newIndex = index + 1;
    try {
      await swapChapterAPI(courseId, chapId, index, chapters[newIndex].id, newIndex);
      dispatch(downChapter(chapId, courseId, index));
    } catch (e) {
      alert.error("Unable to move chapter");
    }
  };

  return (
    <Fragment>
      <ListGroup>
        {chapters.map((chapter, index) => (
          <ChapterCard
            key={chapter.id}
            ind={index}
            chapter={chapter}
            courseId={course.id}
            edit={edit}
            handleRemove={handleRemove}
            handleUp={handleUp}
            handleDown={handleDown}
          />
        ))}
      </ListGroup>
      {edit && <CourseAddChapter courseId={course.id} />}
    </Fragment>
  );
};

CourseChapterList.propTypes = {
  chapters: PropTypes.array,
  course: PropTypes.object,
  edit: PropTypes.bool,
};

CourseChapterList.defaultProps = {
  chapters: [],
  course: {},
  edit: false
}

const mapStateToProps = (state, { course }) => ({
  chapters: state?.Courses[course.id]?.Chapters ?? [],
});

export default connect(mapStateToProps)(CourseChapterList);

