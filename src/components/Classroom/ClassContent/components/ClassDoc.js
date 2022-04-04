import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getStudentDoc } from '../../../../api/documents';
import { readDocAPI } from '../../../../api/sturesults';
import NotFound from '../../../../pages/NotFound';
import { readDocAction } from '../../../../redux/courses/enrollActions';
import Loading from '../../../Loading';
import PageHeader from '../../../PageHeader';

const ClassDoc = ({ courseId, sessId, chap, mat }) => {
  const [doc, setDoc] = useState({});
  const [isFetched, setFetched] = useState(false);
  const [done, setRead] = useState(false);
  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    setDoc({});
    setFetched(false);
    async function onLoad() {
      try {
        const res = await getStudentDoc(courseId, sessId, chap.id, mat.id) || {};
        setDoc(res);
        setFetched(true);
        if (res.result.chaps) {
          setRead(true);
        } else {
          setRead(false);
        }
      } catch (error) {
        alert.error("Unable to get Document");
      }
    }
    onLoad();
  }, [mat.id, chap.id, courseId, sessId, alert]);

  const markread = useCallback(async () => {
    try {
      await readDocAPI(courseId, sessId, chap.id, mat.id);
      const localResult = {
        p: mat.points, d: Date.now(),
      }
      dispatch(readDocAction(courseId, chap.id, mat.id, localResult));
      setRead(true);
    } catch (error) {
      alert.error("Unable to save changes");
    }
  }, [courseId, sessId, chap.id, mat.id, mat.points, dispatch, alert]);

  if (!isFetched) {
    return <Loading />;
  }
  if (Object.keys(doc).length === 0 && doc.constructor === Object) {
    return <NotFound />;
  }

  return doc ? (
    <div className="classdoc m-3">
      <PageHeader title={doc && doc.title} subtitle={chap && chap.desc}>
        <Button
          variant="outline-primary"
          className="float-right"
          disabled={done}
          onClick={markread}
        >
          {done ? '✓ Completed' : 'Mark as Read'}
        </Button>
      </PageHeader>

      <div dangerouslySetInnerHTML={{ __html: doc.body }} />
    </div>
  ) : (
    <NotFound />
  );
}

ClassDoc.propTypes = {
  mat: PropTypes.object,
};

export default ClassDoc;
