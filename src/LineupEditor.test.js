import React from 'react';
import ReactDOM from 'react-dom';
import LineupEditor from './LineupEditor.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LineupEditor country="USA" vehicleType="Tanks" vehicleSlots={[]} />, div);
});
