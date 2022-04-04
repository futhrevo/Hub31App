import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getNameProfession } from '../../../../modules/utils';
import genCourseGrad from '../../../../modules/gen-course-grad';

const CourseCard = ({
  id, title, specId = '', rating, price
}) => {
  const { name, profession } = getNameProfession(title);
  const [spec, setSpec] = useState('');
  useEffect(
    () => {
      const { name: specName = '' } = {};
      // Specializations.findOne({ id: specId }) || {};
      setSpec(specName);
    },
    [specId],
  );
  let sum = 0, count = 0;
  rating.forEach((e, i) => {
    sum += e * i;
    count += e;
  });
  let star = 0;
  if (sum > 0) {
    star = Math.round(sum / count);
  }
  return (
    <Card className="shadow" style={{ maxWidth: '22rem' }}>
      <Link to={`/course/${id}`} className="text-decoration-none">
        <div
          className="course-card-grad"
          style={{ backgroundImage: genCourseGrad(name, profession) }}
        >
          <p className="p-3">{name}</p>
        </div>
        <Card.Body>
          <Card.Text>{profession}</Card.Text>
          <Card.Text className="text-muted">
            <small>{spec}</small>
          </Card.Text>
          <Card.Text className="text-muted d-flex justify-content-between">
            <small>
              <i className="fa fa-star mr-1 star-gold" aria-hidden="true"></i>
              {star}
            </small>

            {price === 0 ? "FREE" : (<small>
              <i className="fa fa-dollar-sign mr-1" aria-hidden="true"></i>
              {price}
            </small>)}

          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

CourseCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  profession: PropTypes.string,
  specId: PropTypes.string,
};

const mapStateToProps = (state, { id, name }) => {
  if (name) {
    return {}
  }
  const course = state?.Courses[id] ?? {};
  return {
    id: course?.id ?? '',
    title: course?.title ?? '',
    rating: course?.rating ?? [],
    price: course?.price ?? 0
  }
}

export default connect(mapStateToProps)(CourseCard);
