import React from 'react';

const DataList = (props) => {
  const data = props.data;
  const listItems = data.map((row) =>
    <li>{row.key}, {row.value}</li>
  );

  return (
    <ul>{listItems}</ul>
  );
}

export default DataList;
