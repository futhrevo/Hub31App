import React from 'react';
import { useSelector } from 'react-redux';

const QuickButtons = ({ onQuickButtonClicked }) => {
  const buttons = useSelector((state) => state.IOT.chat.quickButtons.quickButtons);

  const getComponentToRender = (button) => {
    const ComponentToRender = button.component;
    return (
      <ComponentToRender
        onQuickButtonClicked={onQuickButtonClicked}
        button={button}
      />
    );
  }

  if (!buttons.length) return null;

  return (
    <div className="quick-buttons-container">
      <ul className="quick-buttons">
        {buttons.map((button, index) =>
          <li className="quick-list-button" key={`${button.label}-${index}`}>
            {getComponentToRender(button)}
          </li>
        )
        }
      </ul>
    </div>
  );
}

export default QuickButtons;
