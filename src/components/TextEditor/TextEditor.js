/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import isHotkey from 'is-hotkey';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import {
  Slate,
  Editable,
  withReact,
} from 'slate-react';
import { ButtonToolbar } from 'react-bootstrap';
import { withImages, InsertImageButton } from './ImageHelpers';
import { withLinks, LinkButton } from './LinkHelpers';
import { MarkButton, BlockButton, toggleMark } from './BlockMarkHelpers';
import { deserialize, serialize, withHtml } from './HTMLHelpers';
import ErrorBoundary from '../../pages/ErrorBoundary';
import './TextEditor.scss';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const TextEditor = (props) => {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    if (props.html.length > 0) {
      setValue(LoadHTML(props.html));
    }
  }, []); // run Only once
  useEffect(() => {
    // TODO: https://aravindballa.com/writings/non-blocking-ui-react/
    const change = serialize(value);
    props.onChange(change);
  }, [value]);
  const renderElement = useCallback(r => <Element {...r} />, []);
  const renderLeaf = useCallback(r => <Leaf {...r} />, []);
  const editor = useMemo(
    () => withHtml(withReact(withImages(withLinks(withHistory(createEditor()))))),
    [],
  );
  return (
    <ErrorBoundary>
      <Slate
        editor={editor}
        value={value}
        onChange={val => setValue(val)}
      >
        <ButtonToolbar className="bg-light sticky-top">
          <MarkButton format="bold" icon="bold" />
          <MarkButton format="italic" icon="italic" />
          <MarkButton format="underlined" icon="underline" />
          <MarkButton format="code" icon="code" />
          <MarkButton format="strikethrough" icon="strikethrough" />
          <MarkButton format="subscript" icon="subscript" />
          <MarkButton format="superscript" icon="superscript" />
          <BlockButton format="heading-one" icon="heading" text="1" />
          <BlockButton format="heading-two" icon="heading" text="2" />
          <BlockButton format="block-quote" icon="quote-right" />
          <BlockButton format="numbered-list" icon="list-ol" />
          <BlockButton format="bulleted-list" icon="list-ul" />
          <InsertImageButton />
          <LinkButton />
        </ButtonToolbar>
        <div className="shadow p-3">
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder={props.placeholder}
            spellCheck
            autoFocus
            onKeyDown={(event) => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              }
            }}
          />
        </div>
      </Slate>
    </ErrorBoundary>
  );
};


const Element = (props) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    default:
      return <p {...attributes}>{children || ' '}</p>;
    case 'quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'code':
      return (
        <pre>
          <code {...attributes}>{children}</code>
        </pre>
      );
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'heading-three':
      return <h3 {...attributes}>{children}</h3>;
    case 'heading-four':
      return <h4 {...attributes}>{children}</h4>;
    case 'heading-five':
      return <h5 {...attributes}>{children}</h5>;
    case 'heading-six':
      return <h6 {...attributes}>{children}</h6>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'link':
      return (
        <a target="_blank" rel="noopener noreferrer" href={element.url} {...attributes}>
          {children}
        </a>
      );
    case 'image':
      return <ImageElement {...props} />;
  }
};


const ImageElement = ({ attributes, children, element }) => {
  return (
    <div {...attributes}>
      {children}
      <img
        src={element.url}
        className="image-slate"
        alt=""
      />
    </div>
  );
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underlined) {
    children = <u>{children}</u>;
  }

  if (leaf.strikethrough) {
    children = <del>{children}</del>;
  }

  if (leaf.subscript) {
    children = <sub>{children}</sub>;
  }

  if (leaf.superscript) {
    children = <sup>{children}</sup>;
  }
  return <span {...attributes}>{children}</span>;
};

const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich text', bold: true },
      { text: '. ' },
    ],
  },
];

const LoadHTML = (html) => {
  const document = new DOMParser().parseFromString(html, 'text/html');
  const docBody = document.body;
  const nodes = deserialize(docBody, document.nodeName); // parent type
  // console.log(nodes);
  return nodes;
};

TextEditor.defaultProps = {
  html: '<p> </p>',
  placeholder: 'Enter some text ...',
};

export default TextEditor;
