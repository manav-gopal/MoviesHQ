"use client";
import React, { useEffect, useState } from "react";
import "@/styles/components/ui/Spinner.scss";

const Spinner = ({

  minDisplayTime = 500,
  children,
}: {
  minDisplayTime?: number;
  children: React.ReactNode;
}) => {
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
