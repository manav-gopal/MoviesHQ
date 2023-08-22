import React, { useEffect, useState } from 'react';
import './style/Spinner.scss'; // Import your Spinner CSS

const Spinner = ({ minDisplayTime = 500, children }) => {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowSpinner(false);
    }, minDisplayTime);

    return () => clearTimeout(timeoutId);
  }, [minDisplayTime]);

  return (
    <div className="spinner-container">
      {showSpinner ? <div className="spinner"></div> : children}
    </div>
  );
};

export default Spinner;
