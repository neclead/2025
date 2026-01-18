import React, { useState } from 'react';
import {
    Trophy,
    Target,
    Mic,
    Users,
    Plus,
    UserPlus,
    Phone,
    Mail,
    ChevronDown,
    ChevronUp,
    Award,
    Zap,
    Ticket
} from 'lucide-react';
import ChessVisual from '../assets/ChessTheme.jpg';

const AboutSection = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div className="about-wrapper">

            <section className="details-section">
                <div className="container">

                    <div className={`collapsible-content ${isExpanded ? 'expanded' : ''}`}>

                        <section className="chess-visual-section" style={{ marginBottom: '2rem' }}>
                            <div className="visual-container">
                                <img src={ChessVisual} alt="Quit the Rat Race" className="chess-img" />
                            </div>
                        </section>

                        <div className="intro-text">
                            <h2>The 4th Edition</h2>
                            <p>
                                LEAD College (Autonomous), in association with LEAD Business Incubator Foundation,
                                proudly presents <strong>NEC ’26 — the National Entrepreneurship Conclave 2026</strong>.
                            </p>
                            <p>
                                A high-impact 3-day national conclave, NEC ’26 is designed to ignite entrepreneurial
                                thinking and enable the transition from a B-School to an E-School.
                                The conclave serves as a launchpad for aspiring entrepreneurs to refine ideas,
                                build ventures, and engage with India’s evolving startup ecosystem.
                            </p>
                        </div>

                        <div className="highlights-grid">
                            <div className="highlight-card">
                                <h3><Zap size={24} className="icon-gold" /> Event Highlights</h3>
                                <ul>
                                    <li><Target size={18} /> Refine and validate ideas with expert mentors</li>
                                    <li><Award size={18} /> Build a compelling, investor-ready pitch deck</li>
                                    <li><Mic size={18} /> Pitch with confidence on a national platform</li>
                                </ul>
                            </div>

                            <div className="prizes-card">
                                <h3><Trophy size={24} className="icon-gold" /> Prizes Worth ₹5.5 Lakhs</h3>
                                <div className="prize-list">
                                    <div className="prize-item first">
                                        <div className="rank-icon"><Trophy size={20} color="#F59E0B" /></div>
                                        <span className="place">1st Prize</span>
                                        <span className="amount">₹2,00,000</span>
                                    </div>
                                    <div className="prize-item second">
                                        <div className="rank-icon"><Trophy size={20} color="#94A3B8" /></div>
                                        <span className="place">2nd Prize</span>
                                        <span className="amount">₹1,00,000</span>
                                    </div>
                                    <div className="prize-item third">
                                        <div className="rank-icon"><Trophy size={20} color="#B45309" /></div>
                                        <span className="place">3rd Prize</span>
                                        <span className="amount">₹50,000</span>
                                    </div>
                                </div>
                                <p className="pool-note"><Award size={16} /> Prize pool of Two Lakhs For 30 Teams</p>
                            </div>
                        </div>

                        <div className="info-grid">
                            <div className="registration-details-card">
                                <h3><Ticket size={24} className="icon-blue" /> Registration Details</h3>
                                <ul className="details-list">
                                    <li>
                                        <Users size={18} />
                                        <span><strong>Team Size:</strong> Minimum 2 members</span>
                                    </li>
                                    <li>
                                        <UserPlus size={18} />
                                        <span><strong>Additional Members:</strong> Treated as guests</span>
                                    </li>
                                    <li>
                                        <Plus size={18} />
                                        <span><strong>Guest Fee:</strong> ₹1,000 per head</span>
                                    </li>
                                </ul>
                                <div className="fee-box">
                                    <p className="fee-label">Early Bird Registration</p>
                                    <p className="fee-amount">₹2,000 <span className="per-team">/ team</span></p>
                                    <p className="fee-note">(includes food & accommodation)</p>
                                </div>
                            </div>

                            <div className="contact-card">
                                <h3><Phone size={24} className="icon-blue" /> For More Information</h3>
                                <div className="contact-item">
                                    <Mail size={18} />
                                    <a href="mailto:nec@lead.ac.in">nec@lead.ac.in</a>
                                </div>
                                <div className="contact-numbers">
                                    <div className="contact-item">
                                        <Phone size={18} /> <span>+91 98097 00891</span>
                                    </div>
                                    <div className="contact-item">
                                        <Phone size={18} /> <span>+91 89430 31814</span>
                                    </div>
                                </div>
                                <div className="slogan-box">
                                    Fuel your passion. Ignite your future.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="expand-action-container">
                        <button
                            onClick={toggleExpand}
                            className={`expand-btn ${isExpanded ? 'active' : ''}`}
                        >
                            <span>{isExpanded ? 'Close Details' : 'Discover The 4th Edition'}</span>
                            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default AboutSection;
