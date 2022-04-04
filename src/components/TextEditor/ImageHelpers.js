/* eslint-disable no-restricted-syntax */
/* eslint-disable no-alert */
import React from 'react';
import isUrl from 'is-url';
import imageExtensions from 'image-extensions';
import { Transforms } from 'slate';
import { useEditor } from 'slate-react';
import { Button } from 'react-bootstrap';
import Icon from '../Icon';


const isImageUrl = (url) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split('.').pop();
  return imageExtensions.includes(ext);
};

const insertImage = (editor, url) => {
  const text = { text: '' };
  const image = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image);
};

const withImages = (editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = element => (element.type === 'image' ? true : isVoid(element));

  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split('/');

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result;
            insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};


const InsertImageButton = () => {
  const editor = useEditor();
  return (
    <Button
      variant="light"
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt('Enter the URL of the image:');
        if (!isImageUrl(url)) return;
        insertImage(editor, url);
      }}
    >
      <Icon iconStyle="solid" icon="image" />
    </Button>
  );
};

export { withImages, InsertImageButton };
