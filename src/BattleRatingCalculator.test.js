import React from 'react';
import ReactDOM from 'react-dom';
import BattleRatingCalculator from './BattleRatingCalculator.js';

let calculateBattleRating = BattleRatingCalculator.calculateBattleRating;


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BattleRatingCalculator vehicleSlots={[]}
                                          gameMode="Arcade"
                                          vehicleType="Tanks"
                                          country="USA" />, div);
});

it('calculates Battle Rating for arcade', () => {
  let result = calculateBattleRating('Tanks', 'Arcade', [{ br: 1.0, tier: 1 }, { br: 1.0, tier: 1 }, { br: 1.0, tier: 1 }]);
  expect(result.br).toBe('1.0 - 1.3');
  expect(result.tier).toBe('T1');

  result = calculateBattleRating('Tanks', 'Arcade', [{ br: 1.0, tier: 1 }, { br: 1.0, tier: 1 }, { br: 1.3, tier: 1 }]);
  expect(result.br).toBe('1.0 - 2.0');
  expect(result.tier).toBe('T1 - T2');

  result = calculateBattleRating('Tanks', 'Arcade', [{ br: 2.0, tier: 1 }, { br: 2.0, tier: 1 }, { br: 2.0, tier: 1 }]);
  expect(result.br).toBe('1.3 - 3.0');
  expect(result.tier).toBe('T1 - T2');

  result = calculateBattleRating('Tanks', 'Arcade', [{ br: 1.3, tier: 1 }, { br: 2.0, tier: 1 }, { br: 2.0, tier: 2.0 }]);
  expect(result.br).toBe('1.3 - 3.0');
  expect(result.tier).toBe('T1 - T3');

  result = calculateBattleRating('Tanks', 'Arcade', [{ br: 3.0, tier: 2 }, { br: 2.7, tier: 2 }, { br: 2.3, tier: 2 }]);
  expect(result.br).toBe('2.0 - 4.0');
  expect(result.tier).toBe('T1 - T3');

  result = calculateBattleRating('Tanks', 'Arcade', [{ br: 4.7, tier: 2 }, { br: 4.7, tier: 3 }, { br: 4.7, tier: 4 }]);
  expect(result.br).toBe('3.7 - 5.7');
  expect(result.tier).toBe('T3 - T5');

  result = calculateBattleRating('Tanks', 'Arcade', [{ br: 6.7, tier: 4}, { br: 6.7, tier: 4 }, { br: 6.7, tier: 4 }]);
  expect(result.br).toBe('5.7 - 7.7');
  expect(result.tier).toBe('T3 - T5');

  result = calculateBattleRating('Tanks', 'Arcade', [{ br: 6.7, tier: 4}, { br: 6.7, tier: 4 }, { br: 6.7, tier: 5 }]);
  expect(result.br).toBe('5.7 - 7.7');
  expect(result.tier).toBe('T4 - T5');

  result = calculateBattleRating('Tanks', 'Arcade', [{ br: 7.0, tier: 4 }, { br: 7.0, tier: 4 }, { br: 6.7, tier: 4 }]);
  expect(result.br).toBe('6.0 - 8.0');
  expect(result.tier).toBe('T4 - T5');

  result = calculateBattleRating('Tanks', 'Arcade', [{ br: 7.0, tier: 4 }, { br: 7.0, tier: 5 }, { br: 6.7, tier: 4 }]);
  expect(result.br).toBe('6.0 - 8.0');
  expect(result.tier).toBe('T4 - T5');
});
