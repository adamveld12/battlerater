import React from 'react';
import ReactDOM from 'react-dom';
import CountrySelector from './CountrySelector.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CountrySelector country={"USA"} />, div);
});
