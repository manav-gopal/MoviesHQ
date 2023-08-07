import React from 'react';
import './CircularProgressBar.css';

const CircularProgressBar = ({ percentage, color }) => {
  const canvasRef = React.useRef(null);
  const wrapperSize = 30;
  const lineWidth = 3;
  const radius = (wrapperSize - lineWidth) / 2;
  const centerX = wrapperSize / 2;
  const centerY = wrapperSize / 2;

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const drawArc = (newPercentage) => {
      const circleStart = 1.5 * Math.PI;
      const circleEnd = circleStart + (newPercentage / 50) * Math.PI;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.arc(centerX, centerY, radius, circleStart, 4 * Math.PI, false);
      context.lineWidth = lineWidth;
      context.strokeStyle = 'rgb(57,57,57)';
      context.stroke();

      context.beginPath();
      context.arc(centerX, centerY, radius, circleStart, circleEnd, false);
      context.lineWidth = lineWidth;
      context.strokeStyle = color;
      context.stroke();
    };

    drawArc(percentage);
  }, [percentage, color]);

  return (
    <div className="counter">
      <span className="percentage">
        <strong>{Math.round(percentage)}<span>%</span> </strong>
      </span>
      <canvas ref={canvasRef} className="circleProgressCanvas"></canvas>
    </div>
  );
};

export default CircularProgressBar;
