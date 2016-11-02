import React, { Component } from 'react';

//credit for image: http://erratic-fox.deviantart.com/
import logo from './warthunder.svg';
import GameModeSelector from './GameModeSelector.js';
import VehicleTypeSelector from './VehicleTypeSelector.js';
import CountrySelector from './CountrySelector.js';
import LineupEditor from './LineupEditor.js';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';

import MiniRedux from './miniredux.js'
import { reducers, actions, initialState } from './AppState.js'

const stateContainer = new MiniRedux(initialState, reducers);

class App extends Component {
  componentWillMount(){
    stateContainer.onDispatchComplete((state) => this.setState(state));
  }
  render() {
    const { gameMode, vehicleType, country, vehicleSlots } = stateContainer.dump();
    const dispatcher = stateContainer.dispatcher();

    return (

    <MuiThemeProvider>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>

{
/*

        <GameModeSelector dispatcher={dispatcher}
                          mode={gameMode} />
*/
}
        <CountrySelector dispatcher={dispatcher}
                         country={country} />
{
/*
        <VehicleTypeSelector dispatcher={dispatcher}
                             vehicleType={vehicleType} />
*/
}

      <p>
        Calculate BR and Tier for tanks in Arcade. Support for Simulator/Realistic and Planes coming soon!
      </p>

        <LineupEditor dispatcher={dispatcher}
                      gameMode={gameMode}
                      country={country}
                      vehicleType={vehicleType}
                      vehicleSlots={vehicleSlots} />
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
