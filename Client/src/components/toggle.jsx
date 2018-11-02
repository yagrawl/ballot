import React from 'react';

const Toggle = (props) => (
  <label className="switch">
    <input type="checkbox" value={props.isChecked} onChange={props.handleChange} />
    <div className="slider"></div>
  </label>
);

export default Toggle;
