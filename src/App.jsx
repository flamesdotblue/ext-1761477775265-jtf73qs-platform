import React from 'react';
import { GamificationProvider } from './components/GamificationContext';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <GamificationProvider>
      <div className="min-h-screen bg-slate-950 text-white antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-slate-900 px-4 py-2 rounded shadow"
        >
          Skip to content
        </a>
        <NavBar />
        <main id="main" className="pt-16">
          <Hero />
          <Projects />
          <Contact />
        </main>
        <footer className="py-8 text-center text-sm text-slate-400">© {new Date().getFullYear()} Umer — Built with React, Tailwind, and ❤️</footer>
      </div>
    </GamificationProvider>
  );
}

export default App;
