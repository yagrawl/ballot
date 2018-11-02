import React from 'react';
import { Clearfix, MenuItem } from 'react-bootstrap';

const DropDown = (props) => (
  <div className="">
    <Clearfix>
      <ul className="dropdown-menu open">
        <MenuItem>Header</MenuItem>
        <MenuItem>link</MenuItem>
      </ul>
    </Clearfix>
  </div>
);

export default DropDown;
