import React from 'react';
import "./styles.scss";

const Badge = ({ badge }) => {
  return badge > 0 ? <span className="rcw-badge">{badge}</span> : null;
}

export default Badge;
