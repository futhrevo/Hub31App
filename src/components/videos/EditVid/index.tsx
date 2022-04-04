import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { Container, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import VideosEditor from '../VideosEditor';
import Resources from '../../Resources';
import { useVideo } from '../context';
import { RscVid } from "../../../redux/courses/docReducer";
import PageHeader from "../../PageHeader";

const EditVid = ({ match }: { match: any }) => {
  let history = useHistory();
  const { state: { doc, baseurl }, actions: { setDoc } } = useVideo();

  const handleBack = () => {
    history.push(baseurl ? baseurl : '/');
  };

  const onSuccess = (docId: string, values: RscVid) => {
    values.id = docId;
    setDoc && setDoc(values);
    handleBack();
  }

  return (
    <Container className="flex-fill my-5">
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
      <VideosEditor doc={doc} history={history} onSuccess={onSuccess} />
    </Container>
  );
}

EditVid.propTypes = {
  match: PropTypes.object,
};

export default EditVid;
