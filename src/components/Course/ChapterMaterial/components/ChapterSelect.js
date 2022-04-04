import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory, useRouteMatch } from "react-router-dom";

const ChapterSelect = (props) => {
  const { course, chapters, path } = props;
  let history = useHistory();
  let match = useRouteMatch(path);
  let chapId = '';
  if (match) {
    chapId = match.params.chapId;
  }

  if (chapters.length === 0) {
    return <Alert variant="warning">Add a Chapter first</Alert>;
  }

  return (
    <Form.Group controlId="chapter_select">
      <Form.Label>Select a chapter</Form.Label>
      <Form.Control
        as="select"
        value={chapId}
        onChange={e => {
          history.replace(`/courses/${course.id}/mat/${e.target.value}`);
        }}
      >
        <option value="">Select a chapter here</option>
        {chapters.map((chapter, index) => (
          <option key={chapter.id} value={chapter.id}>
            {`${index + 1} - ${chapter.desc}`}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

ChapterSelect.propTypes = {
  chapters: PropTypes.array,
};

ChapterSelect.defaultProps = {
  chapters: [],
}


const mapStateToProps = (state, { course }) => ({
  chapters: state?.Courses[course.id]?.Chapters ?? [],
});

export default connect(mapStateToProps)(ChapterSelect);

