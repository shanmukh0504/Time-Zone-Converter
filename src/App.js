import React, { useState } from 'react';
import './App.css'
import TimeZoneConverter, { lightTheme, darkTheme } from './TimeZoneConverter'; 

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="App" style={{ background: isDarkMode ? darkTheme.background : lightTheme.background, color: isDarkMode ? darkTheme.text : lightTheme.text }}>
      <TimeZoneConverter isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} setIsDarkMode={setIsDarkMode}/>
    </div>
  );
};

export default App;