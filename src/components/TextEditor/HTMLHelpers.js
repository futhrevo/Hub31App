/* eslint-disable prefer-destructuring */
import escapeHtml from 'escape-html';
import { jsx } from 'slate-hyperscript';
import { Transforms, Text } from 'slate';
import isUrl from 'is-url';

const ELEMENT_TAGS = {
  A: el => ({ type: 'link', url: el.getAttribute('href') }),
  QUOTE: () => ({ type: 'quote' }),
  BLOCKQUOTE: () => ({ type: 'block-quote' }),
  H1: () => ({ type: 'heading-one' }),
  H2: () => ({ type: 'heading-two' }),
  H3: () => ({ type: 'heading-three' }),
  H4: () => ({ type: 'heading-four' }),
  H5: () => ({ type: 'heading-five' }),
  H6: () => ({ type: 'heading-six' }),
  LI: () => ({ type: 'list-item' }),
  OL: () => ({ type: 'numbered-list' }),
  P: () => ({ type: 'paragraph' }),
  PRE: () => ({ type: 'code' }),
  UL: () => ({ type: 'bulleted-list' }),
};

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
};

const IMAGE_TAG = {
  IMG: el => ({ type: 'image', url: el.getAttribute('src') }),
};

const deserialize = (el, parentType) => {
  // console.log(parentType);
  // console.log(el.nodeType, el.nodeName, el.textContent.length, el.textContent == null);
  if (el.nodeType === 3) {
    if (['BODY', 'DIV'].indexOf(parentType) > -1) {
      const attrs = ELEMENT_TAGS.P(el);
      return jsx('element', attrs, el.textContent);
    }
    return el.textContent || ' ';
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === 'BR') {
    return null;
  }

  const { nodeName } = el;
  let parent = el;

  if (
    nodeName === 'PRE' &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === 'CODE'
  ) {
    parent = el.childNodes[0];
  }
  const children = Array.from(parent.childNodes)
    .map(nd => deserialize(nd, parent.nodeName))
    .flat();

  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children);
  }

  if (IMAGE_TAG[nodeName]) {
    const attrs = IMAGE_TAG[nodeName](el);
    // handle empty children
    if (children.length === 0) {
      return {
        type: 'image', url: el.getAttribute('src'), children: [{ text: ' ' }],
      };
    }
    return jsx('element', attrs, children);
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el);
    if (children.length === 0) {
      return jsx('element', attrs, [{ text: '' }]);
    }
    return jsx('element', attrs, children);
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el);
    return children.map(child => jsx('text', attrs, child));
  }

  return children;
};

const serializeNode = (leaf) => {
  // console.log(leaf);
  if (Text.isText(leaf)) {
    let children = escapeHtml(leaf.text);
    if (leaf.bold) {
      children = `<strong>${children}</strong>`;
    }

    if (leaf.code) {
      children = `<code>${children}</code>`;
    }

    if (leaf.italic) {
      children = `<em>${children}</em>`;
    }

    if (leaf.underlined) {
      children = `<u>${children}</u>`;
    }

    if (leaf.strikethrough) {
      children = `<del>${children}</del>`;
    }

    if (leaf.subscript) {
      children = `<sub>${children}</sub>`;
    }

    if (leaf.superscript) {
      children = `<sup>${children}</sup>`;
    }
    return children;
  }

  const children = leaf.children.map(n => serializeNode(n)).join('');
  switch (leaf.type) {
    case 'block-quote':
    case 'quote':
      return `<blockquote><p>${children}</p></blockquote>`;
    case 'paragraph':
      return `<p>${children}</p>`;
    case 'link':
      return `<a href="${escapeHtml(leaf.url)}">${children}</a>`;
    case 'bulleted-list':
      return `<ul>${children}</ul>`;
    case 'heading-one':
      return `<h1>${children}</h1>`;
    case 'heading-two':
      return `<h2>${children}</h2>`;
    case 'heading-three':
      return `<h3>${children}</h3>`;
    case 'heading-four':
      return `<h4>${children}</h4>`;
    case 'heading-five':
      return `<h5>${children}</h5>`;
    case 'heading-six':
      return `<h6>${children}</h6>`;
    case 'list-item':
      return `<li>${children}</li>`;
    case 'numbered-list':
      return `<ol>${children}</ol>`;
    case 'image':
      if (!isUrl(leaf.url)) {
        return;
      }
      return `<img class="image-slate" src="${escapeHtml(leaf.url)}">${children}</img>`;
    default:
      return children;
  }
};

const serialize = nodes => nodes.map(node => serializeNode(node)).join('');

const withHtml = (editor) => {
  const { insertData, isInline, isVoid } = editor;

  editor.isInline = element => (element.type === 'link' ? true : isInline(element));

  editor.isVoid = element => (element.type === 'image' ? true : isVoid(element));

  editor.insertData = (data) => {
    const html = data.getData('text/html');

    if (html) {
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      const fragment = deserialize(parsed.body);
      Transforms.insertFragment(editor, fragment);
      return;
    }

    insertData(data);
  };
  return editor;
};

export { deserialize, serialize, withHtml };
