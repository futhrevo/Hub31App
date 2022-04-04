import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../../PageHeader';
import urlJoin from '../../../../modules/url-join';
import { usePaper } from '../../context';

const Header = () => {
  let history = useHistory();
  const { state: { paper, baseurl } } = usePaper();

  const handleBack = () => {
    baseurl ? history.push(baseurl) : history.goBack();
  };

  const handleResult = () => {
    const path = baseurl ? urlJoin(baseurl, 'results') : '/';
    history.push(path);
  }

  return (
    <PageHeader title={paper?.title ?? ''} subtitle={'Manual Assesment'} >
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
            onClick={() => handleResult()}
          >
            Results
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </PageHeader>
  );
}

export default Header;
