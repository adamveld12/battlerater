import React from 'react';
import ReactDOM from 'react-dom';
import GameModeSelector from './GameModeSelector.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameModeSelector />, div);
});
