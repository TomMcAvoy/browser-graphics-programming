import React, { useEffect } from 'react';
import { initializeStarField } from '../src/starField';

const Home = () => {
  useEffect(() => {
    initializeStarField();
  }, []);

  return (
    <div>
      <canvas id="star-field"></canvas>
    </div>
  );
};

export default Home;
