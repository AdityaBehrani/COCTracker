// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
        <div aria-hidden style={{marginTop: 40, marginBottom: 40, marginLeft: 0, marginRight: 0}}/>
      <div>
        © {new Date().getFullYear()} COC War Tracker. All rights reserved.
      </div>
      <div>
        <a href="/HomePage">About Us</a> | Contact me: <a href="abehrani@purdue.edu">abehrani@purdue.edu</a>
      </div>
    </footer>
  );
};

export default Footer;