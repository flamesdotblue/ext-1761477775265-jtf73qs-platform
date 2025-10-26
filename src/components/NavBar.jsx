import React from 'react';
import { Github, Star, Mail, Home } from 'lucide-react';
import { useGamification } from './GamificationContext';

export default function NavBar() {
  const { points, progress } = useGamification();

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/70 border-b border-white/10" role="banner">
      <nav aria-label="Primary" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-slate-900 rounded px-1">
            <Home className="w-5 h-5 text-indigo-400" aria-hidden="true" />
            <span className="font-semibold tracking-wide" style={{ fontFamily: 'Poppins, ui-sans-serif, system-ui' }}>Umer</span>
          </a>
          <ul className="hidden md:flex gap-6" role="menubar" aria-label="Main menu">
            <li role="none"><a role="menuitem" href="#projects" className="text-slate-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded px-2 py-1">Projects</a></li>
            <li role="none"><a role="menuitem" href="#contact" className="text-slate-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded px-2 py-1">Contact</a></li>
            <li role="none"><a role="menuitem" href="https://github.com/Umer1444" target="_blank" rel="noreferrer" className="text-slate-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded px-2 py-1 flex items-center gap-2"><Github className="w-4 h-4" aria-hidden="true"/> GitHub</a></li>
          </ul>
          <div className="flex items-center gap-3" aria-live="polite">
            <div className="hidden sm:flex items-center gap-1 text-amber-400" title="Your points">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              <span className="text-sm font-semibold" aria-label={`Points: ${points}`}>{points}</span>
            </div>
          </div>
        </div>
        <div className="py-2">
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-label="Portfolio completion">
            <div
              className="h-full bg-indigo-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="sr-only" aria-live="polite">Progress {progress}%</div>
        </div>
      </nav>
    </header>
  );
}
