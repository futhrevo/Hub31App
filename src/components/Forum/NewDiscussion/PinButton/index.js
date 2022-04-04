import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
} from 'react-bootstrap';

const PinButton = ({ value, onChange }) => {
  const [newValue, setValue] = useState(false);

  useEffect(() => {
    setValue(value)
  }, [value]);

  const updateValue = useCallback((value) => {
    onChange(value);
    setValue(value);
  }, [onChange]);

  return (
    <div className="pincontainer">
      <div className="pinlabel">Is it a pinned discussion?</div>

      <ButtonToolbar>
        <ToggleButtonGroup
          type="radio"
          name="options"
          defaultValue="false"
          value={newValue}
          onChange={(val) => {
            updateValue(val);
          }}
        >
          <ToggleButton value>YES</ToggleButton>
          <ToggleButton value={false}>NO</ToggleButton>
        </ToggleButtonGroup>
      </ButtonToolbar>
    </div>
  );
}

PinButton.defaultProps = {
  onChange: (val) => { },
  value: false,
};

PinButton.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.bool,
};

export default PinButton;
