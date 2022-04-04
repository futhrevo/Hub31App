import ErrorBoundary from '../ErrorBoundary';
import { Container, CardColumns } from 'react-bootstrap';
import Enroll from '../../components/Dashboard/Enroll';
import DashCard from '../../components/Dashboard/DashCard';
import PageHeader from '../../components/PageHeader';

const cards = [
  {
    key: 0,
    title: 'Documents',
    method: 'documents.count',
    link: '/documents',
  },
  {
    key: 1,
    title: 'Questions',
    method: 'questions.count',
    link: '/questions',
  },
  {
    key: 2,
    title: 'Question Papers',
    method: 'questionPapers.count',
    link: '/questionpaper',
  },
  {
    key: 3,
    title: 'Videos',
    method: 'videos.count',
    link: '/videos',
  },
  {
    key: 4,
    title: 'Groups',
    method: 'groups.count',
    link: '/videos',
  },
  {
    key: 5,
    title: 'Courses',
    method: 'courses.count',
    link: '/courses',
  },
];
const dashboard = () => (
  <ErrorBoundary>
    <Container className="flex-fill my-5">
      <PageHeader title="Dashboard" />
      <CardColumns className="mt-3">
        {cards.map(({
          title, method, link, key,
        }) => (
          <DashCard key={key} title={title} method={method} link={link} />
        ))}
        <Enroll />
      </CardColumns>
    </Container>
  </ErrorBoundary>
);

export default dashboard;
