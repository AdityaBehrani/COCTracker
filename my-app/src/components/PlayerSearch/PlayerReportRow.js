import React from 'react';

const PlayerReportRow = ({ playerData }, avgStars, avgPerc) => {
  return (
        <tr>
            <td>{playerData.clan_id}</td>
            <td>{playerData.player_country}</td>
            <td>{playerData.player_level}</td>
            <td>{playerData.player_username}</td>
            <td>{playerData.townhall_level}</td>
            <td>{avgStars}</td>
            <td>{avgPerc}</td>
        </tr>
  );
};

export default PlayerReportRow;