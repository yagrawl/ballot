import React from 'react';

const PollWidget = (props) => (
  <div>
    <p className="poll-question-p">{props.question}</p>
  </div>
);

export default PollWidget;
