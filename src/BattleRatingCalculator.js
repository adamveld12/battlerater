import React, { Component } from 'react';
import { actions } from './AppState.js';

import { Avatar, Chip } from 'material-ui';

import { red300, red900, blue300, indigo900} from 'material-ui/styles/colors';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
};
class BattleRatingCalculator extends Component {
  render(){
    const { vehicleType, gameMode, vehicleSlots } = this.props;

    const ratings = calculateBattleRating(vehicleType, gameMode, vehicleSlots.map((x) =>
      ({ br: x.vehicleInfo.br, tier: x.vehicleInfo.tier })
    ));

    return ratings ? (
      <div style={styles.wrapper}>
        <Chip backgroundColor={red300}
              style={styles.chip} >
            <Avatar size={32} color={red300} backgroundColor={red900}>
              BR
            </Avatar>
            { ratings.br || 0 }
        </Chip>

        <Chip backgroundColor={blue300}
              style={styles.chip} >
            <Avatar size={32} color={blue300} backgroundColor={indigo900}>
             T
            </Avatar>
            { ratings.tier }
        </Chip>
      </div>
    ) : (<p>Add crews to the lineup to calculate the overall Battle Rating and Tier.</p>);
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
    upperTier = upperTier > 5 ? 5 : upperTier;



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
