import React, { useState, useEffect } from 'react';

const LoadingAnimation = ({ countdown }) => {
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    // Update the rotation angle based on the countdown
    const newAngle = (1 - countdown / 30) * 360;
    setRotationAngle(newAngle);
  }, [countdown]);

  // Inline styles for dynamic animation with smooth transition
  const loaderStyles = {
    marginLeft:"7px",
    background: `conic-gradient(#000 ${rotationAngle}deg, #2cc16f ${rotationAngle}deg)`,
    borderRadius: '100%',
    height: '15px',
    width: '15px',
    transition: 'background 1s linear', // Smooth and continuous transition
  };

  return (
    <div className="" style={loaderStyles}></div>
  );
};

export default LoadingAnimation;
