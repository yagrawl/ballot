import React, {Component} from 'react';
import ReactTransitionGroup, {CSSTransitionGroup} from 'react-transition-group';

import TextAreaBox from '../components/textareabox';

class PollDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: {
        question: "",
        options: []
      },
      currentcolor: [
				"#531CB3",
				"#7149EE",
				"#B754FF",
				"#ED4FEF",
				"#ED49AB",
				"#ED4FEF",
				"#B754FF",
				"#7149EE"
			],
      content_add: "add +",
			width: 100,
			myItems: [],
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

  handleNext = (e) => {
    e.preventDefault()

    this.props.returnValues(this.state);
    this.props.nextStep();
  }

  handleQuestionChange(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        details: {
          ...prevState.poll,
          question: value
        }
      })
    );
  }

  handleFocus(event) {
		this.setState({ content_add: "" });
	}

	handleChange(event) {
		const usr_input = event.target.value;
		this.setState({ content_add: usr_input });
	}

	handleKeypress(event) {
		if (event.key == "Enter") {
			var newArray = this.state.myItems;
			var currentcontent = this.state.content_add.trim();
			if (!currentcontent) {
				return;
			}

			var currentWidth = this.helperspan.offsetWidth;
			newArray.push({
				content: currentcontent,
				id: ++this.lastId,
				itemWidth: currentWidth + 2
			});
			this.setState({
				myItems: newArray,
				content_add: "",
			});
		}
	}

	handleBlur(event) {
		this.setState({ content_add: "add +" });
	}

	handleClick(event) {
		const idToRemove = Number(event.target.dataset["item"]);
		const newArray = this.state.myItems.filter((listitem) => {return listitem.id !== idToRemove});
		this.setState({ myItems: newArray });
	}



	componentDidUpdate(prevProps, prevState) {
		if (prevState.content_add != this.state.content_add) {
			console.log('did update, content:', this.helperspan.textContent, 'width', this.helperspan.offsetWidth);
			const helperWidth = this.helperspan.offsetWidth;
			this.setState({ width: Math.max(50, helperWidth + 1) });
		}
	}

	makeAddedList() {

		const elements =  this.state.myItems.map((listitem, index) => (
			<li
				key={listitem.id}
				onClick={this.handleClick}
				data-item={listitem.id}
				style={{
					backgroundColor: this.state.currentcolor[
						index % this.state.currentcolor.length
					],
					width: listitem.itemWidth
				}}
        className={"option-li"}
			>
				{listitem.content}
			</li>
		));
		return elements

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
        />

        <div className="option-div">

  				{/* <CSSTransitionGroup
  					transitionName="item-transition"
  					transitionEnterTimeout={500}
  					transitionLeaveTimeout={210}
  				>

  				</CSSTransitionGroup> */}
          {this.makeAddedList()}

    			<input
    					id="add"
    					type="text"
    					name="initvalue"
    					autoComplete="off"
    				  maxLength="70"
              className="option-input"
    					onFocus={this.handleFocus}
    					onChange={this.handleChange}
    					onKeyPress={this.handleKeypress}
    					onBlur={this.handleBlur}
    					value={this.state.content_add}
    					style={{ width: this.state.width }}
    				/>

  				<span id="helperspan" ref={el => (this.helperspan = el)}>
  					{this.state.content_add}
  				</span>

  			</div>

        <button className="button-black button-black-transparent"
          onClick={this.handleNext}>Next</button>
      </div>
    );
  }
}

export default PollDetails;
