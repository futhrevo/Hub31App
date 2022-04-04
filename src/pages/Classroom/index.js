import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, Container, Nav, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary';
import AppHelmet from '../../components/AppHelmet';
import { ClassContent, ClassSidebar, NoCourse } from '../../components/Classroom';
import Loading from '../../components/Loading';
import urlJoin from '../../modules/url-join';
import urlPopLastPath from '../../modules/url-pop-path';
import { getNameProfession } from '../../modules/utils';
import { fetchClassCourse } from '../../redux/courses/actions';
import NotFound from '../NotFound';
import './styles.scss';

// only http urls are working if chrome browser cors plugin is used
// const manifestUri = 'https://dckd0m1zhrzif.cloudfront.net/temp1/stream.mpd';

function findMatIndex(coll, id) {
  if (!coll) {
    return 0;
  }
  if (!id) {
    return 0;
  }
  for (let i = 0; i < coll.length; i += 1) {
    if (coll[i].id === id) {
      return i;
    }
  }
  return -1;
}

const Classroom = (props) => {
  const { match, fetchClassCourse } = props;
  useEffect(() => {
    fetchClassCourse(match.params.id, match.params.chapter);
  }, [fetchClassCourse, match.params.id, match.params.chapter]);

  if (props.resolving) {
    return <Loading />;
  }

  if (!props.course) {
    return <NotFound />;
  }
  return <ClassroomInt {...props} />;
};

const ClassroomInt = (props) => {
  const [hidden, setHidden] = useState(false);
  const [matId, setMatId] = useState(props?.match?.params?.material ?? '');
  const [max, setMax] = useState(0);

  const { mats = [], match, history, chapter, course, encourse } = props;

  useEffect(() => {
    setMax(mats.length - 1);
  }, [mats.length]);

  useEffect(() => {
    if (match.params.chapter == null) {
      let newurl = match.url;
      history.replace(urlJoin(newurl, chapter.id));
    }
    if (match.params.material == null) {
      let newurl = match.url;
      if (mats.length > 0 && matId === '') {
        setMatId(mats[0].id);
        history.replace(urlJoin(newurl, mats[0].id));
      }
    }
  }, [history, match.params.chapter, match.params.material, match.url, chapter.id, matId, mats]);

  const updateMatUrl = useCallback((matId) => {
    setMatId(matId);
    const material = match.params.material;
    let newurl = match.url;
    if (material) {
      newurl = urlPopLastPath(match.url);
    }
    history.replace(urlJoin(newurl, matId));
  }, [history, match.url, match.params.material]);

  const changeMaterial = useCallback((matId) => {
    const index = findMatIndex(mats, matId);
    if (index > -1) {
      updateMatUrl(matId);
    }
  }, [mats, updateMatUrl]);

  const upMaterial = useCallback(() => {
    const oldmat = matId;
    let index = findMatIndex(mats, oldmat);
    if (index < max) {
      index += 1;
      const matId = mats[index].id;
      updateMatUrl(matId);
    }
  }, [matId, mats, max, updateMatUrl]);

  const downMaterial = useCallback(() => {
    const oldmat = matId;
    let index = findMatIndex(mats, oldmat);
    if (index > 0) {
      index -= 1;
      const matId = mats[index].id;
      updateMatUrl(matId);
    }
  }, [matId, mats, updateMatUrl]);

  const title = course?.title ?? '';
  const { name, profession } = useMemo(() => getNameProfession(title), [title]);

  return (
    <ErrorBoundary>
      <div>
        {encourse && Object.prototype.hasOwnProperty.call(encourse, 'sessCse') ? (
          <div className="d-flex align-items-stretch">
            <AppHelmet title={`${name} ${profession}`} />
            <ClassSidebar
              hidden={hidden}
              chap={chapter}
              mats={mats}
              results={encourse.chaps[chapter.id] ?? {}}
              selected={matId}
              onSelect={changeMaterial}
            />
            <Container fluid className="flex-fill px-0">

              <Row>
                <Col>
                  <Nav className="py-2 d-block bg-light">
                    <div className="px-2 d-flex justify-content-between">
                      <Button variant="light" onClick={() => setHidden(!hidden)}>
                        &#9776;
                        <span className="d-none d-md-inline hml-10">
                          Outline
                        </span>
                      </Button>

                      <div className="d-flex text-truncate">
                        {course && (
                          <Link
                            to={`/course/${course.id}`}
                            className="text-truncate text-decoration-none"
                          >
                            {`${name} - ${profession}`}
                          </Link>
                        )}
                      </div>
                      <div className="d-flex">
                        <Button
                          variant="light"
                          onClick={downMaterial}
                          disabled={findMatIndex(mats, matId) === 0}
                        >
                          &larr;
                          <span className="d-none d-md-inline hml-10">
                            Previous
                          </span>
                        </Button>
                        <Button
                          variant="light"
                          onClick={upMaterial}
                          disabled={
                            findMatIndex(mats, matId) === max
                          }
                        >
                          <span className="d-none d-md-inline hmr-10">
                            Next
                          </span>
                          &rarr;
                        </Button>
                      </div>
                    </div>
                  </Nav>
                </Col>
              </Row>

              <Row noGutters className="Classroom">
                <ClassContent
                  sessId={(encourse?.sessCse ?? '').split('.')[1]}
                  chapter={chapter}
                  selected={mats.find(el => el.id === matId)}
                  onSelect={changeMaterial}
                />
              </Row>
            </Container>
          </div>
        ) : (
          <NoCourse doc={course} />
        )}
      </div>
    </ErrorBoundary>
  );
}

ClassroomInt.propTypes = {
  history: PropTypes.object.isRequired,
  course: PropTypes.object,
  encourse: PropTypes.object,
  chapter: PropTypes.object,
  mats: PropTypes.array,
  rlts: PropTypes.array,
  match: PropTypes.object,
};

Classroom.propTypes = {
  resolving: PropTypes.bool,
  course: PropTypes.object,
};

Classroom.defaultProps = {
  resolving: true,
  course: {},
}

const mapStateToProps = (state, { match }) => {
  const chapterId = state?.Courses[match?.params?.id]?.chapterId ?? ' ';
  return {
    course: state?.Courses[match?.params?.id]?.Course ?? {},
    sessions: state?.Courses[match?.params?.id]?.CSessions ?? [],
    resolving: state?.Courses[match?.params?.id]?.cloading,
    encourse: state?.Courses[match?.params?.id]?.EnCourses ?? {},
    chapter: (state?.Courses[match?.params?.id]?.Chapters ?? []).find(el => el.id === chapterId),
    mats: ((state?.Courses[match?.params?.id]?.Materials) ?? {})[chapterId]
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchClassCourse: (id, chapterId) => {
      dispatch(fetchClassCourse(id, chapterId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Classroom);
