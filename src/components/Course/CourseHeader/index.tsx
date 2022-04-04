
import { History } from 'history';
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useCourse } from '../ViewCourse/context';
import PageHeader from '../../PageHeader';

const handleBack = (history: History<unknown>) => {
  history.push('/courses');
};

const CourseHeader = () => {
  let history = useHistory();
  const { state: { course, edit }, actions: { toggleEdit } } = useCourse();
  return (
    <PageHeader title={course?.title.replace(/ &&& /, ' - ') ?? 'Course'}>
      <ButtonToolbar className="float-right">
        <ButtonGroup size="sm">
          <Button
            variant="outline-primary"
            onClick={() => handleBack(history)}
          >
            &larr; Courses List
          </Button>
          {toggleEdit && (<Button
            variant={edit ? 'warning' : 'outline-primary'}
            onClick={() => toggleEdit(!edit)}
          >
            {edit ? 'Cancel Edit' : 'Edit'}
          </Button>)}

        </ButtonGroup>
      </ButtonToolbar>
    </PageHeader>
  );
}

export default CourseHeader;
