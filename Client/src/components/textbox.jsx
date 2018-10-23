import React from 'react';

const TextBox = (props) => (
  <div>
    <label className="input-label">{props.title}</label>
    <input
      className={props.className}
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder} />
  </div>
);

export default TextBox;
