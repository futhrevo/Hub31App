import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Row, Alert } from 'react-bootstrap';
import { useAlert } from 'react-alert';

import { getPublicpaper } from '../../../../../api/questionpapers';
import ClassQuizContainer from './components/ClassQuiz';
import Loading from '../../../../Loading';
import NotFound from '../../../../../pages/NotFound';
import PageHeader from '../../../../PageHeader';

const ClassScore = ({ courseId, sessId, chap, mat }) => {
  const [doc, setDoc] = useState({});
  const [isFetched, setFetched] = useState(false);
  const [showQuiz, setQuiz] = useState(false);
  const [error, setError] = useState(null);
  const alert = useAlert();

  useEffect(() => {
    setDoc({});
    setFetched(false);
    async function onLoad() {
      try {
        const res = await getPublicpaper(courseId, chap.id, mat.id) || {};
        setDoc(res);
        setError(null);
      } catch (error) {
        setError(error.response.data?.error?.message ?? "Unable to get Document");
      } finally {
        setFetched(true);
      }
    }
    onLoad();
  }, [mat.id, chap.id, courseId, alert]);

  if (!isFetched) {
    return <Loading />;
  }
  if (error) {
    return <div className="m-3"><Alert variant="info">{error.toString()}</Alert></div>;
  }
  if (showQuiz) {
    return <ClassQuizContainer courseId={courseId} sessId={sessId} chap={chap} mat={mat} />;
  }

  if (Object.keys(doc).length === 0 && doc.constructor === Object) {
    return <div className="m-3"><NotFound /></div>;
  }

  let actiontext = 'Start Quiz';
  let hideAction = false;
  let scoreText = 'Not Started';

  if (Object.prototype.hasOwnProperty.call(doc, 'result')) {
    actiontext = 'Retake Quiz';
    // if score not satisfied with criteria then can retake quiz
    hideAction = doc.result.score >= doc.result.agg;

    // calculate score percentage
    const score = (doc.result.score * 100 / doc.result.agg);
    // If score is 0 and attempt =1 then dont change else change scoreText to score %
    if (doc.result.attempts > 0) {
      scoreText = score + '%';
    }

    // if max attempts then hide action
    if (doc.maxAttempts > 0 && doc.result.attempts >= doc.maxAttempts) {
      hideAction = true;
    }
  }


  if (doc.questions.length === 0) {
    hideAction = true;
  }
  return (
    <div className="classScore m-3">
      <PageHeader title={doc && doc.title} subtitle={chap && chap.desc} sub2={`${doc && doc.questions.length} Questions`}>

      </PageHeader>
      <Row className="d-flex justify-content-center">
        <div className="card showcase">
          <div className="card-contents">
            <Table className="borderless">
              <tbody>
                <tr>
                  <td>Score</td>
                  <td>{scoreText}</td>
                  <td><small className="text-muted">{`of ${doc?.criteria} %`}</small></td>
                </tr>
                <tr>
                  <td>Questions</td>
                  <td>{doc && doc.questions.length}</td>
                </tr>
                <tr>
                  <td>Attempt</td>
                  <td>{(doc?.result?.attempts) || 0}</td>
                  <td><small className="text-muted">{(doc?.maxAttempts ?? 0) > 0 ? `of ${doc?.maxAttempts}` : ''}</small></td>
                </tr>
              </tbody>
            </Table>
            {!hideAction ? (
              <div className="card-footer text-center">
                <Button
                  variant="secondary"
                  className="center-block"
                  onClick={() => setQuiz(true)}
                >
                  {actiontext}
                </Button>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </Row>
    </div>
  );
}

ClassScore.propTypes = {
  mat: PropTypes.object,
};

export default ClassScore;
