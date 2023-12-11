import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css'

const Header = () => {
  // Function to handle page selection from dropdown
  const handlePageSelect = (event) => {
    // Navigate to the selected page
    window.location.href = event.target.value;
  };

  return (
    <div className="App-header">
      <h1>Clash of Clans War Tracker</h1>
      <select onChange={handlePageSelect} defaultValue="">
        <option value="" disabled>Select a page</option>
        <option value="/HomePage">Home Page</option>
        <option value="/PlayerViewer">Player Search</option>
        <option value="/ClanViewer">Clan Search</option>
        <option value="/PlayerEditor">Player Editor</option>
        <option value="/PlayerAdder">Player Adder</option>
        <option value="/ReportGen">Report Generator</option>
      </select>
    </div>
  );
};

export default Header;