import React from 'react';

const Pin = (props) => {
    let styles = {
      top: props.top,
      left: props.left
    };
    return (
        <div className="dot" style={styles}>
          <div className="centraldot"></div>
          <div className="wave"></div>
          <div className="wave2"></div>
        </div>
    );
}

export default Pin;
