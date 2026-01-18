import React from 'react';

const Header = () => {
    return (
        <header className="header">
            <img src="/assets/Lead.png" alt="LEAD College" className="partner-logo" />
            <img src="/assets/K-Disc.png" alt="K-DISC" className="partner-logo" />
            <img src="/assets/IEDC.png" alt="IEDC" className="partner-logo" />
            {/* Assuming Logo.png might be another partner or the main event logo, omitting if duplicates or displaying all */}
            {/* If there are more logos needed, add here. Based on poster: LEAD, K-DISC, Kerala Startup Mission, IEDC */}
            {/* Usually 'Logo.png' might be KSUM or IEDC specific. I'll include it if it looks unique or check later. */}
        </header>
    );
};

export default Header;
