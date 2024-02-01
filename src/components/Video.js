import React from 'react';
import ReactPlayer from 'react-player';
import './Video.css'; // Create this CSS file for styling

const Video = () => {
  return (
    <div className="background-video-container">
      <ReactPlayer
        url="https://www.youtube.com/live/7R-jM6-OC1A?si=TQ5wUS3gWyatm9fw"
        playing={true}
        loop={true}
        muted={true}
        width="100%"
        height="100%"
        className="background-video"
      />
    </div>
  );
};

export default Video;
