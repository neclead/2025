import React, { useState, useEffect } from 'react';
import LeadLogo from '../assets/Lead.png';
import KDiscLogo from '../assets/K-Disc.png';
import IEDCLogo from '../assets/IEDC.png';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <img src={LeadLogo} alt="LEAD College" className="partner-logo" />
            <img src={KDiscLogo} alt="K-DISC" className="partner-logo" />
            <img src={IEDCLogo} alt="IEDC" className="partner-logo" />
            {/* Assuming Logo.png might be another partner or the main event logo, omitting if duplicates or displaying all */}
            {/* If there are more logos needed, add here. Based on poster: LEAD, K-DISC, Kerala Startup Mission, IEDC */}
            {/* Usually 'Logo.png' might be KSUM or IEDC specific. I'll include it if it looks unique or check later. */}
        </header>
    );
};

export default Header;
