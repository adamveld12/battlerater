import React from 'react';
import ReactDOM from 'react-dom';
import VehicleInfoDisplay from './VehicleInfoDisplay.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VehicleInfoDisplay vehicleType="Tanks"
                                      country="USA"
                                      info={{vehicle_class: "", name: "", br: 1.0, tier: 1.0, premium: true}} />, div);
});
