import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';
import API from '@aws-amplify/api';
import { useParams } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import { listQuizResAPI } from '../../../../../api/sturesults';
import { fetchPaperSuccess } from '../../../../../redux/qpaper/actions';
import { QPaper, QPaperResult, Question } from '../../../../../redux/qpaper/reducer';
import Loading from '../../../../Loading';
import { RootState } from '../../../../../redux/store';
import ResultsTable from './components/ResultsTable';
import { usePaper } from '../../../context';
import urlJoin from '../../../../../modules/url-join';

export interface QuizOutline extends Omit<QPaper, 'questions'> {
  questions: Array<Question>;
  agg: number;
}

const QuizSessionResults = ({ id, paper }: { id: string, paper: QPaper }) => {
  let dispatch = useDispatch();
  const { sessId, courseId } = useParams<{ sessId: string, courseId: string }>();
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [lastkey, setLastKey] = useState(null);
  const [results, setResults] = useState<{ [x: string]: QPaperResult }>({});
  const { state: { baseurl }, actions: { openPreview } } = usePaper();

  const { bank, pendingG } = useSelector((state: RootState) => ({
    bank: state.QPaper?.bank ?? {},
    pendingG: state.QPaper?.pendingG ?? 0
  }));

  const loadResults = useCallback(() => {
    try {
      if (paper.questions.length > 0) {
        setFetching(true);
        const promise = listQuizResAPI(courseId, sessId, id, lastkey, id !== paper.id).then(res => {
          if (res && res.paper) {
            dispatch(fetchPaperSuccess(id, res));
          }
          if (res && res.result.items.length > 0) {
            const newRes = { ...results };
            res.result.items.forEach((el: QPaperResult) => {
              if (el.stuId) newRes[el.stuId] = el;
            })
            setResults(newRes);
          }
          setLastKey(res.result.lastItem);
          setFetching(false);
        });
        return promise;
      }
      setFetching(false);
      return;
    } catch (error) {

    } finally {
      setLoading(false);
    }
  }, [courseId, dispatch, id, lastkey, paper.id, paper.questions.length, results, sessId]);

  useEffect(() => {
    let promise = loadResults();
    return () => { if (promise) API.cancel(promise) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const outline = useMemo(() => {
    const newPaper: QuizOutline = { ...paper, agg: 0, questions: [] }
    // copy questions into paper
    let agg = 0;
    newPaper.questions = paper.questions.map((el) => {
      const ques = bank[el];
      agg = ques.marks.reduce((a: number, b: number) => a + b, agg);
      return ques;
    });
    newPaper.agg = agg;
    return newPaper;
  }, [bank, paper]);

  if (paper.questions.length === 0) {
    return <Alert variant="info">No Questions yet</Alert>
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {pendingG > 0 && (<Alert variant="info">Assesment Pending for {pendingG} students.
        <LinkContainer to={baseurl ? urlJoin(baseurl, 'manual') : '/'}>
          <Alert.Link>Assess Now</Alert.Link>
        </LinkContainer>
      </Alert>)}
      <ResultsTable outline={outline} results={results} onPreview={openPreview} />
      {fetching && <Loading />}
      {lastkey ? (
        <Button size="lg" disabled={loading} onClick={() => loadResults()} block>
          {loading ? 'Loading...' : 'Load More'}
        </Button>
      ) : null}
    </div>
  );
}

export default QuizSessionResults;
