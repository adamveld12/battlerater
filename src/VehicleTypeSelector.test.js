import React from 'react';
import ReactDOM from 'react-dom';
import VehicleTypeSelector from './VehicleTypeSelector.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VehicleTypeSelector />, div);
});
