import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Tag from '../../Tag';
import './styles.scss';

function validateTag(tagName) {
  const regex = /^[a-z0-9.\-_$@*!]{4,20}$/;
  return regex.test(tagName);
}

function sameTag(tags, tagName) {
  let matched = false;
  tags.forEach((tag) => {
    if (tag === tagName) matched = true;
  });
  return matched;
}

const TagsInput = ({ value, maxTagCount, onChange }) => {
  const [errorMsg, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = useState('');

  useEffect(() => {
    setTags(value);
    setError(null);
  }, [value]);


  const addTag = useCallback(() => {
    if (validateTag(tagName)) {
      if (!sameTag(tags, tagName)) {
        const newTags = tags.concat(tagName);
        setTags(newTags);
        setError(null);
        setTagName('');
        onChange(newTags);
      } else {
        setError('Same tag!!!');
      }
    } else {
      setError('Tags can only contain small letters and numbers. No space or special characters please. Min 4 and max 20 chars.',);
    }
  }, [tags, tagName, onChange]);

  const removeTag = useCallback((position) => {
    const newTags = [
      ...tags.slice(0, position),
      ...tags.slice(position + 1, tags.length),
    ];
    setTags(newTags);
    onChange(newTags);
  }, [tags, onChange]);

  function renderTags() {
    return tags.map((tag, i) => (
      <Tag
        name={tag}
        key={tag}
        withRemove
        removeAction={() => {
          removeTag(i);
        }}
      />
    ));
  }

  function renderInput() {
    if (tags.length < maxTagCount) {
      return (
        <div className="inputContainer">
          <input
            className="tagInput"
            placeholder="tag name..."
            value={tagName}
            onChange={(e) => {
              setTagName(e.target.value);
            }}
          />
          <Button
            variant="link"
            className="addButton"
            onClick={() => {
              addTag();
            }}
          >
            <i className="fa fa-plus-circle" />
          </Button>
        </div>
      );
    }

    return null;
  }

  return (
    <div className="tag-container p-3">
      <div className="tagContainer">
        <div className="tag-label">
          <b>Tags :</b>
        </div>
        {renderTags()}
        {renderInput()}
      </div>
      {errorMsg && <div className="errorMsg">{errorMsg}</div>}
    </div>
  );
}

TagsInput.defaultProps = {
  value: [],
  maxTagCount: 3,
  onChange: (tags) => { },
};

TagsInput.propTypes = {
  value: PropTypes.array,
  maxTagCount: PropTypes.number,
  onChange: PropTypes.func,
};

export default TagsInput;
