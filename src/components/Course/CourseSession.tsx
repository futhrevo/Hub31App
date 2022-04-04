import { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { ListGroup } from 'react-bootstrap';
import { listSessionUsers } from '../../api/csessions';
import { CSessionItem } from '../../redux/courses/sessionReducer';
import { CourseInfo } from '../../redux/courses/reducer';
import { getHMSString } from '../../modules/utils';
import Loading from '../Loading';

const CourseSession = ({ session, course }: { session: CSessionItem, course: CourseInfo }) => {
  const [date, setDate] = useState('checking');
  const [doc, setDoc] = useState({ stu: {} });
  const [isFetched, setFetched] = useState(false);
  const alert = useAlert();
  const ended = session.eAt < Date.now();

  useEffect(() => {
    setDoc({ stu: {} });
    setFetched(false);
    async function onLoad() {
      try {
        const res = await listSessionUsers(course.id, session.cAt) || {};
        setDoc(res);
        setFetched(true);
      } catch (error) {
        alert.error("Unable to get Document");
      }
    }
    onLoad();
  }, [alert, course.id, session.cAt]);

  useEffect(() => {
    var timerID = ended ? '' : setInterval(() => tick(), 1000);
    return function cleanup() {
      typeof timerID !== 'string' && clearInterval(timerID);
    };
  });

  function tick() {
    const newstr = getHMSString(session.eAt - Date.now());
    setDate(newstr);
  }
  return (
    <div>
      <h5>{session.title}</h5>
      <div>{session.roll + 1} Students</div>
      {ended ? (<small>{`${(new Date(session.cAt)).toLocaleString()}\u00A0\u00A0→\u00A0\u00A0${(new Date(session.eAt)).toLocaleString()}`}</small>) : (<small>{date} remaining</small>)}
      <div>
        {isFetched ? (<StudentList students={doc.stu} />) : (<Loading />)}
      </div>
    </div>
  );
}

const StudentList = ({ students = {} }: { students: { [x: number]: string } }) => {
  const entries = Object.keys(students);
  return (
    <ListGroup>
      {entries.map((data, index) => (<StudentListItem student={students[index]} key={data} />))}
    </ListGroup>
  );
}

const StudentListItem = ({ student }: { student: string }) => {
  const [id, name] = student.split('+');
  return (
    <ListGroup.Item>{name || id}</ListGroup.Item>
  );
}
export default CourseSession;
