import { useState, useEffect, lazy } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
} from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import Loading from '../../components/Loading';
import NotFound from '../NotFound';
import ErrorBoundary from '../ErrorBoundary';
import { getVid } from '../../api/videos';
import { VidContext } from '../../components/videos/context';

import ViewVid from '../../components/videos/ViewVid';
const EditVid = lazy(() => import('../../components/videos/EditVid'));

const ViewVideo = ({ match, history }) => {
  const [loading, setLoading] = useState(true);
  const [doc, setDoc] = useState({ id: '', hash: '', userId: '' });
  const [valid, setValid] = useState(false);

  useEffect(() => {
    async function onLoad() {
      try {
        const res = await getVid(match.params.link);
        setDoc(res);
        if (res && res.link) {
          fetchValidity(res.link);
        }
      } catch (e) {

      } finally {
        setLoading(false)
      }
    }

    function fetchValidity(link) {
      setValid(false);
      fetch(link, {
        method: 'HEAD',
        mode: 'no-cors',
      })
        .then((res) => {
          if (res.status !== 404) {
            setValid(true);
          }
        })
        .catch(() => {
          setValid(false);
        });
    }
    onLoad();
  }, [match.params.link]);


  if (loading) {
    return <Loading />;
  }

  if (!doc.id) {
    return <NotFound />;
  }

  const pathname = match.path;

  const value = {
    state: { doc, valid, basepath: match.path, baseurl: match.url, ...match.params },
    actions: { setDoc }
  }

  return (
    <ErrorBoundary>
      <VidContext.Provider value={value}>
        <Container className="flex-fill my-5">
          <ErrorBoundary>
            <Switch>
              <Route exact path={pathname} render={(props) => <ViewVid  {...props} />} />
              <Route exact path={`${pathname}/edit`} render={(props) => <EditVid {...props} />} />
            </Switch>
          </ErrorBoundary>
        </Container>
      </VidContext.Provider>
    </ErrorBoundary>
  );
}

ViewVideo.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};
ViewVideo.defaultProps = {
  loading: true,
}
export default ViewVideo;

