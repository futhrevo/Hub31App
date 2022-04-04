/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'react-bootstrap';
import { Editor, Transforms } from 'slate';
import { useSlate } from 'slate-react';

import Icon from '../Icon';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};


const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const MarkButton = ({ format, icon, text = '' }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      variant="light"
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon iconStyle="solid" icon={icon} />{text}
    </Button>
  );
};

const BlockButton = ({ format, icon, text = '' }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      variant="light"
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon iconStyle="solid" icon={icon} />{text}
    </Button>
  );
};

export { MarkButton, BlockButton, toggleMark };
