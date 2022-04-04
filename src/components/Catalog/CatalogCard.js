import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import genCourseGrad from '../../modules/gen-course-grad';
import { getNameProfession } from '../../modules/utils';

const CatalogCard = ({ course }) => {
  const { id = '', rating = [], price = 0 } = course;
  const { name, profession } = getNameProfession(course && course.title);
  const spec = '';
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
    <Col md={4} sm={6}>
      <Card className="shadow m-3" style={{ maxWidth: '22rem' }} >
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
    </Col>
  );
}

export default CatalogCard;
