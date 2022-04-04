import React from 'react';
/**
 * Tags to blocks.
 *
 * @type {Object}
 */

const BLOCK_TAGS = {
  p: 'paragraph',
  li: 'list-item',
  ul: 'bulleted-list',
  ol: 'numbered-list',
  blockquote: 'block-quote',
  pre: 'code',
  h1: 'heading-one',
  h2: 'heading-two',
  h3: 'heading-three',
  h4: 'heading-four',
  h5: 'heading-five',
  h6: 'heading-six',
};

/**
 * Tags to marks.
 *
 * @type {Object}
 */

const MARK_TAGS = {
  strong: 'bold',
  em: 'italic',
  u: 'underline',
  s: 'strikethrough',
  code: 'code',
  sub: 'subscript',
  sup: 'superscript',
};

/**
 * Serializer rules.
 *
 * @type {Array}
 */
const HTMLRULES = [
  {
    deserialize(el, next) {
      const block = BLOCK_TAGS[el.tagName.toLowerCase()];
      if (block) {
        return {
          object: 'block',
          type: block,
          nodes: next(el.childNodes),
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === 'block') {
        // eslint-disable-next-line default-case
        switch (obj.type) {
          case 'paragraph':
            return <p className={obj.data.get('className')}>{children}</p>;
          case 'block-quote':
            return <blockquote>{children}</blockquote>;
          case 'code':
            return (
              <pre>
                <code>{children}</code>
              </pre>
            );
          case 'bulleted-list':
            return <ul>{children}</ul>;
          case 'heading-one':
            return <h1>{children}</h1>;
          case 'heading-two':
            return <h2>{children}</h2>;
          case 'heading-three':
            return <h3>{children}</h3>;
          case 'heading-four':
            return <h4>{children}</h4>;
          case 'heading-five':
            return <h5>{children}</h5>;
          case 'heading-six':
            return <h6>{children}</h6>;
          case 'list-item':
            return <li>{children}</li>;
          case 'numbered-list':
            return <ol>{children}</ol>;
          case 'image':
            return <img className="image-slate" alt="" src={obj.data.get('src')} />;
        }
      }
    },
  },
  {
    deserialize(el, next) {
      const mark = MARK_TAGS[el.tagName.toLowerCase()];

      if (mark) {
        return {
          object: 'mark',
          type: mark,
          nodes: next(el.childNodes),
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === 'mark') {
        // eslint-disable-next-line default-case
        switch (obj.type) {
          case 'bold':
            return <strong>{children}</strong>;
          case 'code':
            return <code>{children}</code>;
          case 'italic':
            return <em>{children}</em>;
          case 'underlined':
            return <u>{children}</u>;
          case 'strikethrough':
            return <s>{children}</s>;
          case 'subscript':
            return <sub>{children}</sub>;
          case 'superscript':
            return <sup>{children}</sup>;
        }
      }
    },
  },
  {
    // Special case for code blocks, which need to grab the nested childNodes.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() === 'pre') {
        const code = el.childNodes[0];
        const childNodes = code && code.tagName.toLowerCase() === 'code'
          ? code.childNodes
          : el.childNodes;

        return {
          object: 'block',
          type: 'code',
          nodes: next(childNodes),
        };
      }
    },
  },
  {
    // Special case for images, to grab their src.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() === 'img') {
        return {
          object: 'block',
          type: 'image',
          nodes: next(el.childNodes),
          data: {
            src: el.getAttribute('src'),
          },
        };
      }
    },
  },
  {
    // Special case for links, to grab their href.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() === 'a') {
        return {
          object: 'inline',
          type: 'link',
          nodes: next(el.childNodes),
          data: {
            href: el.getAttribute('href'),
          },
        };
      }
    },
  },
];

export default HTMLRULES;
