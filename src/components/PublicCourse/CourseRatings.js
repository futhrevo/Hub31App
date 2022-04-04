import React from 'react';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';

const CourseRatings = ({ rating = [] }) => {
  if (rating.length !== 5) return null;
  let sum = 0, count = 0, total = 5;
  rating.forEach((e, i) => {
    sum += e * i;
    count += e;
  });
  let star = 0;
  if (sum > 0) {
    star = Math.round(sum / count);
  }

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Row>
            <Col xs={12} md={4} className="text-center">
              <h1 className="rating-num">{star}</h1>
              <div className="rating">
                {[...Array(star)].map((e, i) => <span key={i}>
                  <i className="fas fa-star mr-1 star-gold" aria-hidden="true"></i>
                </span>)}
                {[...Array(total - star)].map((e, i) => <span key={i}>
                  <i className="far fa-star mr-1" aria-hidden="true"></i>
                </span>)}
              </div>
              <div>
                <i className="fa fa-user mr-1" aria-hidden="true"></i>
                {count} Total
                </div>
            </Col>
            <Col xs={12} md={8}>
              <Row className="rating-desc align-items-center">
                <Col xs={3} md={3} className="text-right">
                  <i className="fas fa-star mr-1 star-gold" aria-hidden="true"></i> 5
                  </Col>
                <Col xs={8} md={9}>
                  <ProgressBar striped variant="success" now={rating[5] * 100 / count} label={rating[5] || ''} />
                </Col>
              </Row>
              <Row className="rating-desc align-items-center">
                <Col xs={3} md={3} className="text-right">
                  <i className="fas fa-star mr-1 star-gold" aria-hidden="true"></i> 4
                  </Col>
                <Col xs={8} md={9}>
                  <ProgressBar variant="success" now={rating[4] * 100 / count} label={rating[4] || ''} />
                </Col>
              </Row>
              <Row className="rating-desc align-items-center">
                <Col xs={3} md={3} className="text-right">
                  <i className="fas fa-star mr-1 star-gold" aria-hidden="true"></i> 3
                  </Col>
                <Col xs={8} md={9}>
                  <ProgressBar variant="info" now={rating[3] * 100 / count} label={rating[3] || ''} />
                </Col>
              </Row>
              <Row className="rating-desc align-items-center">
                <Col xs={3} md={3} className="text-right">
                  <i className="fas fa-star mr-1 star-gold" aria-hidden="true"></i> 2
                  </Col>
                <Col xs={8} md={9}>
                  <ProgressBar variant="warning" now={rating[2] * 100 / count} label={rating[2] || ''} />
                </Col>
              </Row>
              <Row className="rating-desc align-items-center">
                <Col xs={3} md={3} className="text-right">
                  <i className="fas fa-star mr-1 star-gold" aria-hidden="true"></i> 1
                  </Col>
                <Col xs={8} md={9}>
                  <ProgressBar variant="danger" now={rating[1] * 100 / count} label={rating[1] || ''} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default CourseRatings;
