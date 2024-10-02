import React from 'react';
import ReactPlayer from 'react-player'

function Youtube() {
  return (
    <div>
      <ReactPlayer 
      className="absolute top-0 left-0"
      width="100%"
      height="100%"
      playsinline
      url={"https://www.youtube.com/watch?v=xBWjpraDJMU"}/>
    </div>
  );
}

export default Youtube;
