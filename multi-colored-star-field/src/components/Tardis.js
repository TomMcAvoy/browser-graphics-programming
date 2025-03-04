import React from 'react';
import './Tardis.css';

const Tardis = () => {
  return (
    <img
      src="/tardis.gif" // Ensure the path to the GIF file is correct
      alt="TARDIS"
      id="tardis-gif"
      className="tardis"
    />
  );
};

export default Tardis;
