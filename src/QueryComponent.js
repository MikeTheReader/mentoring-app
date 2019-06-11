import React, { Component } from 'react';
import axios from 'axios';

export default class QueryComponent extends Component {

  constructor() {
    super();
    this.state = {
      inputValue: null,
      itemList: null
    };
  }

  updateInputValue = (evt) => {
    this.setState({
      inputValue: evt.target.value
    });
  }

  buttonClicked = () => {
    axios.get(`http://localhost:3000/Protection-Pieces?Model=${this.state.inputValue}`)
      .then(response => {
        this.setState({ itemList: response.data })
      });
  }

  generateList = () => {
    return this.state.itemList.map(piece => {
      return (
        <div style={ { border: "1px solid blue", padding: "3px" }}>
          <p>{ piece.Manufacturer }</p>
          <p>{ piece["Size/Name"] }</p>
          <p>{ piece.Color }</p>
        </div>
      );
    });
  }

  render() {
    let itemListComponent = <span></span>;
    if (this.state.itemList) {
      itemListComponent = this.generateList();
    }

    return (
      <div>
        <p>Query Component</p>
        <p>
          <input
            style={{'font-size': '16px'}}
            type="text"
            onChange={ this.updateInputValue }>
          </input>
        </p>
        <button onClick={this.buttonClicked}>
          <p style={{'font-size': '16px'}}>Click Here</p>
        </button>
        <div>
          { itemListComponent }
        </div>
      </div>
    );
  }
}