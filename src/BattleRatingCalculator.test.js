import React from 'react';
import ReactDOM from 'react-dom';
import BattleRatingCalculator from './BattleRatingCalculator.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BattleRatingCalculator vehicleSlots={[]} 
                                          gameMode="Arcade" 
                                          vehicleType="Tanks" 
                                          country="USA" />, div);
});
