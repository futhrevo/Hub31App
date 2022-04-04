import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Col, Collapse, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import urlJoin from '../../modules/url-join';
import { getNameProfession } from '../../modules/utils';
import CourseForum from '../../pages/CourseForum';
import NotFound from '../../pages/NotFound';
import { rateCourseDis } from '../../redux/courses/actions';
import AppHelmet from '../AppHelmet';
import Loading from '../Loading';
import {
  CourseAboutContent, CourseMainContent, CourseOutlineContent,
  CourseRater, CourseResourcesContent, CourseSidebar, CourseLiveContent
} from './components';

const CoursePageContent = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    doc, match, isBought, dispatchRateCourse, activLive
  } = props;
  if (!doc) {
    return <NotFound />;
  }
  if (!doc.title) {
    return <Loading />;
  }
  const { name, profession } = getNameProfession(doc && doc.title);
  return (
    <Container fluid>
      <AppHelmet title={`${name} ${profession}`} />
      <div id="left-tabs-course">
        <Row className="flex-xl-nowrap">
          <Col xs={12} md={3} xl={2} className="sidepanel">
            <div className="d-flex align-items-end">
              <Button
                variant="link"
                className="p-0 d-md-none ml-3"
                onClick={() => setCollapsed(!collapsed)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 30 30"
                  width="30"
                  height="30"
                  focusable="false"
                >
                  <title>Menu</title>
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    d="M4 7h22M4 15h22M4 23h22"
                  />
                </svg>
              </Button>
            </div>
            <Collapse in={collapsed}>
              <div className="overflow-wrapper">
                <CourseSidebar {...props} />
              </div>
            </Collapse>
          </Col>
          <Col xs={12} md={9} xl={10}>
            <CourseMainContent {...props} />
            <Container>
              <Switch>
                <Route
                  path={urlJoin(match.url, 'outline')}
                  render={props => (
                    <div>
                      <CourseOutlineContent id={doc.id} {...props} />
                      <CourseRater id={doc.id} sessId={(isBought?.sessCse ?? '').split('.')[1]} rating={isBought?.rating} onChange={dispatchRateCourse} />
                    </div>
                  )}
                />
                <Route
                  path={urlJoin(match.url, 'live')}
                  render={props => (
                    <CourseLiveContent {...props} courseId={doc.id} activLive={activLive} />
                  )}
                />
                <Route
                  path={urlJoin(match.url, 'forum')}
                  render={props => (
                    <CourseForum {...props} courseId={doc.id} />
                  )}
                />
                <Route
                  path={urlJoin(match.url, 'resources')}
                  render={props => (
                    <CourseResourcesContent {...props} course={doc} />
                  )}
                />
                <Route
                  path={urlJoin(match.url, 'about')}
                  render={props => (
                    <CourseAboutContent {...props} course={doc} />
                  )}
                />
              </Switch>
            </Container>
          </Col>
        </Row>
      </div>
    </Container>
  );
}


CoursePageContent.propTypes = {
  doc: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = (state, { course }) => ({
  doc: state?.Courses[course.id]?.Course ?? {},
  csession: (state?.Courses[course.id]?.CSessions ?? []).find(el => (el.cAt < Date.now() && el.eAt > Date.now())),
  isBought: state?.Courses[course.id]?.EnCourses ?? false,
  activLive: state?.Courses[course.id]?.Lives?.active ?? '',
});

const mapDispatchToProps = dispatch => {
  return {
    dispatchRateCourse: (id, sessId, rating) => {
      dispatch(rateCourseDis(id, sessId, rating))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePageContent);
