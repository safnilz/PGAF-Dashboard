import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import Directory from './components/Directory';
import { LayoutDashboard } from 'lucide-react';

function App() {
  const [data, setData] = useState(null);

  const handleDataLoaded = (parsedData) => {
    setData(parsedData);
  };

  const resetData = () => {
    setData(null);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <div className="logo-icon">
            <LayoutDashboard size={24} />
          </div>
          P&G Ambassador Network
        </div>
        
        {data && (
          <button className="btn btn-secondary" onClick={resetData}>
            Upload Different File
          </button>
        )}
      </header>

      <main>
        {!data ? (
          <FileUpload onDataLoaded={handleDataLoaded} />
        ) : (
          <div className="animate-fade-in">
            <Dashboard data={data} />
            <Directory data={data} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
