import React from 'react';
import { ListGroup, Badge } from 'react-bootstrap';

const CourseLiveItem = ({ live, active, onClick }) => {
  const cAt = Number(live.attr.split('_')[1]);
  return (
    <ListGroup.Item variant={active ? 'info' : ''} action={active} onClick={onClick}>
      <h6>{live.topic}</h6>
      {`${(new Date(cAt)).toLocaleString()}\u00A0\u00A0→\u00A0\u00A0${active ? '---' : (new Date(live.endedAt)).toLocaleString()}`}
    &nbsp;&nbsp;
      <Badge variant={active ? 'success' : 'dark'}>
        {active ? 'Running' : 'Ended'}
      </Badge>
      {active ? <span className="ml-3">Go to Live</span> : ''}
    </ListGroup.Item>
  );
};

export default CourseLiveItem;
