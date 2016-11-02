import React, { Component } from 'react';
import { actions } from './AppState.js';

import { Paper, FlatButton, FontIcon } from 'material-ui';
import { Avatar, Chip } from 'material-ui';
import { blueGrey300, blueGrey900, yellow300, yellow900, red300, red900, blue300, indigo900} from 'material-ui/styles/colors';

import VehicleSelector from './VehicleSelector.js';
import  './VehicleCard.css';

const styles = {
  chip: {
    margin: 4,
  }
};

export default class VehicleCard extends Component {
  removeSlot(idx){
    const { dispatcher } = this.props;
    const { removeVehicleSlot } = actions;

    dispatcher(removeVehicleSlot(idx));
  }

  render(){
    console.log(this.props)
    const {
      vehicleSlot: {
        vehicleIdx,
        vehicleInfo: { br, tier, premium, vehicle_class}
      },
      vehicleType, country, idx, dispatcher
    } = this.props;

    return (
      <div className="VehicleCard fade-in" >
        <Paper zDepth={1}>
          <div className="VehicleCard inner">
            <VehicleSelector dispatcher={dispatcher}
                             vehicleType={vehicleType}
                             country={country}
                             idx={idx}
                             selectedVehicleIdx={ (vehicleIdx || 0) } />
            <ul className="VehicleCard attributes">
              <li>
                <Chip backgroundColor={blueGrey300} style={styles.chip} >
                  <Avatar size={24} color={blueGrey300} backgroundColor={blueGrey900}>C</Avatar>
                  { vehicle_class }
                </Chip>
              </li>

              <li className={ premium ? '' : 'hidden' }>
                  <Chip backgroundColor={yellow300} style={styles.chip} >
                    <Avatar size={24} color={yellow300} backgroundColor={yellow900}>P</Avatar>
                      Premium
                  </Chip>
              </li>

              <li>
                <Chip backgroundColor={red300} style={styles.chip} >
                  <Avatar size={24} color={red300} backgroundColor={red900}>BR</Avatar>
                  { br }
                </Chip>
              </li>
              <li>
                <Chip backgroundColor={blue300} style={styles.chip} >
                  <Avatar size={24} color={blue300} backgroundColor={indigo900}>T</Avatar>
                  T{ tier }
                </Chip>
              </li>

            </ul>

            <div className="VehicleCard icons">
              <FlatButton label="Send on Holiday" onClick={() => this.removeSlot(idx)} />
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}
