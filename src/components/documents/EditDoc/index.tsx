import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import { Button, ButtonGroup, ButtonToolbar, Container } from 'react-bootstrap';
import DocumentEditor from './components/DocumentEditor';
import Resources from '../../Resources';
import { useDocument } from '../context';
import { RscDoc } from '../../../redux/courses/docReducer';
import PageHeader from '../../PageHeader';

const EditDoc = ({ match }: { match: any }) => {
  let history = useHistory();
  const { state: { doc, baseurl }, actions: { setDoc } } = useDocument();

  const handleBack = () => {
    history.push(baseurl ? baseurl : '/');
  };

  const onSuccess = (docId: string, values: RscDoc) => {
    values.id = docId;
    setDoc && setDoc(values);
    handleBack();
  }

  return (
    <Container className="flex-fill my-5">
      <div className="EditDocument">
        <PageHeader title="Editing">
          <ButtonToolbar className="float-right">
            <ButtonGroup size="sm">
              <Button
                variant="danger"
                onClick={() => handleBack()}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </PageHeader>
        <Resources doc={doc} />
        <DocumentEditor doc={doc} history={history} onSuccess={onSuccess} />
      </div>
    </Container>
  )
};

EditDoc.propTypes = {
  match: PropTypes.object,
};


export default EditDoc;
