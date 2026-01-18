import React from 'react';

const Hero = () => {
    return (
        <div className="hero-wrapper">
            <section className="hero">
                <div className="hero-subtitle">
                    South India's largest multi-stage program designed to nurture aspiring entrepreneurs.
                </div>

                <div className="main-title-card">
                    <div className="prize-badge">
                        <h3>₹5.5 L</h3>
                        <p>Prize<br />Pool</p>
                    </div>

                    <img
                        src="/assets/Logo.png"
                        alt="National Entrepreneurship Conclave 2026"
                        style={{ maxWidth: '100%', height: 'auto', marginBottom: '1rem' }}
                    />

                    <div className="edition-text">The Fourth Edition</div>
                </div>
            </section>

            <div className="building-section">
                <div className="date-circle-container">
                    <div className="date-circle">18</div>
                    <div className="date-circle">19</div>
                    <div className="date-circle">20</div>
                    <div style={{ alignSelf: 'center', fontWeight: '800', color: '#0A2540', marginLeft: '10px' }}>
                        FEB<br />2026
                    </div>
                </div>

                <div className="stage-location" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ color: '#0A2540', marginBottom: '0.5rem' }}>Stage is set on</h3>
                    <h2 style={{ fontSize: '2rem', color: '#0A2540' }}>LEAD College</h2>
                    <p style={{ color: '#64748B', fontWeight: '600' }}>Dhoni, Palakkad</p>
                </div>

                <img src="/assets/Building.png" alt="LEAD College Building" className="building-image" />
            </div>
        </div>
    );
};

export default Hero;
