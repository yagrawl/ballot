import React from 'react';

const PollWidget = (props) => (
  <div>
    <p className="poll-question-p">{props.question}</p>
    <center>
      {
        props.option.map((value, index) => {
          if(value !== 'NULL') {
            return (
              <div>
                <button key={index} onClick={handleOption} type="button" className="poll-option-button">{value}</button>
                <br></br>
              </div>
            )
          }
        })
      }
    </center>
  </div>
);

function handleOption(e) {
  console.log('here on click');
}

export default PollWidget;
