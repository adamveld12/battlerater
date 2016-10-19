import React, { Component } from 'react';
import { actions } from './appstate.js';

import vehicles from './vehicles';


export default class VehicleSelector extends Component {
  handleChange({ target: { value } }) {
    const { dispatcher, country, vehicleType, idx } = this.props;

    const vehicleInfo = vehicles[country][vehicleType][value];
    const action = actions.setVehicleSlot(vehicleInfo, idx, idx);
    dispatcher(action);
  }

  render(){
    const { vehicleType, country, selectedVehicleIdx } = this.props;

    return (
      <select defaultValue={ selectedVehicleIdx || 0 } onChange={this.handleChange.bind(this)}>
        { 
          vehicles[country][vehicleType].map((x, vehicleIdx) =>
            (<option key={vehicleIdx} value={vehicleIdx} >{x.name}</option>)
          )
        }
      </select>
    );
  }
}
