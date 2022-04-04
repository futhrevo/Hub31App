/* eslint-disable eqeqeq */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import ChapterMaterial from '../../components/Course/ChapterMaterial';
import CourseAdminMenu from '../../components/Course/CourseAdminMenu';
import CourseChapterList from '../../components/Course/CourseChapterList';
import CourseEditAbt from '../../components/Course/CourseEditAbt';
import CourseEditResources from '../../components/Course/CourseEditResources';
import CourseForums from '../../components/Course/CourseForums';
import CourseInfoContent from '../../components/Course/CourseInfoContent';
import CourseLives from '../../components/Course/CourseLiveList';
import CourseLongDesc from '../../components/Course/CourseLongDesc';
import CourseResults from '../../components/Course/CourseResults';
import CourseSession from '../../components/Course/CourseSession';
import CourseSessionsList from '../../components/Course/CourseSessionsList';
import Loading from '../../components/Loading';
import isEmpty from '../../modules/isEmpty';
import { fetchAdminCourse } from '../../redux/courses/actions';
import ErrorBoundary from '../ErrorBoundary';
import NotFound from '../NotFound';
import './ViewCourse.scss';
import CourseHeader from '../../components/Course/CourseHeader';
import { CourseContext } from '../../components/Course/ViewCourse/context';

const ViewCourse = ({
  match, history, fetchAdminCourse, loading, course, sessions
}) => {

  // eslint-disable-next-line no-unused-vars
  const [forum, setForum] = useState(null);
  const [edit, toggleEdit] = useState(false);

  const value = {
    state: { edit, course, sessions },
    actions: { toggleEdit }
  };

  useEffect(() => {
    fetchAdminCourse(match.params.id);
  }, [match.params.id, fetchAdminCourse]);

  if (loading === undefined || loading) {
    return <Loading />;
  }
  if (isEmpty(course)) {
    return <NotFound />;
  }
  const pathname = match.url;
  return (
    <ErrorBoundary>
      <CourseContext.Provider value={value}>
        <Container fluid className="mb-5">
          <Row className="flex-wrap">
            <CourseAdminMenu pathname={pathname} />
            <Col xl={10} md={9}>
              <CourseHeader />
              <ErrorBoundary>
                <Switch>
                  <Route path={`${pathname}`} exact render={(props) => <CourseInfoContent course={course} history={history} edit={edit} {...props} />} />
                  <Route path={`${pathname}/desc`} render={(props) => <CourseLongDesc course={course} history={history} edit={edit} {...props} />} />
                  <Route path={`${pathname}/about`} render={(props) => <CourseEditAbt course={course} edit={edit} {...props} />} />
                  <Route path={`${pathname}/rsc`} render={(props) => <CourseEditResources course={course} edit={edit} {...props} />} />
                  <Route path={`${pathname}/chap`} render={(props) => <CourseChapterList course={course} edit={edit} {...props} />} />
                  <Route path={`${pathname}/mat`} render={(props) => <ChapterMaterial course={course} edit={edit} {...props} />} />
                  <Route path={`${pathname}/results`} render={(props) => <CourseResults course={course} edit={edit} {...props} />} />
                  <Route path={`${pathname}/forums`} render={(props) => <CourseForums course={course} edit={edit} forum={forum} {...props} />} />
                  <Route exact path={`${pathname}/sess`} render={(props) => <CourseSessionsList course={course} edit={edit} sessions={sessions} {...props} />} />
                  <Route exact path={`${pathname}/sess/:sessId`} render={(props) => <CourseSession course={course} edit={edit} session={sessions.find(el => el.cAt == props.match.params.sessId)} {...props} />} />
                  <Route path={`${pathname}/live`} render={(props) => <CourseLives course={course} edit={edit} {...props} />} />
                </Switch>
              </ErrorBoundary>
            </Col>
          </Row>
        </Container>
      </CourseContext.Provider>
    </ErrorBoundary>
  );
}

ViewCourse.propTypes = {
  course: PropTypes.object,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  forum: PropTypes.object,
};
ViewCourse.defaultProps = {
  loading: true,
}

const mapStateToProps = (state, { match }) => ({
  course: state?.Courses[match?.params?.id]?.Course ?? {},
  sessions: state?.Courses[match?.params?.id]?.CSessions ?? [],
  loading: state?.Courses[match?.params?.id]?.loading,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchAdminCourse: id => {
      dispatch(fetchAdminCourse(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCourse);
