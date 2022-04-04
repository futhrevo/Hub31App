import React from 'react';
import "./styles.scss";

const QuickButton = ({ button, onQuickButtonClicked }) => {
  return (
    <button className="quick-button" onClick={(event) => onQuickButtonClicked(event, button.value)}>
      {button.label}
    </button>
  );
}

export default QuickButton;
