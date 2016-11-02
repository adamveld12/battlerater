import React from 'react';
import ReactDOM from 'react-dom';
import VehicleCard from './VehicleCard.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VehicleCard vehicleType="Tanks"
                                country="USA"
                                idx={0}
                                dispatcher={() => ""}
                                vehicleSlot={idx: 0, vehicleInfo: { vehicle_class: "", name: "", br: 1.0, tier: 1.0, premium: true }} />,
                                 div);
});
