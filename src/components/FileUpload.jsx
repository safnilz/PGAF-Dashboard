import React, { useCallback, useState } from 'react';
import { UploadCloud, FileSpreadsheet } from 'lucide-react';
import { parseExcelFile } from '../utils/excelParser';

const FileUpload = ({ onDataLoaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const processFile = async (file) => {
    if (!file) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await parseExcelFile(file);
      onDataLoaded(data);
    } catch (err) {
      console.error(err);
      setError("Failed to parse the file. Please ensure it's a valid Excel file (.xlsx or .xls).");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      processFile(files[0]);
    }
  }, []);

  const handleFileInput = (e) => {
    if (e.target.files.length) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ maxWidth: '600px', margin: '4rem auto' }}>
      <div className="text-center" style={{ marginBottom: '2rem' }}>
        <h2>Welcome to P&G Ambassador Dashboard</h2>
        <p>Upload the Ambassador Survey Response Excel file to securely view the dashboard locally.</p>
      </div>

      <div 
        className={`upload-area ${isDragging ? 'drag-active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileUpload').click()}
      >
        <input 
          type="file" 
          id="fileUpload" 
          accept=".xlsx, .xls, .csv" 
          style={{ display: 'none' }} 
          onChange={handleFileInput}
        />
        
        {isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="upload-icon" style={{ animation: 'spin 1s linear infinite' }}>
              <UploadCloud size={48} />
            </div>
            <h3>Processing File...</h3>
          </div>
        ) : (
          <>
            <FileSpreadsheet className="upload-icon" />
            <h3>Drag & Drop your Excel file here</h3>
            <p style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>or click to browse from your computer</p>
            <button className="btn btn-primary">Select File</button>
          </>
        )}
      </div>

      {error && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#fef2f2', color: '#ef4444', borderRadius: '0.5rem', border: '1px solid #fca5a5' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
