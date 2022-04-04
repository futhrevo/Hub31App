import React, { useState } from 'react';
import { Button, Accordion, Card, InputGroup, Form, ListGroup, ButtonGroup, Badge } from 'react-bootstrap';
import { useAlert } from 'react-alert';

import Icon from '../Icon';
import { getPreUrl, delPreUrl } from '../../api/materials';
import { getStringBytes, getDocType } from '../../modules/utils';
import Config from '../../modules/config';

const selectFile = (e, setFile) => {
  var files = e.target.files;
  if (files.length === 0) return;
  if (files[0].size > 10485760) { return alert("File size exceeds 10MB limit"); }
  console.log(files[0]);
  setFile(files[0]);
}

const uploadFileToS3 = (presignedPostData, file) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    Object.keys(presignedPostData.fields).forEach(key => {
      formData.append(key, presignedPostData.fields[key]);
    });

    // Actual file has to be appended last.
    formData.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", presignedPostData.url, true);
    xhr.send(formData);
    xhr.onload = function () {
      this.status === 204 ? resolve() : reject(this.responseText);
    };
  });
};


const ResourceItem = ({ item, ondel, onCopy, onView }) => {
  return (
    <ListGroup.Item>{item.file}<Badge variant="light" className="ml-1">{`${item.size}`}</Badge>
      <ButtonGroup size="sm" className="float-right">
        <Button variant="light" onClick={e => onCopy(e, item.file)}><Icon icon="copy" /></Button>
        <Button variant="light" onClick={() => onView(item.file)}><Icon icon="eye" /></Button>
        <Button variant="light" onClick={ondel}><Icon icon="trash-alt" className="text-danger" /></Button>
      </ButtonGroup></ListGroup.Item>
  );
}

const Resources = ({ doc }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setUploading] = useState(false);
  const [resources, setResources] = useState(doc.resources || []);

  const filesize = (file && file.name && getStringBytes(file.size)) || '';
  const baseUrl = `${Config.apiGateway.dataUrl}/${doc.userId}/${doc.id}`;

  const alert = useAlert();

  const uploadFile = async () => {
    setUploading(true);
    // get presigned url
    try {
      const { postData, key } = await getPreUrl(doc.id, getDocType(doc), file.name, file.type, filesize);
      await uploadFileToS3(postData, file);
      setResources([{ size: filesize, type: file.type, file: key }, ...resources])
      setUploading(false);
      setFile(null);
    } catch (e) {
      alert.error('Error Uploading');
      setUploading(false);
    }
  }

  const deleteFile = async (index) => {
    if (window.confirm('Are you sure? This is permanent!')) {
      try {
        const key = resources[index].file;
        await delPreUrl(doc.id, getDocType(doc), key, index);
        const newResources = [...resources];
        newResources.splice(index, 1);
        setResources(newResources);
        alert.error('Resource deleted');
      } catch (e) {

      }
    }
  }

  // https://stackoverflow.com/questions/23048550/how-to-copy-a-divs-content-to-clipboard-without-flash
  const copyToClipboard = function (e, key) {
    if (!doc.id) {
      return alert.error('Cannot find the document');
    }
    // Create a new textarea element and give it id='temp_element'
    const textarea = document.createElement('textarea');
    textarea.id = 'temp_element';
    // Optional step to make less noise on the page, if any!
    textarea.style.height = 0;
    // Now append it to your page somewhere, I chose <body>
    document.body.appendChild(textarea);
    // Give our textarea a value of whatever inside the div of id=containerid
    textarea.value = `${baseUrl}/${key}`;
    // Now copy whatever inside the textarea to clipboard
    const selector = document.querySelector('#temp_element');
    selector.select();
    document.execCommand('copy');
    // Remove the textarea
    document.body.removeChild(textarea);
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
  }

  const viewUrl = (key) => {
    window.open(`${baseUrl}/${key}`, '_blank');
  }

  return (
    <Accordion>
      <Card className="shadow mb-5">
        <Accordion.Toggle as={Card.Header} eventKey="0" className="cursor-pointer">
          Resources <Icon icon="chevron-down" iconStyle='solid' className="ml-3 text-primary" />
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <InputGroup className="mb-3">
              <Form.File
                id="custom-file"
                disabled={isUploading}
                label={(file && file.name && `(${filesize}) ${file.name}`) || 'Max file size 10 MB'}
                onChange={e => selectFile(e, setFile)}
                custom
              />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  onClick={!isUploading ? uploadFile : null}
                  disabled={isUploading}>
                  {isUploading ? 'uploading...' : 'Upload'}</Button>
              </InputGroup.Append>
            </InputGroup>
            <ListGroup variant="flush">
              {resources.map((el, ind) => (
                <ResourceItem key={el.file + ind} item={el} ondel={() => deleteFile(ind)} onCopy={copyToClipboard} onView={viewUrl} />
              ))}
            </ListGroup>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default Resources;
