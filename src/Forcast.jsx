
import { AiFillCloseCircle } from "react-icons/ai";



import React, { useState } from 'react';
import './App.css'; // Make sure to import your CSS file

const SettingsButton = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleSettingsClick = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className="settings-button-container">
      <button className="settings-button" onClick={handleSettingsClick}>
        Open Settings
      </button>

      {isSettingsOpen && (
        <div className="settings-window">
          <button  className="settings-click"onClick={handleSettingsClick}>
          {<AiFillCloseCircle size={32}/>}
          </button>
          <p> text is text </p>
          <input type="text" placeholder="search" /> 
          
        </div>
      )}
    </div>
  );
};

export default SettingsButton;