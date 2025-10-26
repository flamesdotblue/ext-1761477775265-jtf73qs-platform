import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { useGamification } from './GamificationContext';

const projectsData = [
  { repo: 'Umer1444/chatbot', title: 'Chatbot', desc: 'Conversational AI assistant with NLP.', stack: ['Python', 'NLTK', 'Flask'] },
  { repo: 'Umer-Portfolio', title: 'Portfolio (Legacy)', desc: 'Personal portfolio site iteration.', stack: ['HTML', 'CSS', 'JS'] },
  { repo: 'Umer1444/Umer-Portfolio', title: 'Portfolio (React)', desc: 'React-based modern portfolio.', stack: ['React', 'Tailwind'] },
  { repo: 'Umer1444/Bill', title: 'Billing App', desc: 'Simple invoicing and billing tool.', stack: ['Node', 'Express', 'MongoDB'] },
  { repo: 'Umer1444/Alumni_1', title: 'Alumni Network', desc: 'Alumni networking platform.', stack: ['Django', 'Postgres'] },
  { repo: 'Umer1444/FullStack', title: 'FullStack Boilerplate', desc: 'Full-stack starter kit.', stack: ['React', 'Node', 'SQL'] },
  { repo: 'Umer1444/Austism_Dataset', title: 'Autism Dataset', desc: 'ML dataset exploration & EDA.', stack: ['Python', 'Pandas'] },
  { repo: 'Umer1444/Journal-App', title: 'Journal App', desc: 'Daily journaling with auth.', stack: ['React', 'Firebase'] },
  { repo: 'Umer1444/heart', title: 'Heart Analysis', desc: 'Cardio risk model & viz.', stack: ['Python', 'Scikit-learn'] },
  { repo: 'Umer1444/HI_AI', title: 'HI AI', desc: 'AI experiments and utilities.', stack: ['PyTorch', 'Notebooks'] },
  { repo: 'Umer1444/docs', title: 'Docs', desc: 'Documentation and notes.', stack: ['Markdown', 'Docs'] },
];

export default function Projects() {
  const { awardOnce, POINTS } = useGamification();
  const [expanded, setExpanded] = useState({});

  const projects = useMemo(() => projectsData, []);

  const handleViewDetails = (repo) => {
    setExpanded(prev => ({ ...prev, [repo]: !prev[repo] }));
    awardOnce(`view_${repo}`, POINTS.VIEW_PROJECT);
  };

  const handleVisitRepo = (repo, url) => {
    awardOnce(`visit_${repo}`, POINTS.VISIT_REPO);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="projects" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'Poppins, ui-sans-serif, system-ui' }}>Projects</h2>
        <p className="mt-2 text-slate-300" style={{ fontFamily: 'Open Sans, ui-sans-serif, system-ui' }}>A modular grid of repositories with details and actions. Interact to earn points.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((p, idx) => {
            const url = p.repo.startsWith('http') ? p.repo : `https://github.com/${p.repo}`;
            const isOpen = !!expanded[p.repo];
            return (
              <motion.article
                key={p.repo}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-5 focus-within:ring-2 focus-within:ring-indigo-400"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{p.title}</h3>
                    <p className="mt-1 text-sm text-slate-300">{p.desc}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2" aria-label="Tech stack">
                  {p.stack.map(tag => (
                    <span key={tag} className="text-xs rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-1">{tag}</span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleViewDetails(p.repo)}
                    aria-expanded={isOpen}
                    className="rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-slate-950"
                  >
                    {isOpen ? 'Hide Details' : 'View Details'}
                  </button>
                  <button
                    onClick={() => handleVisitRepo(p.repo, url)}
                    className="inline-flex items-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-4 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-300 focus-visible:ring-offset-slate-950"
                    aria-label={`Open ${p.title} on GitHub`}
                  >
                    <Github className="w-4 h-4" aria-hidden="true" /> View Repo
                  </button>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 hover:border-white/20 text-slate-100 px-4 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-slate-950"
                  >
                    Open <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 border-t border-white/10 pt-4 text-sm text-slate-300"
                  >
                    <p>
                      This card supports keyboard navigation and is fully accessible. Engage with the project to gain points. Links open in a new tab. Try the repo button to earn extra points.
                    </p>
                  </motion.div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
