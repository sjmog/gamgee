import React, { useEffect, useState } from 'react';

export default function Sidebar() {
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    showLatestTranscript();
    
    chrome.runtime.onMessage.addListener(({ message }) => {
      if(message === 'transcriptavailable') {
        showLatestTranscript();
      }
    });
  }, []);

  const showLatestTranscript = () => {
    chrome.storage.local.get("transcript", ({ transcript }) => {
      setTranscript(transcript || '');
    });
  };

  const handleStart = async () => {
    const tab = await getCurrentTab();
    if(!tab) return alert('Require an active tab');
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content-script.js"]
    });
  };

  const handleStop = async () => {
    const tab = await getCurrentTab();
    if(!tab) return alert('Require an active tab');
    chrome.tabs.sendMessage(tab.id, { message: 'stop' });
  };

  const handleClear = () => {
    chrome.storage.local.remove(['transcript']);
    setTranscript('');
  };

  const handleOptions = () => {
    chrome.runtime.openOptionsPage();
  };

  const getCurrentTab = async () => {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  };

  return (
    <div className="p-4 h-screen flex flex-col gap-4">
      <button 
        onClick={handleOptions}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Options
      </button>
      
      <div className="grid grid-cols-3 gap-4">
        <button 
          onClick={handleStart}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Start transcription
        </button>
        <button 
          onClick={handleStop}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Stop transcription
        </button>
        <button 
          onClick={handleClear}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Clear transcription
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <p className="whitespace-pre-wrap">{transcript}</p>
      </div>
    </div>
  );
} 