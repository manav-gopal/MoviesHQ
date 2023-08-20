import React from 'react';
import './CircularProgressBar.css';

const CircularProgressBar = ({ percentage, color , widthAndHeight}) => {
  const canvasRef = React.useRef(null);
  const lineWidth = widthAndHeight / 18;
  const wrapperSize = widthAndHeight-widthAndHeight/(lineWidth*3);
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
      context.strokeStyle = 'rgb(32,69,41)';
      context.stroke();

      context.beginPath();
      context.arc(centerX, centerY, radius, circleStart, circleEnd, false);
      context.lineWidth = lineWidth;
      context.strokeStyle = color;
      context.stroke();
    };
    const counter = document.querySelector('.counter');
    counter.style.width = `${widthAndHeight}px`;
    counter.style.height = `${widthAndHeight}px`;
    
    // const canva = document.querySelector('.circularProgressBar');
    // canva.style.width = `${widthAndHeight}px`;
    // canva.style.height = `${widthAndHeight}px`;

    drawArc(percentage);
  }, [percentage, color, widthAndHeight]);

  return (
    <div className="counter">
      <span className="percentage">
        <strong>{Math.round(percentage)}<span>%</span> </strong>
      </span>
      <canvas ref={canvasRef} className="circleProgressCanvas" width={widthAndHeight} height={widthAndHeight}></canvas>
    </div>
  );
};

export default CircularProgressBar;
