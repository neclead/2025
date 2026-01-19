import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeadLogo from '../assets/Logo.png';

const LoginPage = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (userId === 'Lead' && password === 'NEC2025') {
            localStorage.setItem('nec_auth', 'true');
            navigate('/dashboard');
        } else {
            setError('Invalid Credentials');
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: '#F1F5F9', // Light gray background
            fontFamily: 'Outfit, sans-serif'
        }}>
            <div style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center'
            }}>
                <img src={LeadLogo} alt="LEAD Logo" style={{ height: '60px', marginBottom: '1.5rem' }} />
                <h2 style={{ color: '#0F172A', marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: '600' }}>Admin Login</h2>
                <p style={{ color: '#64748B', marginBottom: '2rem' }}>Enter your credentials to access the dashboard.</p>

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: '#334155', marginBottom: '0.5rem', fontWeight: '500' }}>User ID</label>
                        <input
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid #CBD5E1',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                            }}
                            placeholder="e.g. Lead"
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: '#334155', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid #CBD5E1',
                                fontSize: '1rem',
                                outline: 'none',
                            }}
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <div style={{ color: '#EF4444', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: '#2563EB',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
                        }}
                    >
                        Sign In
                    </button>
                </form>
            </div>
            <div style={{ marginTop: '2rem', color: '#94A3B8', fontSize: '0.85rem' }}>
                &copy; 2026 National Entrepreneurship Conclave
            </div>
        </div>
    );
};

export default LoginPage;
