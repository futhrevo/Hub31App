import { Button, ButtonGroup, ButtonToolbar, ToggleButton } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { generatePath } from "react-router";
import { useAlert } from 'react-alert';
import { updatePublic } from '../../../api/documents';
import PageHeader from "../../PageHeader";
import { useDocument } from '../context';
import urlJoin from '../../../modules/url-join';
import { lpath } from '../../Course/ChapterMaterial/components/ChapterMaterialList';

const ViewDoc = () => {
  let history = useHistory();
  const alert = useAlert();
  const { state: { doc, baseurl, courseId, chapId }, actions: { setDoc } } = useDocument();

  const handleBack = () => {
    if (courseId && chapId) {
      history.push(generatePath(lpath, { courseId, chapId }));
    } else {
      history.push('/');
    }
  };

  const handleEdit = () => {
    history.push(baseurl ? urlJoin(baseurl, 'edit') : '/');
  };

  const handlePublic = async (pub: boolean) => {
    try {
      if (doc) {
        await updatePublic(doc.id, pub);
        setDoc && setDoc({ ...doc, public: pub });
        alert.success("Document edited!")
      } else {
        throw new Error();
      }
    } catch (e) {
      alert.error("Unable to Edit Document");
    }
  };

  return (
    <div>
      <PageHeader title={doc?.title ?? 'Document'}>
        <ButtonToolbar className="float-right">
          <ButtonGroup size="sm">
            <Button
              variant="outline-primary"
              onClick={() => handleBack()}
            >
              {'← Back'}
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => handleEdit()}
            >
              Edit
            </Button>

          </ButtonGroup>
          <ButtonGroup toggle className="ml-3">
            <ToggleButton
              type="checkbox"
              checked={doc?.public}
              value="1"
              onChange={(e) => handlePublic(e.currentTarget.checked)}
              variant="outline-secondary"
            >
              Public
            </ToggleButton>
          </ButtonGroup>
        </ButtonToolbar>
      </PageHeader>
      <div dangerouslySetInnerHTML={{ __html: doc?.body ?? '' }} />
    </div>
  );
}

export default ViewDoc;
