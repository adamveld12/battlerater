import React, { Component } from 'react';
import { actions } from './appstate.js';

import './VehicleInfoDisplay.css';



export default class VehicleInfoDisplay extends Component {
  render(){
    const { info: {name, br, tier, premium, vehicle_class}, vehicleType, country } = this.props;

    return (
      <div className="VehicleInfoDisplay" >
        <h2> { name } </h2>
        <p>
          <span>{ vehicle_class }</span><br/>
          <span>Tier: { tier }</span><br/>
          <span>Battle Rating: { br }</span>
        </p>
      </div>
    );
  }
}
