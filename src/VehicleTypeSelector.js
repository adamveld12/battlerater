import React, { Component } from 'react';
import { actions } from './AppState.js';

const vehicleTypes = ["Tanks", "Planes"];

export default class VehicleTypeSelector extends Component {
  handleChange({ target: { value } }){
    const { dispatcher } = this.props;

    const action = actions.changeVehicleType(value);
    dispatcher(action);
  }

  render(){
    const { vehicleType } = this.props;

    return (
      <select defaultValue={ vehicleType } onChange={this.handleChange.bind(this)}>
        { vehicleTypes.map(x => (<option key={x} value={x} >{x}</option>)) }
      </select>
    );
  }
}
