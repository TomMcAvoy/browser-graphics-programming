import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { initializeStarField } from './starField';
import Tardis from './components/Tardis';
import { initializeClarify, login, logout, getUserProfile } from './clarifyIntegration';

document.addEventListener('DOMContentLoaded', () => {
  initializeStarField();
  initializeClarify();
  const root = document.createElement('div');
  document.body.appendChild(root);
  ReactDOM.render(<Tardis />, root);
});
