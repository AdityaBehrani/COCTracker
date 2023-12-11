// src/pages/HomePage.js
import React from 'react';
import { useState } from 'react';
import { postAddPlayer } from '../services/api';
import TextInput from '../components/common/TextInput';
import PlayerTable from '../components/PlayerSearch/PlayerTable';

const PlayerAdder = () => {
  const [playerId, setIdValue] = useState('');
  const [playerUser, setUserValue] = useState('');
  const [playerLevel, setLevelValue] = useState('');
  const [playerTH, setTHValue] = useState('');
  const [playerCountry, setCountryValue] = useState('');
  const [playerClan, setClanValue] = useState(null);

  const handleIdChange = (event) => {
    setIdValue(event.target.value);
  };

  const handleUserChange = (event) => {
    setUserValue(event.target.value);
  };

  const handleLevelChange = (event) => {
    setLevelValue(event.target.value);
  };

  const handleTHChange = (event) => {
    setTHValue(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountryValue(event.target.value);
  };

  const handleClanChange = (event) => {
    setClanValue(event.target.value);
  };

  const handleButtonClick = async () => {
    if (playerId != '' && playerUser != '' && playerLevel != '' && playerTH != '' && playerCountry != '' && playerClan != '') {
        try {
            const data = await postAddPlayer(playerId, playerUser, playerLevel, playerTH, playerClan, playerCountry);
            window.alert('Player Added Successfully!');
          } catch (error) {
            window.alert('Failed to get player');
          }
    }
    else {
        window.alert('Missing information');
    }
  };

  return (
      <div className='content-div'>
          <h3>Add new players!</h3>

          <a>Add player ID</a>
          <TextInput value={playerId} onChange={handleIdChange} />
          <div aria-hidden style={{marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0}}/>

          <a>Add player username</a>
          <TextInput value={playerUser} onChange={handleUserChange} />
          <div aria-hidden style={{marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0}}/>

          <a>Add player level</a>
          <TextInput value={playerLevel} onChange={handleLevelChange} />
          <div aria-hidden style={{marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0}}/>

          <a>Add player townhall level</a>
          <TextInput value={playerTH} onChange={handleTHChange} />
          <div aria-hidden style={{marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0}}/>

          <a>Add player country</a>
          <TextInput value={playerCountry} onChange={handleCountryChange} />
          <div aria-hidden style={{marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0}}/>

          <a>Add player clan</a>
          <TextInput value={playerClan} onChange={handleClanChange} />
          <div aria-hidden style={{marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0}}/>


          <button onClick={handleButtonClick}>Add Player</button>
          <div aria-hidden style={{marginTop: 50, marginBottom: 50, marginLeft: 0, marginRight: 0}}/>
      </div>
  );
};

export default PlayerAdder;