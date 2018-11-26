import React, {Component} from 'react';

import TextAreaBox from '../components/textareabox';

class PollDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: {
        question: "",
        options: []
      },
      input: "add option",
      flag: 0,
      question_flag: 0,
    }

    this.helpers = {
      width: 100
    }

    this.lastId = -1;

    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeypress = this.handleKeypress.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.helperspan = null;
  }

  setMinimum(flag, question_flag) {
    if(flag && question_flag) {
      return (
        <p className="error-msg">Minimum of 2 options and Question is required.</p>
      )
    }
    if(flag) {
      return (
        <p className="error-msg">Minimum of 2 options required.</p>
      )
    } if(question_flag) {
      return (
        <p className="error-msg">Question is required.</p>
      )
    }
  }

  handleNext = (e) => {
    e.preventDefault()
    if(this.state.details.options.length < 2 && this.state.details.question.length === 0) {
      this.setState({ question_flag: 1 });
      this.setState({ flag: 1 });
      return;
    }

    if(this.state.details.options.length < 2) {
       this.setState({ flag: 1 });
       return;
    }

    if(this.state.details.question.length === 0) {
      this.setState({ question_flag: 1 });
      return;
    }

    this.props.returnValues(this.state);
    this.props.nextStep();
  }

  handleQuestionChange(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        details: {
          ...prevState.details,
          question: value
        }
      })
    );
  }

  handleFocus(event) {
		this.setState({ input: "" });
	}

	handleChange(event) {
		const usr_input = event.target.value;
		this.setState({ input: usr_input });
	}

	handleKeypress(event) {
		if (event.key === "Enter") {
			var newArray = this.state.details.options;
			var currentcontent = this.state.input.trim();
			if (!currentcontent) {
				return;
			}

			newArray.push({
				content: currentcontent,
				id: ++this.lastId + 1,
			});
			this.setState({
				options: newArray,
				input: "",
			});
		}
	}

	handleBlur(event) {
		this.setState({ input: "add option" });
	}

	handleClick(event) {
		const idToRemove = Number(event.target.dataset["item"]);
		const newArray = this.state.details.options.filter((listitem) => {
      return listitem.id !== idToRemove
    });

		this.setState(
      prevState => ({
        details: {
          ...prevState.details,
          options: newArray
        }
      })
    );
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.input !== this.state.input) {
			const helperWidth = this.helperspan.offsetWidth;
      this.helpers.width = Math.max(50, helperWidth + 1);
		}
	}

	makeAddedList() {
		let elements =  this.state.details.options.map((listitem, index) => (
			<li
				key={listitem.id}
				onClick={this.handleClick}
				data-item={listitem.id}
				style={{
					backgroundColor: "#389BC2",
					width: listitem.itemWidth
				}}
        className={"option-li"}
			>
				{listitem.content}
			</li>
		));
		return elements
	}

  getInputBox() {
    if(this.state.details.options.length >= 4) {
      return (
        <p className="error-msg">Maximum of 4 options supported.</p>
      )
    } else {
      return (
        <input
            id="add"
            type="text"
            name="initvalue"
            autoComplete="off"
            maxLength="70"
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            onKeyPress={this.handleKeypress}
            onBlur={this.handleBlur}
            value={this.state.input}
            className={"input-box input-box-option"}
          />
      )
    }
  }

  render() {
    return (
      <div>
        <TextAreaBox
          title={"Question"}
          placeholder={"Type your question"}
          rows={"2"}
          name={"question"}
          handleChange={this.handleQuestionChange}
          value={this.state.details.question}
          required
        />

        <div className="option-div">
          <p className="input-label input-label-option">Options</p>
          {this.makeAddedList()}
          <div className="reduced-margin-top"></div>

          {this.getInputBox()}

  				<span id="helperspan" ref={el => (this.helperspan = el)}>
  					{this.state.input}
  				</span>

  			</div>
        {this.setMinimum(this.state.flag, this.state.question_flag)}
        <div className="divider"></div>
        <button className="button-black button-black-transparent"
          onClick={this.handleNext}>Next</button>
      </div>
    );
  }
}

export default PollDetails;
