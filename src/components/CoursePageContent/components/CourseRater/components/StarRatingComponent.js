// https://github.com/voronianski/react-star-rating-component/blob/master/src/StarRatingComponent.jsx
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const StarRatingComponent = (props) => {
  const [value, setValue] = useState(props.value);
  const { editing, className, onStarClick, onStarHover, onStarHoverOut, renderStarIcon, renderStarIconHalf, name,
    starCount, starColor, emptyStarColor } = props;

  useEffect(() => {
    if (props.value !== null && (props.value !== value)) {
      setValue(props.value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  const onChange = useCallback((inputValue) => {
    if (!editing) {
      return;
    }
    // do not update internal state based on input value if prop passed
    if (props.value != null) {
      return;
    }
    setValue(inputValue);
  }, [editing, props.value]);


  const onStarClickCallback = useCallback((index, value, name, e) => {
    e.stopPropagation();
    if (!editing) {
      return;
    }
    onStarClick && onStarClick(index, value, name, e);
  }, [editing, onStarClick]);

  const onStarHoverCallback = useCallback((index, value, name, e) => {
    e.stopPropagation();
    if (!editing) {
      return;
    }
    onStarHover && onStarHover(index, value, name, e);
  }, [editing, onStarHover]);

  const onStarHoverOutCallback = useCallback((index, value, name, e) => {
    e.stopPropagation();
    if (!editing) {
      return;
    }
    onStarHoverOut && onStarHoverOut(index, value, name, e);
  }, [editing, onStarHoverOut]);

  const renderIcon = useCallback((index, value, name, id) => {
    if (
      typeof renderStarIconHalf === 'function' &&
      Math.ceil(value) === index &&
      value % 1 !== 0
    ) {
      return renderStarIconHalf(index, value, name, id);
    }

    if (typeof renderStarIcon === 'function') {
      return renderStarIcon(index, value, name, id);
    }

    return <i key={`icon_${id}`} style={{ fontStyle: 'normal' }}>&#9733;</i>;
  }, [renderStarIcon, renderStarIconHalf]);

  function renderStars() {

    const starStyles = (i, value) => ({
      float: 'right',
      cursor: editing ? 'pointer' : 'default',
      color: value >= i ? starColor : emptyStarColor
    });
    const radioStyles = {
      display: 'none',
      position: 'absolute',
      marginLeft: -9999
    };

    // populate stars
    let starNodes = [];

    for (let i = starCount; i > 0; i--) {
      const id = `${name}_${i}`;
      const starNodeInput = (
        <input
          key={`input_${id}`}
          style={radioStyles}
          className="dv-star-rating-input"
          type="radio"
          name={name}
          id={id}
          value={i}
          checked={value === i}
          onChange={e => onChange(i, name)}
        />
      );
      const starNodeLabel = (
        <label
          key={`label_${id}`}
          style={starStyles(i, value)}
          className={'dv-star-rating-star ' + (value >= i ? 'dv-star-rating-full-star' : 'dv-star-rating-empty-star')}
          htmlFor={id}
          onClick={e => onStarClickCallback(i, value, name, e)}
          onMouseOver={e => onStarHoverCallback(i, value, name, e)}
          onMouseLeave={e => onStarHoverOutCallback(i, value, name, e)}
        >
          {renderIcon(i, value, name, id)}
        </label>
      );

      starNodes.push(starNodeInput);
      starNodes.push(starNodeLabel);
    }

    return starNodes.length ? starNodes : null;
  }

  const classes = cx('dv-star-rating', {
    'dv-star-rating-non-editable': !editing
  }, className);

  return (
    <div style={{ display: 'inline-block', position: 'relative' }} className={classes}>
      {renderStars()}
    </div>
  );
}

StarRatingComponent.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number,
  editing: PropTypes.bool,
  starCount: PropTypes.number,
  starColor: PropTypes.string,
  onStarClick: PropTypes.func,
  onStarHover: PropTypes.func,
  onStarHoverOut: PropTypes.func,
  renderStarIcon: PropTypes.func,
  renderStarIconHalf: PropTypes.func
}

StarRatingComponent.defaultProps = {
  starCount: 5,
  editing: true,
  starColor: '#ffb400',
  emptyStarColor: '#333'
}

export default StarRatingComponent;
