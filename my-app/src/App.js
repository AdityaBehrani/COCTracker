import React from 'react';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import PlayerViewer from './pages/PlayerViewer';
import ClanViewer from './pages/ClanViewer';
import PlayerEditor from './pages/PlayerEditor';
import ReportGen from './pages/ReportGen';
import PlayerAdder from './pages/PlayerAdder';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Footer from './components/common/Footer';


function App() {
  return (
    <div style={{backgroundColor:'#CDCDB4' }}>
      <Router>
        <nav>
          <Header />
        </nav>
        <div className='line-break'></div>
        <Routes>
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/PlayerViewer" element={<PlayerViewer />} />
          <Route path="/PlayerAdder" element={<PlayerAdder />} />
          <Route path="/ClanViewer" element={<ClanViewer />} />
          <Route path="/PlayerEditor" element={<PlayerEditor />} />
          <Route path="/ReportGen" element={<ReportGen />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;