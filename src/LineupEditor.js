import React, { Component } from 'react';
import { actions } from './appstate.js';
import VehicleSelector from './VehicleSelector.js';

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
      <div>
        { vehicleSlots.length <= 6 ? (<li key={-1}>
            <button onClick={this.addSlot.bind(this)} >Add Slot</button>
            </li>) : (<br/>) }
        <ul>
          {
            vehicleSlots.map((slot, idx) => (
              <li key={idx + slot.vehicleInfo.name} >
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
