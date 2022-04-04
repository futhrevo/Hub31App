import React from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// https://bootstrapious.com/
// TODO: update for normal courses link
const NoCourse = props => (
  <Container>
    <Jumbotron>
      <h1>Subscribe!</h1>
      <p>Please subscribe this course in order to continue</p>
      {props.doc && props.doc.id ? (
        <Link to={`/course/${props.doc.id}`}>
          <p>
            <Button variant="primary">Course Page</Button>
          </p>
        </Link>
      ) : (
          <Link to="/">
            <p>
              <Button variant="primary">Home</Button>
            </p>
          </Link>
        )}
    </Jumbotron>
  </Container>
);

NoCourse.propTypes = {
  doc: PropTypes.object,
};
export default NoCourse;
