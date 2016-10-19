import React, { Component } from 'react';
import { actions } from './appstate.js';


export default class BattleRatingCalculator extends Component {
  render(){
    const { vehicleType, gameMode, vehicleSlots } = this.props;

    const br = calculateBattleRating(vehicleType, gameMode, vehicleSlots);
    const tierRange = calculateTierRange(vehicleType, gameMode, vehicleSlots);

    return (
      <div>
        <h2>Battle Rating: { br }</h2>
        <h2>Tier Range: { tierRange }</h2>
      </div>
    );
  }
}

function calculateBattleRating(vehicleType, gameMode, vehicleSlots) {
  return 0;
}

function calculateTierRange(vehicleType, gameMode, vehicleSlots){
  return 1.0;
}
