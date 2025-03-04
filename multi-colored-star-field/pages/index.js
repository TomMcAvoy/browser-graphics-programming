import React, { useEffect } from 'react';
import { initializeStarField } from '../src/starField';
import Tardis from '../src/components/Tardis';

const Home = () => {
  useEffect(() => {
    initializeStarField();
  }, []);

  return (
    <div>
      <canvas id="star-field"></canvas>
      <Tardis />
    </div>
  );
};

export default Home;
