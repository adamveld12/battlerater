import React, { Component } from 'react';
import logo from './logo.svg';
import GameModeSelector from './GameModeSelector.js';
import VehicleTypeSelector from './VehicleTypeSelector.js';
import CountrySelector from './CountrySelector.js';
import LineupEditor from './LineupEditor.js';
import BattleRatingCalculator from './BattleRatingCalculator.js';

import './App.css';

import MiniRedux from './miniredux.js'
import { reducers, actions, initialState } from './appstate.js'

const stateContainer = new MiniRedux(initialState, reducers);

class App extends Component {
  componentWillMount(){
    stateContainer.onDispatchComplete((state) => this.setState(state));
  }
  render() {
    const { gameMode, vehicleType, country, vehicleSlots } = stateContainer.dump();
    const dispatcher = stateContainer.dispatcher();

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>

        <GameModeSelector dispatcher={dispatcher} mode={gameMode} />
        <CountrySelector dispatcher={dispatcher} country={country} />
        <VehicleTypeSelector dispatcher={dispatcher} vehicleType={vehicleType} />

        <BattleRatingCalculator vehicleType={vehicleType} country={country} mode={gameMode} />

        <LineupEditor dispatcher={dispatcher} country={country} vehicleType={vehicleType} vehicleSlots={vehicleSlots} />
      </div>
    );
  }
}

export default App;
