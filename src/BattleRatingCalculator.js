import React, { Component } from 'react';
import { actions } from './appstate.js';

class BattleRatingCalculator extends Component {
  render(){
    const { vehicleType, gameMode, vehicleSlots } = this.props;

    const ratings = calculateBattleRating(vehicleType, gameMode, vehicleSlots.map((x) =>
      ({ br: x.vehicleInfo.br, tier: x.vehicleInfo.tier })
    ));

    return ratings ? (
      <div>
        <h2>Battle Rating: { ratings.br }</h2>
        <h2>Tier Range: { ratings.tier }</h2>
      </div>
    ) : (<p>Add Tanks to the lineup to calculate the Battle Rating and Tier for the lineup.</p>);
  }
}

function calculateBattleRating(vehicleType, gameMode, battleRatings) {
  if (!battleRatings || battleRatings.length <= 0){
    return;
  }

  if (vehicleType === 'Tanks'){
    return calculateTankBattleRating(gameMode, battleRatings);
  } else if (vehicleType == 'Planes'){
    return 0;
  }
}

function calculateTankBattleRating(gameMode, battleRatings) {
  if (gameMode === 'Arcade'){
    battleRatings.sort((a, b) => b.tier === a.tier ? b.br - a.br : b.tier - a.tier);
    let maxv = battleRatings[0];
    console.log("battle rating sorted by tier & br", battleRatings, "\nmax br vehicle", maxv);

    let lowerBr = maxv.br - 1;
    let upperBr = maxv.br + 1;

    let lowerTier = maxv.tier - 1;
    let upperTier = maxv.tier + 1;

    let hasAnyLowBRVehicle = battleRatings.filter((x) => x.br === 1.3).length > 0;
    let hasAnyStarterVehicle = battleRatings.filter((x) => x.br === 1.0).length > 0;

    if (lowerTier <= 0)
      lowerTier = 1

    if (hasAnyLowBRVehicle && maxv.tier <= 2)
      lowerBr = 1.3;

    let tierRange = `T${lowerTier} - T${upperTier}`;
    if (maxv.br < 1.3){
      lowerBr = 1.0;
      upperBr = 1.3;
      tierRange = `T1`;
    } else if (maxv.br === 1.3) {
      lowerBr = 1.0;
      upperBr = (maxv.br + 1) - .3;
    } else if (maxv.br === 2.0 && maxv.tier === 1){
      lowerBr = 1.3;
    }

    const brRange = `${lowerBr.toFixed(1)} - ${upperBr.toFixed(1)}`;
    return { br: brRange, tier: tierRange };
  } else if (gameMode === 'Realistic') {

  } else if (gameMode === 'Simulation') {

  }

  return { br: 0, tier: 0 };
}

BattleRatingCalculator.calculateBattleRating = calculateBattleRating;
export default  BattleRatingCalculator
