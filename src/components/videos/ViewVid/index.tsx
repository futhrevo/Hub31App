import { useCallback, Fragment, useState } from 'react';
import {
  ButtonToolbar,
  ButtonGroup,
  Button,
  Alert
} from 'react-bootstrap';
import { generatePath } from "react-router";
import { useAlert } from 'react-alert';
import { useHistory } from "react-router-dom";
import PageHeader from "../../PageHeader";
import { useVideo } from "../context";
import urlJoin from '../../../modules/url-join';
import { deleteVid } from '../../../api/videos';
import { lpath } from '../../Course/ChapterMaterial/components/ChapterMaterialList';

const ViewVid = () => {
  let history = useHistory();
  const alert = useAlert();
  const [success, setSuccess] = useState("");
  const { state: { doc, valid, baseurl, courseId, chapId }, actions: { setDoc } } = useVideo();

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

  const handleRemove = async () => {
    if (window.confirm('Are you sure? This is permanent!')) {
      try {
        if (doc?.id) {
          await deleteVid(doc.id);
          alert.success("Video Archived!")
          handleBack();
        } else {
          throw new Error()
        }
      } catch (e) {
        alert.error("Unable to delete Video");
      }
    }
  };

  // https://stackoverflow.com/questions/23048550/how-to-copy-a-divs-content-to-clipboard-without-flash
  const copyToClipboard = useCallback((e) => {
    if (!doc) {
      return alert.info("Cannot find video");
    }
    if (!doc.id) {
      return alert.info('Cannot find the video configuration');
    }
    // Create a new textarea element and give it id='temp_element'
    const textarea = document.createElement('textarea');
    textarea.id = 'temp_element';
    // Optional step to make less noise on the page, if any!
    textarea.style.height = '0';
    // Now append it to your page somewhere, I chose <body>
    document.body.appendChild(textarea);
    // Give our textarea a value of whatever inside the div of id=containerid
    textarea.value = `{ "user": "${doc.userId}", "video": "${doc.id}", "hash": "${doc.hash}"}`;
    // Now copy whatever inside the textarea to clipboard
    const selector = document.querySelector('#temp_element');
    // @ts-ignore
    selector.select();
    document.execCommand('copy');
    // Remove the textarea
    document.body.removeChild(textarea);
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    setSuccess('Copied!');
  }, [alert, doc]);

  return (
    <div>
      <PageHeader title={doc?.title ?? 'Video'}>
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
              onClick={() => handleEdit()}
            >
              Edit
            </Button>
            <Button
              onClick={() => handleRemove()}
              variant="danger"
            >
              Archive
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </PageHeader>
      {/* Logical shortcut for only displaying the
            button if the copy command exists */
        document.queryCommandSupported('copy') && (
          <div>
            <Button
              variant="outline-secondary"
              className="m-3"
              onClick={e => copyToClipboard(e)}
            >
              Copy Config
            </Button>
            {success}
          </div>
        )}

      {doc &&
        doc.link && (
          <Fragment>
            <h6>Video Link</h6>
            <Alert variant="dark">
              {doc.link}
              {valid && <i className="fas fa-check text-success ml-3" />}
            </Alert>
          </Fragment>
        )}
      {doc &&
        doc.poster && (
          <Fragment>
            <h6>Video Poster</h6>
            <Alert variant="dark">{doc.poster}</Alert>
          </Fragment>
        )}
      <h6>Description</h6>
      <div dangerouslySetInnerHTML={{ __html: doc?.body ?? '' }} />
    </div>
  );
}

export default ViewVid;
