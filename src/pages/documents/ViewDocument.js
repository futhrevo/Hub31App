import PropTypes from 'prop-types';
import { useEffect, useState, lazy } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import { getDocument, } from '../../api/documents';
import Loading from '../../components/Loading';
import { DocContext } from '../../components/documents/context';
import ErrorBoundary from '../ErrorBoundary';
import NotFound from '../NotFound';

import ViewDoc from '../../components/documents/ViewDoc';
const EditDoc = lazy(() => import('../../components/documents/EditDoc'));

const ViewDocument = ({ match, history }) => {
  const [loading, setLoading] = useState(true);
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    async function onLoad() {
      try {
        const res = await getDocument(match.params.link);
        setDoc(res);
      } catch (e) {

      } finally {
        setLoading(false)
      }
    }
    onLoad();
  }, [match.params.link]);

  if (loading) {
    return <Loading />;
  }

  if (!doc?.title) {
    return <NotFound />
  }

  const pathname = match.path;

  const value = {
    state: { doc, basepath: match.path, baseurl: match.url, ...match.params },
    actions: { setDoc }
  }
  return (
    <ErrorBoundary>
      <DocContext.Provider value={value}>
        <Container className="flex-fill my-5">
          <div className="ViewDocument">
            <ErrorBoundary>
              <Switch>
                <Route exact path={pathname} render={(props) => <ViewDoc  {...props} />} />
                <Route exact path={`${pathname}/edit`} render={(props) => <EditDoc {...props} />} />
              </Switch>
            </ErrorBoundary>
          </div>
        </Container>
      </DocContext.Provider>
    </ErrorBoundary>
  )
};

ViewDocument.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

ViewDocument.defaultProps = {
  loading: true,
  doc: {}
}

export default ViewDocument;
