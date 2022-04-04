import { useMemo } from 'react';
import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { calcChapterProgress } from '../../../../../modules/Utils/chapter';
import { ChapOutlineItem } from '../../../../../redux/courses/chapterReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import urlJoin from '../../../../../modules/url-join';

const CourseOutlineChapterItemContent = ({ desc, progress }: { desc: string, progress: number }) => {
  return (
    <div className="d-flex justify-content-between">
      {desc}
      <small>{`${progress}%`}</small>
    </div>
  );
}

const CourseOutlineChapterItem = ({ baseUrl, chap, courseId, card }: {
  baseUrl: string,
  chap: ChapOutlineItem,
  courseId: string,
  card: boolean
}) => {
  const { chaps = {} } = useSelector((state: RootState) => state?.Courses[courseId]?.EnCourses ?? {})
  const chapResults = chaps[chap.id];

  const progress = useMemo(() => {
    return calcChapterProgress(chap.mats, chapResults);
  }, [chap.mats, chapResults]);
  return (
    <LinkContainer to={urlJoin(baseUrl, chap.id)} key={chap.id}>
      { card ? (
        <Card.Link className="text-white font-weight-bold">
          <CourseOutlineChapterItemContent desc={chap.desc} progress={progress.ratio} />
        </Card.Link>
      ) : (
        <button
          type="button"
          className="list-group-item list-group-item-action"
        >
          <CourseOutlineChapterItemContent desc={chap.desc} progress={progress.ratio} />
        </button>)}

    </LinkContainer>

  );
}

export default CourseOutlineChapterItem;


