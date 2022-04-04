import PropTypes from 'prop-types';
import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import urlPopLastPath from '../../../../modules/url-pop-path';
import CourseOutlineChapterItem from './components/CourseOutlineChapterItem';
import CourseOnChapter from './components/CourseOnChapter';

const CourseOutlineContent = (props) => {
  const { match, id } = props;
  const { outline, course } = useSelector(state => ({
    course: state?.Courses[id]?.Course ?? {},
    outline: state?.Courses[id]?.Chapters ?? []
  }))

  let url = '#';
  if (match) {
    url = `${urlPopLastPath(urlPopLastPath(match.url))}/class`;
  }
  return (
    <div>
      <CourseOnChapter baseUrl={url} course={course} {...props} />
      <ListGroup>
        {outline
          && outline.map(data => (
            < CourseOutlineChapterItem baseUrl={url} courseId={id} chap={data} key={data.id} />
          ))}
      </ListGroup>
    </div>
  );
};

CourseOutlineContent.propTypes = {
  outline: PropTypes.array,
  match: PropTypes.object,
};

export default CourseOutlineContent;
