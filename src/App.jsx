import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Directory from './components/Directory';
import { LayoutDashboard, Loader2 } from 'lucide-react';
import { fetchGoogleSheetData } from './utils/excelParser';

const SHEET_URL = "https://docs.google.com/spreadsheets/d/1HsjwyXSfkf0EtJCZkYI9ECQb59GyeMwxKpoMDVH1OaQ/edit?usp=sharing";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const parsedData = await fetchGoogleSheetData(SHEET_URL);
        setData(parsedData);
      } catch (err) {
        setError("Failed to load data from the Google Sheet. Ensure it is published or publicly accessible.");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <div className="logo-icon">
            <LayoutDashboard size={24} />
          </div>
          P&G Ambassador Network
        </div>
      </header>

      <main>
        {loading ? (
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
            <Loader2 className="upload-icon" style={{ animation: 'spin 1s linear infinite', color: 'var(--primary)', width: 48, height: 48, marginBottom: '1rem' }} />
            <h3>Syncing with Google Sheets...</h3>
            <p>Fetching the latest ambassador data</p>
          </div>
        ) : error ? (
          <div className="glass-panel" style={{ color: 'var(--danger)', textAlign: 'center', padding: '3rem' }}>
            <h3>Error</h3>
            <p>{error}</p>
          </div>
        ) : data ? (
          <div className="animate-fade-in">
            <Dashboard data={data} />
            <Directory data={data} />
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default App;
