import React, { useMemo } from 'react';
import { Users, Globe, Building2, TrendingUp } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#0056D2', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

const Dashboard = ({ data }) => {
  const stats = useMemo(() => {
    const total = data.length;
    
    // Process locations
    const locations = {};
    data.forEach(item => {
      const loc = item.location ? item.location.split(',')[0].trim() : 'Unknown';
      locations[loc] = (locations[loc] || 0) + 1;
    });
    const uniqueLocations = Object.keys(locations).length;

    // Process generations
    const generationsMap = {};
    data.forEach(item => {
      const gen = item.generation || 'Unknown';
      generationsMap[gen] = (generationsMap[gen] || 0) + 1;
    });
    
    const generationsData = Object.entries(generationsMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Process functions
    const functionsMap = {};
    data.forEach(item => {
      const fn = item.function || 'Unknown';
      // simplify function name for chart
      const simpleFn = fn.split('(')[0].split('/')[0].trim();
      functionsMap[simpleFn] = (functionsMap[simpleFn] || 0) + 1;
    });

    const functionsData = Object.entries(functionsMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6); // Top 6 functions

    return {
      total,
      uniqueLocations,
      generationsData,
      functionsData
    };
  }, [data]);

  return (
    <div className="animate-fade-in" style={{ marginBottom: '3rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Dashboard Overview</h2>
      
      <div className="dashboard-grid">
        <div className="glass-panel stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h4>Total Ambassadors</h4>
            <div className="stat-value">{stats.total}</div>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#e0e7ff', color: '#4f46e5' }}>
            <Globe size={24} />
          </div>
          <div className="stat-content">
            <h4>Unique Locations</h4>
            <div className="stat-value">{stats.uniqueLocations}</div>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
            <Building2 size={24} />
          </div>
          <div className="stat-content">
            <h4>P&G Alumni Network</h4>
            <div className="stat-value">Active</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        
        {/* Generations Chart */}
        <div className="glass-panel">
          <h3 style={{ marginBottom: '1rem' }}>Generations Breakdown</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={stats.generationsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {stats.generationsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Functions Chart */}
        <div className="glass-panel">
          <h3 style={{ marginBottom: '1rem' }}>Top P&G Functions</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={stats.functionsData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} tick={{fontSize: 12}} />
                <RechartsTooltip />
                <Bar dataKey="value" fill="var(--primary)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
