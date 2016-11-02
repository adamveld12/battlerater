import React, { Component } from 'react';
import { MenuItem, SelectField } from 'material-ui';
import { actions } from './AppState.js';

import './VehicleSelector.css';
import vehicles from './vehicles';


export default class VehicleSelector extends Component {
  handleChange(evt, value) {
    const { dispatcher, country, vehicleType, idx } = this.props;
    const vehicleInfo = vehicles[country][vehicleType][value];
    const action = actions.setVehicleSlot(vehicleInfo, value, idx);
    dispatcher(action);
  }

  render(){
    const { vehicleType, country, selectedVehicleIdx } = this.props;

    return (
      <SelectField style={{ fontSize: 15}}
                    value={selectedVehicleIdx || 0}
                    labelStyle={{ textAlign: 'center' }}
                    onChange={this.handleChange.bind(this)}>
        {
          vehicles[country][vehicleType].map((x, vehicleIdx) =>
            (<MenuItem key={vehicleIdx}
                        style={{ fontSize: 12 }}
                        value={vehicleIdx}
                        primaryText={x.name}/>)
          )
        }
      </SelectField>
    );
  }
}
