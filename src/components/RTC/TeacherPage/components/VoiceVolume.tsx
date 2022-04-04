import React from 'react';

const VoiceVolume = ({ volume }: { volume: number }) => {
  return (
    <div className="volume-container">
      {volume}
    </div>
  );
}

export default VoiceVolume;
