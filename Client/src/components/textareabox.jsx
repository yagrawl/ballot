import React from 'react';


const TextAreaBox = (props) => (
  <div>
    <label className="input-label">{props.title}</label>
    <textarea
      className="input-box"
      name={props.name}
      rows={props.rows}
      cols = {props.cols}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder} />
  </div>
);

export default TextAreaBox;
