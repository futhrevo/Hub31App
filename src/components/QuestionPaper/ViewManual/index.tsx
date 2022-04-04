import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import API from '@aws-amplify/api';
import { listPendingManualAPI } from '../../../api/sturesults';
import Loading from '../../Loading';
import { fetchPaperSuccess } from '../../../redux/qpaper/actions';
import { QPaper, QPaperResult } from '../../../redux/qpaper/reducer';
import Header from './components/Header';
import { RootState } from '../../../redux/store';
import { QuizOutline } from '../ViewResults/components/QuizSessionResults';
import ResultsTable from './components/ResultsTable';
import { usePaper } from '../context';
import ResultsForm from './components/ResultsForm';

const ViewManual = ({ id, paper }: { id: string, paper: QPaper }) => {
  let dispatch = useDispatch();
  const { courseId } = useParams<{ courseId: string }>();
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [lastkey, setLastKey] = useState(null);
  const [results, setResults] = useState<any>({});
  const [selected, setSelected] = useState<Array<string>>([]);
  const { actions: { openPreview } } = usePaper();

  const { bank, pendingG } = useSelector((state: RootState) => ({
    bank: state.QPaper?.bank ?? {},
    pendingG: state.QPaper?.pendingG ?? 0
  }));

  const loadResults = useCallback(() => {
    try {
      if (paper.questions.length > 0) {
        setFetching(true);
        const promise = listPendingManualAPI(courseId, id, lastkey, id !== paper.id).then(res => {
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
    } catch (error) {

    } finally {
      setLoading(false);
    }
  }, [courseId, dispatch, id, lastkey, paper.id, paper.questions.length, results]);

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
      <Header />
      <ResultsForm results={results} selected={selected} setData={setResults} />
      <ResultsTable outline={outline} results={results} onPreview={openPreview} setData={setResults} onSelect={setSelected} />
      {fetching && <Loading />}
      {lastkey ? (
        <Button size="lg" disabled={loading} onClick={() => loadResults()} block>
          {loading ? 'Loading...' : 'Load More'}
        </Button>
      ) : null}
    </div>
  );
}

export default ViewManual;
