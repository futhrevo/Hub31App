import { useEffect, useState, useCallback } from 'react';
import { useParams } from "react-router-dom";
import API from '@aws-amplify/api';
import { Alert, Button } from 'react-bootstrap';

import { getClassResultsAPI } from '../../../../../api/sturesults';
import Loading from '../../../../Loading';
import ResultsTable from './components/ResultsTable';
import { EnCoursesType } from '../../../../../redux/courses/enrollReducer';
import { MaterialType } from '../../../../../redux/courses/materialReducer';

export type ResultObj = { [x: string]: EnCoursesType };

export type OutlineType = {
  chapId: string;
  desc: string;
  mats: Array<MaterialType>;
}
export type OutlineArray = Array<OutlineType>;

const SessionResult = ({ courseId }: { courseId: string }) => {
  const { sessId } = useParams<{ sessId: string }>();
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [lastkey, setLastKey] = useState(null);
  const [outline, setOutline] = useState<OutlineArray>([]);
  const [results, setResults] = useState<ResultObj>({});

  const loadResults = useCallback(() => {
    if (sessId !== '') {
      try {
        setFetching(true);
        const promise = getClassResultsAPI(courseId, sessId, lastkey).then((res: { outline: any, result: { items: Array<EnCoursesType>, lastItem: any } }) => {
          console.log(res);
          // get chapter array with mats
          if (res.outline.length > 0) {
            setOutline(res.outline);
          }
          if (res.result.items.length > 0) {
            const newRes = { ...results };
            res.result.items.forEach((el: EnCoursesType) => {
              if (el.stuId) newRes[el.stuId] = el;
            })
            setResults(newRes);
          }
          setLastKey(res.result.lastItem);
          setFetching(false);
        });
        return promise
      } catch (e) {

      } finally {
        setLoading(false)
      }
    }
  }, [courseId, sessId, lastkey, results]);

  useEffect(() => {
    let promise = loadResults();
    return () => { if (promise) API.cancel(promise) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  if (sessId === '') {
    return <Alert variant="info">Select a Session first</Alert>;
  }

  if (loading) {
    return <Loading />;
  }

  if (outline.length === 0) {
    return <Alert variant="info">Nothing to Show here</Alert>;
  }

  return (
    <div>
      <ResultsTable outline={outline} results={results} />
      { fetching && <Loading />}
      { lastkey ? (
        <Button size="lg" disabled={loading} onClick={() => loadResults()} block>
          {loading ? 'Loading...' : 'Load More'}
        </Button>
      ) : null}
    </div>
  );
}

export default SessionResult;
