import { useEffect, useState } from 'react';
import { Alert, Col, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from "react-router-dom";
import urlJoin from '../../../modules/url-join';
import { getHMSString } from '../../../modules/utils';
import { QPaper } from '../../../redux/qpaper/reducer';
import { RootState } from '../../../redux/store';
import { usePaper } from '../context';
import PaperHeader from './components/PaperHeader';
import RenderListItem from './components/RenderListItem';

const GetTileInfo = ({ label, value }: { label: string, value: string | number }) => (
  <Col className="d-flex flex-column mr-3">
    <small className="font-weight-bold text-center">{label}</small>
    <small className="font-weight-light text-center">{value}</small>
  </Col>
);

const ViewPaper = ({ paper }: { paper: QPaper }) => {
  let history = useHistory();
  const [date, setDate] = useState('checking');
  const { state: { baseurl }, actions: { openPreview } } = usePaper();
  const { pendingG } = useSelector((state: RootState) => ({
    pendingG: state.QPaper?.pendingG ?? 0
  }));

  const ended = paper.eAt < Date.now();

  useEffect(() => {
    var timerID = ended ? '' : setInterval(() => tick(), 1000);
    return function cleanup() {
      typeof timerID !== 'string' && clearInterval(timerID);
    };
  });

  function tick() {
    const newstr = getHMSString(paper.eAt - Date.now());
    setDate(newstr);
  }

  const onClickEditQuestion = (qid: string) => {
    history.push(baseurl ? urlJoin(baseurl, `${qid}/edit`) : '/');
  }

  return (
    <div>
      <PaperHeader />
      <Row className='mb-3'>
        <GetTileInfo label="Used Questions" value={paper?.questions?.length ?? 0} />
        <GetTileInfo label="Unused Questions" value={paper?.unused?.length ?? 0} />
        <GetTileInfo label="Assessment" value={(paper?.assay ?? 1) ? 'AUTO' : 'MANUAL'} />
        <GetTileInfo label="Pass Criteria" value={`${paper?.criteria ?? 100}%`} />
        <GetTileInfo label="Max Attempts" value={(paper?.maxAttempts ?? 0) === 0 ? 'UNLIMITED' : paper?.maxAttempts} />
        <GetTileInfo label="Public" value={(paper?.public ?? false).toString().toUpperCase()} />
        <GetTileInfo label="Duration" value={(paper?.dur ?? 0) === 0 ? 'UNLIMITED' : `${paper?.dur} Minutes`} />
        <GetTileInfo label="Validity" value={(paper?.eAt ?? 0) === 0 ? 'UNLIMITED' : `${date} remanining`} />
      </Row>
      {pendingG > 0 && (<Alert variant="info">Assesment Pending for {pendingG} students.
        <LinkContainer to={baseurl ? urlJoin(baseurl, 'manual') : '/'}>
          <Alert.Link>Assess Now</Alert.Link>
        </LinkContainer>
      </Alert>)}
      <ListGroup>
        {paper && paper.questions && paper.questions.map((qid: string) => (
          <RenderListItem
            key={qid}
            id={qid}
            onSelect={(doc: any) => openPreview && openPreview(doc)}
            onClickEdit={onClickEditQuestion}
            edit
          />
        ))}
      </ListGroup>
    </div>
  );
}

export default ViewPaper;
