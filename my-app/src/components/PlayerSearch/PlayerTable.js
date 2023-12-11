import React from 'react';

const PlayerTable = ({ playerData }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Clan ID</th>
          <th>Country</th>
          <th>Player Level</th>
          <th>Username</th>
          <th>Townhall Level</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{playerData.clan_id}</td>
          <td>{playerData.player_country}</td>
          <td>{playerData.player_level}</td>
          <td>{playerData.player_username}</td>
          <td>{playerData.townhall_level}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default PlayerTable;