import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DashCard = ({ title, method, link }) => {
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Meteor.call(method, (error, res) => {
    //   if (res) {
    //     setCount(res);
    //   }
    // });
  }, [method]);

  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Link to={link}>
          <h1 className="display-4">{count}</h1>
        </Link>
      </Card.Body>
    </Card>
  );
};

DashCard.propTypes = {
  title: PropTypes.string,
  method: PropTypes.string,
  link: PropTypes.string,
};

export default DashCard;
