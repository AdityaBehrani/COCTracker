// src/pages/HomePage.js
import React from 'react';
import { useState } from 'react';
import { fetchPlayerWithId } from '../services/api';
import TextInput from '../components/common/TextInput';
import PlayerTable from '../components/PlayerSearch/PlayerTable';

const PlayerViewer = () => {
  const [playerId, setInputValue] = useState('');
  const [playerData, setPlayerData] = useState(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const data = await fetchPlayerWithId(playerId);
      setPlayerData(data.player_data);
    } catch (error) {
      window.alert('Failed to get player');
      setPlayerData(null)
    }
  };

  return (
      <div className='content-div'>
          <h3>Search Players using ID!</h3>
          <TextInput value={playerId} onChange={handleChange} />
          <div aria-hidden style={{marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0}}/>
          <button onClick={handleButtonClick}>Get Player</button>
          <div aria-hidden style={{marginTop: 50, marginBottom: 50, marginLeft: 0, marginRight: 0}}/>
          {playerData != null ? <PlayerTable playerData={playerData}/> : null}
      </div>
  );
};

export default PlayerViewer;