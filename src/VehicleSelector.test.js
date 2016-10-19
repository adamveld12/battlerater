import React from 'react';
import ReactDOM from 'react-dom';
import VehicleSelector from './VehicleSelector.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VehicleSelector vehicleType="Tanks" country="USA" vehicleIdx={0} />, div);
});
