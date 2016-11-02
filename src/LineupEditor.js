import React, { Component } from 'react';
import { actions } from './AppState.js';
import VehicleCard from './VehicleCard.js';
import BattleRatingCalculator from './BattleRatingCalculator.js';

import { FlatButton } from 'material-ui';

import './LineupEditor.css';

export default class LineupEditor extends Component {
  removeSlot(idx){
    const { dispatcher } = this.props;
    const { removeVehicleSlot } = actions;
    dispatcher(removeVehicleSlot(idx));
  }

  addCrew(){
    const { dispatcher } = this.props;
    const { addVehicleSlot } = actions;
    dispatcher(addVehicleSlot());
  }

  render(){
    const { country, gameMode, vehicleType, vehicleSlots, dispatcher } = this.props;

    return (
      <div className="Lineup">
        <FlatButton label="Add Crew"
                    disabled={vehicleSlots.length === 6}
                    onClick={this.addCrew.bind(this)} />

        <BattleRatingCalculator vehicleSlots={vehicleSlots}
                                vehicleType={vehicleType}
                                country={country}
                                gameMode={gameMode} />

        <ul>
          {
            vehicleSlots.map((slot, idx) => (
              <li key={idx + slot.vehicleInfo.name} className={slot.vehicleInfo.premium ? 'premium_tank' : ''}>
                <VehicleCard vehicleSlot={slot}
                             vehicleType={vehicleType}
                             idx={idx}
                             dispatcher={dispatcher}
                             country={country} />
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}
