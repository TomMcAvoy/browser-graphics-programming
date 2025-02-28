"use client";

import React, { useEffect } from 'react';
import { initializeStarField } from '../src/starField';

const StarField = () => {
  useEffect(() => {
    initializeStarField();
  }, []);

  return <canvas id="star-field"></canvas>;
};

export default StarField;
