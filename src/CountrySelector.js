import React, { Component } from 'react';
import { actions } from './appstate.js';

const countries = ["USA", "Germany", "USSR", "Britain", "Japan"];

export default class VehicleSelector extends Component {
  handleChange({ target: { value } }){
    const { dispatcher } = this.props;
    const action = actions.changeCountry(value);
    dispatcher(action);
  }

  render(){
    const { country } = this.props;

    return (
      <select defaultValue={ country } onChange={this.handleChange.bind(this)}>
        { countries.map(x => (<option key={x} value={x} >{x}</option>)) }
      </select>
    );
  }
}
