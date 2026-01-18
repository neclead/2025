import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <RegistrationForm />
      </main>
      <footer className="footer">
        FOR MORE INFO, CONTACT +91 89430 31814 | +91 98097 00891
      </footer>
    </div>
  );
}

export default App;
