import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import Header from './components/Header';
import AboutSection from './components/AboutSection';
import RegistrationForm from './components/RegistrationForm';
import LoginPage from './components/LoginPage';
import ResponseDashboard from './components/ResponseDashboard';
import LeadLogo from './assets/Logo.png';

const LandingPage = () => {
  return (
    <>
      <Header />
      <Hero />
      <AboutSection />
      <RegistrationForm />
      <footer style={{
        marginTop: '0',
        background: '#0F172A',
        padding: '2rem 1rem',
        textAlign: 'center',
        color: '#94A3B8',
        fontSize: '0.9rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src={LeadLogo} alt="LEAD" style={{ height: '30px', opacity: 0.8 }} />
            <span>&copy; 2026 LEAD College of Management. All rights reserved.</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: '#E2E8F0', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#E2E8F0', textDecoration: 'none' }}>Terms of Service</a>
            <a href="#" style={{ color: '#E2E8F0', textDecoration: 'none' }}>Contact Us</a>
          </div>
        </div>
      </footer>
    </>
  );
};

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('nec_auth') === 'true';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/response'); // Redirect to login if accessing protected route directly
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;
  return children;
};

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/response" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <ResponseDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
