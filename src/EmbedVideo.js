import React from 'react';

const EmbedVideo = ({ videoUrl }) => {
  return (
    <div className="embed-video">
      <video controls data-testid="video">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default EmbedVideo;