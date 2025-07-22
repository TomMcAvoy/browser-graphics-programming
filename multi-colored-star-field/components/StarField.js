"use client";

import React, { useEffect, useRef } from 'react';
import { initializeStarField } from '../src/starField';

const StarField = () => {
  const canvasRef = useRef(null);
  const initRef = useRef(false);

  useEffect(() => {
    // Prevent double initialization in development mode
    if (initRef.current) return;
    initRef.current = true;

    // Wait for next tick to ensure canvas is mounted
    const timer = setTimeout(() => {
      if (canvasRef.current) {
        initializeStarField();
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      // Cleanup would go here if needed
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      id="star-field" 
      className="fixed inset-0 w-full h-full z-0"
      style={{ background: 'black' }}
    />
  );
};

export default StarField;
