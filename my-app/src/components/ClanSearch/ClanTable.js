// src/components/ClanTable.js
import React from 'react';

const ClanTable = ({ clanData }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Clan Country</th>
          <th>Clan Name</th>
          <th>Clan Level</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{clanData.clan_country}</td>
          <td>{clanData.clan_name}</td>
          <td>{clanData.clan_level}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ClanTable;