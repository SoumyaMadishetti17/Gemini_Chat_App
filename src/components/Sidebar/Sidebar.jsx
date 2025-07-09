import React, { useState, useContext } from 'react';
import './Sidebar.css';
import { IoMdMenu, IoMdSettings } from 'react-icons/io';
import { FaPlus, FaQuestion, FaHistory } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import { Context } from '../context/Context';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { onSend, prevPrompts,setRecentPrompts } = useContext(Context);

  const loadPrompt=async(prompt)=>{
    setRecentPrompts(prompt)
    await onSend(prompt)
  }
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-top">
        <IoMdMenu className="menu-icon" onClick={toggleSidebar} />
        <div className="new-chat" onClick={() => onSend('')}>
          <FaPlus />
          {!isCollapsed && <p>New Chat</p>}
        </div>

        {!isCollapsed && (
          <div className="recent-chats">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((prompt, index) => (
              <div onClick={()=>loadPrompt(prompt)} className="recent-entry" key={index}>
                <FaMessage />
                <p>{prompt.slice(0,18)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sidebar-bottom">
        <div className="bottom-item">
          <FaQuestion />
          {!isCollapsed && <p>Help</p>}
        </div>
        <div className="bottom-item">
          <FaHistory />
          {!isCollapsed && <p>Activity</p>}
        </div>
        <div className="bottom-item">
          <IoMdSettings />
          {!isCollapsed && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
