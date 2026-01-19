import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import LeadLogo from '../assets/Logo.png';

const ResponseDashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('nec_auth');
        navigate('/response');
    };

    const fetchData = async () => {
        setLoading(true);
        // Using a public Google Sheet CSV for demo. 
        // Instructions: Publish Sheet -> File -> Share -> Publish to Web -> CSV
        // For now, I'll mock the data or try to read from a local source if simulating "file creation".
        // Since we can't write to a file on GitHub Pages, we simulate the "Excel" aspect by
        // suggesting the user connects a Google Sheet.

        // Mock Data for consistent demonstration of UI
        const mockData = [
            { "Timestamp": "2026-01-19 10:30:00", "Team Name": "Innovators", "Lead Name": "John Doe", "Email": "john@example.com", "Phone": "9876543210", "Members": "2", "Amount": "2000" },
            { "Timestamp": "2026-01-19 11:15:00", "Team Name": "Disruptors", "Lead Name": "Jane Smith", "Email": "jane@example.com", "Phone": "9123456789", "Members": "3", "Amount": "3000" },
            { "Timestamp": "2026-01-19 12:00:00", "Team Name": "Visionaries", "Lead Name": "Alice Brown", "Email": "alice@example.com", "Phone": "9988776655", "Members": "2", "Amount": "2000" },
        ];

        setTimeout(() => {
            setData(mockData);
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Outfit, sans-serif' }}>
            <header style={{
                background: 'white',
                padding: '1rem 2rem',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={LeadLogo} alt="LEAD" style={{ height: '40px' }} />
                    <h1 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#0F172A', margin: 0 }}>Registration Responses</h1>
                </div>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: '0.5rem 1rem',
                        background: '#EEF2FF',
                        color: '#4F46E5',
                        border: '1px solid #C7D2FE',
                        borderRadius: '6px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                    }}
                >
                    Logout
                </button>
            </header>

            <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E293B', marginBottom: '0.5rem' }}>Overview</h2>
                        <p style={{ color: '#64748B' }}>Total Registrations: {data.length}</p>
                    </div>
                    <button style={{
                        padding: '0.6rem 1.2rem',
                        background: '#10B981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <span>Download Excel</span>
                    </button>
                </div>

                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    overflow: 'hidden',
                    border: '1px solid #E2E8F0'
                }}>
                    {loading ? (
                        <div style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>Loading data...</div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead style={{ background: '#F1F5F9' }}>
                                    <tr>
                                        {data.length > 0 && Object.keys(data[0]).map((header) => (
                                            <th key={header} style={{
                                                padding: '1rem',
                                                fontSize: '0.85rem',
                                                fontWeight: '600',
                                                color: '#475569',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                                borderBottom: '1px solid #E2E8F0'
                                            }}>
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.1s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'} onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
                                            {Object.values(row).map((cell, i) => (
                                                <td key={i} style={{ padding: '1rem', fontSize: '0.95rem', color: '#334155' }}>
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ResponseDashboard;
