import PlayerReportRow from "./PlayerReportRow";
import React from 'react';

const ReportMemberTable = (playerData) => {
    console.log(playerData.playerData);
    return (
      <table>
        <thead>
          <tr>
            <th>Player ID</th>
            <th>Username</th>
            <th>Player Level</th>
            <th>Townhall Level</th>
            <th>Total Attacks</th>
            <th>Total Stars</th>
            <th>Total Percentage</th>
            <th>Avg Stars</th>
            <th>Avg Percentage</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
            {playerData.playerData.map(player => (
            <tr key={player._id}>
                <td>{player._id}</td>
                <td>{player.player_username}</td>
                <td>{player.player_level}</td>
                <td>{player.townhall_level}</td>
                <td>{player.num_attack}</td>
                <td>{player.stars}</td>
                <td>{player.percentage}</td>
                <td>{player.stars / player.num_attack}</td>
                <td>{player.percentage / player.num_attack}</td>
                <td>{player.player_country}</td>
            </tr>
            ))}
        </tbody>
      </table>
    );
  };
  
  export default ReportMemberTable;