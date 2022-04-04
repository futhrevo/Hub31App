import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { Button, Collapse, Container, Modal } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary';
import { joinCourse, resolveCourse } from '../../api/courses';
import AppHelmet from '../../components/AppHelmet';
import Loading from '../../components/Loading';
import { CourseInst, CourseLect, CourseOutline, CourseRatings, Pricing } from '../../components/PublicCourse';
import isEmpty from '../../modules/isEmpty';
import urlJoin from '../../modules/url-join';
import { getNameProfession } from '../../modules/utils';
import CourseSessionResolver from '../../resolvers/CourseSessionResolver';
import NotFound from '../NotFound';
import PageHeader from '../../components/PageHeader';


const handleJoinCourse = async (doc, url, isBought, history, alert) => {
  const { id } = doc;
  if (isBought) {
    history.push(urlJoin(url, 'class'));
  } else {
    try {
      await joinCourse(id);
      alert.success("Joined Course");
      history.push(urlJoin(url, 'class'));
    } catch (e) {
      alert.error((((e.response || {}).data || {}).error || {}).message || 'Unable to Join Course');
    }
  }
}
const PublicCourse = ({ match, history }) => {
  const alert = useAlert();
  const [showMore, setShowMore] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [outline, setOutline] = useState([]);
  const [isBought, setIsBought] = useState(false);
  const [sessMsg, setMsg] = useState('');
  const [doc, setDoc] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      try {
        const res = await resolveCourse(match.params.id);
        const { Course, Chapters, longdesc, EnCourses = {} } = res;
        Course.longdesc = longdesc.body;
        setDoc(Course);
        setOutline(Chapters);
        if (!isEmpty(Course.sess || {})) {
          setMsg(CourseSessionResolver(Course.sess));
        }
        if (!isEmpty(EnCourses)) {
          setIsBought(true);
        }
      } catch (e) {
        alert.error('Unable to get Course information');
      } finally {
        setLoading(false)
      }
    }
    onLoad();
  }, [match.params.id, alert]);

  if (loading) {
    return <Loading />;
  }

  if (isBought) {
    return <Redirect to={`/course/${doc.id}/p/outline`} />;
  }

  if (isEmpty(doc)) {
    return <NotFound />;
  }

  if (!doc.title) {
    return <Loading />;
  }
  const { name, profession } = getNameProfession(doc && doc.title);
  return (
    <ErrorBoundary>
      <Container className="flex-fill mb-5">
        <AppHelmet title={`${name} ${profession}`} />
        <div className="accaCourseClass">
          <PageHeader title={name} subtitle={profession}>
            <div className="float-right">
              <Link to="#">
                <Button variant="success" onClick={() => handleJoinCourse(doc, match.url, isBought, history, alert)}>
                  {isBought ? 'Go to Classroom' : 'Take this course'}
                </Button>
              </Link>
              <h6 style={{ textAlign: 'center' }}>{sessMsg}</h6>
            </div>
          </PageHeader>
          <h4>Introduction</h4>
          <p>{doc.content}</p>
          <Collapse in={showMore}>
            <div dangerouslySetInnerHTML={{ __html: doc.longdesc }} />
          </Collapse>
          <Button
            variant="link"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'Show less \u25B4' : 'Show More \u25Be'}
          </Button>
          <h4>Course Contents</h4>
          <CourseOutline outline={outline} />
          <CourseLect />
          <CourseInst />
          <CourseRatings rating={doc.rating} />
          <Modal show={showPricing} onHide={() => setShowPricing(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Select your flavour</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Pricing />
            </Modal.Body>
          </Modal>
        </div>
      </Container>
    </ErrorBoundary>
  );
}

export default PublicCourse;
