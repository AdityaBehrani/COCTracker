// src/pages/HomePage.js
import React from 'react';
import { useState } from 'react';
import { fetchClanWithId, fetchAttacksWithClanId, fetchPlayersWithClan } from '../services/api';
import TextInput from '../components/common/TextInput';
import ClanTable from '../components/ClanSearch/ClanTable';
import ReportMemberTable from '../components/PlayerSearch/ReportMemberTable';

const ReportGen = () => {
  const [clanId, setInputValue] = useState('');
  const [clanData, setClanData] = useState(null);

  const [memember_list, setMemsVal] = useState(null);
  const [attacks_list, setAttacksVal] = useState(null);
  const [collectedData, setData] = useState(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  function collectData() {
    const playerStats = {};

    if (attacks_list != null && memember_list != null) {
      attacks_list.forEach(attack => {
        if (!playerStats[attack['player_id']]) {
          playerStats[attack['player_id']] = { 'stars': 0, 'percentage': 0, 'num_attack': 0 };
        }

        playerStats[attack['player_id']]['stars'] += attack['stars'];
        playerStats[attack['player_id']]['percentage'] += attack['percentage'];
        playerStats[attack['player_id']]['num_attack'] += attack['num_attack'];
      });

      memember_list.forEach(member => {
        if (playerStats[member['player_data']['_id']]) {
          playerStats[member['player_data']['_id']] = {...member['player_data'], ...playerStats[member['player_data']['_id']]};
        }
        else {
          console.log(member['player_data']['_id'])
          console.log(member)
          playerStats[member['player_data']['_id']] = {...member['player_data'], 'stars': 0, 'percentage': 0, 'num_attack': 0 }
        }
      });
      
      const res = [];

      memember_list.forEach(member => {
        res.push(playerStats[member['player_data']['_id']]);
      });

      setData(res)
      console.log(res)
    }
  };

  const updateInfo = async () => {
    try {
      const data = await fetchPlayersWithClan(clanId);
      setMemsVal(data);
      
    } catch (error) {
      window.alert('Failed to get memeber list');
      setMemsVal(null)
    }

    try {
      const data = await fetchAttacksWithClanId(clanId);
      setAttacksVal(data);
      
    } catch (error) {
      window.alert('Failed to get attack info');
      setAttacksVal(null)
    }
  };

  const handleButtonClick = async () => {
    try {
      const data = await fetchClanWithId(clanId);
      setClanData(data.clan_data);
      updateInfo();
    } catch (error) {
      window.alert('Failed to get player');
      setClanData(null);
      setMemsVal(null);
      setAttacksVal(null);
      setData(null);
    }
  };

  const handleButtonDataClick = async () => {
    collectData();
  };

  return (
      <div className='content-div'>
          <h3>Search Clan using ID and generate Report!</h3>
          <TextInput value={clanId} onChange={handleChange} />
          <div aria-hidden style={{marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0}}/>
          <button onClick={handleButtonClick}>Search Clan</button>
          {(attacks_list != null && memember_list != null) ? <div>
            <div aria-hidden style={{marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0}}/>
            <button onClick={handleButtonDataClick}>Generate Attack Stats</button>
          </div> : null}
          <div aria-hidden style={{marginTop: 30, marginBottom: 30, marginLeft: 0, marginRight: 0}}/>
          {memember_list != null ? <a>Number of Members: {memember_list.length} </a> : null}
          <div aria-hidden style={{marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0}}/>
          {clanData != null ? <ClanTable clanData={clanData}/> : null}
          <div aria-hidden style={{marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0}}/>
          {collectedData != null ? <ReportMemberTable playerData={collectedData}/> : null}
      </div>
  );
};

export default ReportGen;