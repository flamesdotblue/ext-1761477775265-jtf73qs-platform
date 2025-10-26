import React, { useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket, Download } from 'lucide-react';
import { useGamification } from './GamificationContext';

export default function Hero() {
  const { awardOnce, POINTS } = useGamification();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -80]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  const handleDownload = useCallback(() => {
    // create a small downloadable resume text
    const content = 'Umer — Resume\nSkills: React, Node.js, Python, ML\nGitHub: github.com/Umer1444';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Umer_Resume.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    awardOnce('download_resume', POINTS.DOWNLOAD_RESOURCE);
  }, [awardOnce, POINTS]);

  const handleExplore = useCallback(() => {
    const el = document.getElementById('projects');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <section id="home" className="relative overflow-hidden">
      <motion.div style={{ y, opacity }} aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(ellipse at center, #6366F1 0%, transparent 60%)' }} />
        <div className="absolute -bottom-32 -right-32 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(ellipse at center, #F59E0B 0%, transparent 60%)' }} />
      </motion.div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          style={{ fontFamily: 'Poppins, ui-sans-serif, system-ui' }}
        >
          Gamified Portfolio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-4 max-w-2xl text-lg text-slate-300"
          style={{ fontFamily: 'Open Sans, ui-sans-serif, system-ui' }}
        >
          Explore interactive projects with a vibrant, accessible experience. Earn points by engaging with content: view projects, visit repos, download resources, and send a message.
        </motion.p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={handleExplore}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white px-5 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-slate-950 transition"
          >
            <Rocket className="w-5 h-5" aria-hidden="true" /> Start Exploring
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-5 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-300 focus-visible:ring-offset-slate-950 transition"
          >
            <Download className="w-5 h-5" aria-hidden="true" /> Download Resume
          </button>
        </div>
      </div>
    </section>
  );
}
