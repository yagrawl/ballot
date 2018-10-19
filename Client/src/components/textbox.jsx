import React from 'react';

const TextBox = (props) => (
  <div>
    <label className="input-label">{props.title}</label>
    <input
      className="input-box"
      name={props.name}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder} />
  </div>
);

export default TextBox;
