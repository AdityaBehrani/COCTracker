// src/pages/HomePage.js
import React from 'react';
import { useState } from 'react';
import TextInput from '../components/common/TextInput';
import PlayerTable from '../components/PlayerSearch/PlayerTable';
import { fetchPlayerWithId, postIncrementPlayerLevel, postIncrementPlayerTownhall, postChangePlayerClan, deletePlayerWithId} from '../services/api';


const PlayerEditor = () => {

  const [playerId, setInputValue] = useState('');
  const [newClan, setClanValue] = useState('');
  const [playerData, setPlayerData] = useState(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClanChange = (event) => {
    setClanValue(event.target.value);
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

  const handleLevelIncrementClick = async () => {
    try {
      const data = await postIncrementPlayerLevel(playerId);
      window.alert("Player Level Incremented!");
      handleButtonClick();
    } catch (error) {
      window.alert('Failed to get player');
    }
  };

  const   handleTownHallIncrementClick = async () => {
    try {
      const data = await postIncrementPlayerTownhall(playerId);
      window.alert("Player Townhall Level Incremented!");
      handleButtonClick();
    } catch (error) {
      window.alert('Failed to get player');
    }
  };

  const handleClanButtonClick = async () => {
    try {
      const data = await postChangePlayerClan(playerId, newClan);
      window.alert("Player Clan Chnaged!");
      handleButtonClick();
    } catch (error) {
      window.alert('Issue updating Clan');
    }
  };

  const handlePlayerDeleteClick = async () => {
    try {
      const data = await deletePlayerWithId(playerId);
      window.alert("Player Deleted!");
      handleButtonClick();
    } catch (error) {
      window.alert('Failed to get player');
    }
  };


  return (
    <div className='content-div'>
      <h3>Edit Players using ID!</h3>
        <TextInput value={playerId} onChange={handleChange} />
        <div aria-hidden style={{marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0}}/>
        <button onClick={handleButtonClick}>Get Player</button>
        <div aria-hidden style={{marginTop: 50, marginBottom: 50, marginLeft: 0, marginRight: 0}}/>

        {playerData != null ? <PlayerTable playerData={playerData}/> : null}
        {playerData!= null ? 
        <div>
          <button onClick={handleLevelIncrementClick}>Increment Player Level </button>
          <div aria-hidden style={{marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0}}/>
          <button onClick={handleTownHallIncrementClick}>Increment Player Townhall Level</button>
          <div aria-hidden style={{marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0}}/>
          <TextInput value={newClan} onChange={handleClanChange} />
          <button onClick={handleClanButtonClick}>Update Player Clan</button>

          <div aria-hidden style={{marginTop: 20, marginBottom: 10, marginLeft: 0, marginRight: 0}}/>
          <button onClick={handlePlayerDeleteClick}>Delete Player</button>

        </div>
         : null}
    </div>
  );
};

export default PlayerEditor;