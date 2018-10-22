import React from 'react';

const DataList = (props) => {
  const data = props.data;
  const listItems = data.map((row) =>
    <tr>
      <td>{row.key}</td>
      <td>{row.value}</td>
    </tr>
  );

  return (
    <table className="data-demo">
      <tr>
        <th>Key</th>
        <th>Value</th>
      </tr>
      {listItems}
    </table>
  );
}

export default DataList;
