import React, { Component } from 'react';
import { actions } from './appstate.js';
import VehicleSelector from './VehicleSelector.js';
import VehicleInfoDisplay from './VehicleInfoDisplay.js';

import './LineupEditor.css';

export default class LineupEditor extends Component {
  removeSlot(idx){
    const { dispatcher } = this.props;
    const { removeVehicleSlot } = actions;
    console.log("removing", idx, "(", this.props.vehicleSlots[idx],")");
    dispatcher(removeVehicleSlot(idx));
  }
  addSlot(){
    const { dispatcher } = this.props;
    const { addVehicleSlot } = actions;
    dispatcher(addVehicleSlot());
  }

  render(){
    const { country, vehicleType, vehicleSlots, dispatcher } = this.props;

    return (
      <div className="Lineup">
        { vehicleSlots.length <= 6 ? (<button onClick={this.addSlot.bind(this)} >Add Slot</button>) : (<br/>) }
        <ul>
          {
            vehicleSlots.map((slot, idx) => (
              <li key={idx + slot.vehicleInfo.name} className={slot.vehicleInfo.premium ? 'premium_tank' : ''}>
                <VehicleInfoDisplay info={slot.vehicleInfo}
                                    vehicleType={vehicleType}
                                    country={country} />
                <VehicleSelector dispatcher={dispatcher}
                                 vehicleType={vehicleType}
                                 country={country}
                                 idx={idx}
                                 selectedVehicleIdx={ (slot.vehicleIdx || 0) } />
                <button onClick={() => this.removeSlot(idx)}>Remove</button>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}
