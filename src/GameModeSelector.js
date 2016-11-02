import React, { Component } from 'react';
import { actions } from './AppState.js';


const modes = ["Arcade", "Realistic", "Simulator"];

export default class GameModeSelector extends Component {
  handleChange({ target: { value } }){
    const { dispatcher } = this.props;
    dispatcher(actions.changeGameMode(value));
  }

  render(){
    const { mode } = this.props;

    return (
      <select defaultValue={ mode } onChange={this.handleChange.bind(this)}>
        { modes.map(x => (<option key={x} value={x} >{x}</option>)) }
      </select>
    );
  }
}
