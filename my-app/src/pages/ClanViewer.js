// src/pages/HomePage.js
import React from 'react';
import { useState } from 'react';
import { fetchClanWithId } from '../services/api';
import TextInput from '../components/common/TextInput';
import ClanTable from '../components/ClanSearch/ClanTable';

const ClanViewer = () => {
  const [clanId, setInputValue] = useState('');
  const [clanData, setClanData] = useState(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const data = await fetchClanWithId(clanId);
      setClanData(data.clan_data);
    } catch (error) {
      window.alert('Failed to get player');
      setClanData(null)
    }
  };

  return (
      <div className='content-div'>
          <h3>Search Clan using ID!</h3>
          <TextInput value={clanId} onChange={handleChange} />
          <div aria-hidden style={{marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0}}/>
          <button onClick={handleButtonClick}>Get Clan</button>
          <div aria-hidden style={{marginTop: 50, marginBottom: 50, marginLeft: 0, marginRight: 0}}/>
          {clanData != null ? <ClanTable clanData={clanData}/> : null}
      </div>
  );
};

export default ClanViewer;