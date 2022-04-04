import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { generatePath } from "react-router";
import PageHeader from '../../../PageHeader';
import urlJoin from '../../../../modules/url-join';
import { usePaper } from '../../context';
import { lpath } from '../../../Course/ChapterMaterial/components/ChapterMaterialList';

const PaperHeader = () => {
  let history = useHistory();
  const { state: { paper, baseurl, courseId, chapId } } = usePaper();

  const handleBack = () => {
    if (courseId && chapId) {
      history.push(generatePath(lpath, { courseId, chapId }));
    } else {
      history.push('/');
    }
  };

  const handleEdit = () => {
    const path = baseurl ? urlJoin(baseurl, 'edit') : '/';
    history.push(path);
  };

  const handleAdd = () => {
    const path = baseurl ? urlJoin(baseurl, 'add') : '/';
    history.push(path);
  };

  const handleResult = () => {
    const path = baseurl ? urlJoin(baseurl, 'results') : '/';
    history.push(path);
  }

  return (
    <PageHeader title={paper?.title ?? ''} subtitle={(paper?.questions?.length ?? 0) + 'Questions'}>
      <ButtonToolbar className="float-right">
        <ButtonGroup size="sm">
          <Button
            variant="outline-primary"
            onClick={() => handleBack()}
          >
            &larr; Back
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => handleAdd()}
          >
            Add Question
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => handleEdit()}
          >
            Edit paper
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => handleResult()}
          >
            Results
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </PageHeader >
  );
}

export default PaperHeader;
