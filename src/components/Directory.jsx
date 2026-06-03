import React, { useState, useMemo } from 'react';
import { Search, Filter, Mail, MapPin, Briefcase } from 'lucide-react';

const Directory = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFunction, setFilterFunction] = useState('');

  // Extract unique functions for the filter dropdown
  const uniqueFunctions = useMemo(() => {
    const fns = new Set();
    data.forEach(item => {
      if (item.function) {
        fns.add(item.function.split('(')[0].trim()); // simplify name
      }
    });
    return Array.from(fns).sort();
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.email || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFunction = filterFunction === '' || (item.function || '').includes(filterFunction);
      
      return matchesSearch && matchesFunction;
    });
  }, [data, searchTerm, filterFunction]);

  return (
    <div className="glass-panel animate-fade-in directory-container">
      <div className="flex-between" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2>Ambassador Directory</h2>
          <p>Find and connect with P&G Ambassadors ({filteredData.length} results)</p>
        </div>
      </div>

      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <Search className="search-icon" />
          <input 
            type="text" 
            className="input-field" 
            placeholder="Search by name, location, or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} color="var(--text-muted)" />
          <select 
            className="input-field" 
            style={{ minWidth: '200px' }}
            value={filterFunction}
            onChange={(e) => setFilterFunction(e.target.value)}
          >
            <option value="">All Functions</option>
            {uniqueFunctions.map(fn => (
              <option key={fn} value={fn}>{fn}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Function / Tenure</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((person, index) => (
                <tr key={index}>
                  <td>
                    <div style={{ fontWeight: '500', color: 'var(--text-main)' }}>{person.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{person.generation}</div>
                  </td>
                  <td>
                    {person.email && (
                      <a href={`mailto:${person.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem' }}>
                        <Mail size={14} />
                        {person.email}
                      </a>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                      <MapPin size={14} color="var(--text-muted)" />
                      {person.location}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                      <Briefcase size={14} color="var(--text-muted)" />
                      <span style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {person.function.split('(')[0].trim() || 'Unknown'}
                      </span>
                    </div>
                    <span className="badge">{person.tenure.split('(')[0].trim() || 'Unknown'}</span>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.9rem' }}>
                      {person.status}
                    </div>
                    {person.leadPGAF?.toLowerCase().includes('yes') && (
                      <span className="badge" style={{ backgroundColor: '#dcfce7', color: '#16a34a', marginTop: '0.4rem' }}>
                        Ready to Lead
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No ambassadors found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Directory;
