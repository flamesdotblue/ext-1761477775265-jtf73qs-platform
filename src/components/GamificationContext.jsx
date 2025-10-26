import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const GamificationContext = createContext(null);

// Define point values and milestones
const POINTS = {
  VIEW_PROJECT: 10,
  VISIT_REPO: 15,
  DOWNLOAD_RESOURCE: 20,
  SUBMIT_CONTACT: 25,
};

const MAX_ACHIEVABLE = 5 * POINTS.VIEW_PROJECT + 5 * POINTS.VISIT_REPO + POINTS.DOWNLOAD_RESOURCE + POINTS.SUBMIT_CONTACT; // heuristic cap

export function GamificationProvider({ children }) {
  const [points, setPoints] = useState(0);
  const [awarded, setAwarded] = useState({});

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('gf_state') || '{}');
      if (stored.points) setPoints(stored.points);
      if (stored.awarded) setAwarded(stored.awarded);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('gf_state', JSON.stringify({ points, awarded }));
    } catch {}
  }, [points, awarded]);

  const awardOnce = useCallback((key, amount) => {
    setAwarded(prev => {
      if (prev[key]) return prev; // already awarded
      setPoints(p => p + amount);
      return { ...prev, [key]: true };
    });
  }, []);

  const progress = Math.min(100, Math.round((points / MAX_ACHIEVABLE) * 100));

  const value = useMemo(() => ({ points, progress, awardOnce, POINTS }), [points, progress, awardOnce]);

  return <GamificationContext.Provider value={value}>{children}</GamificationContext.Provider>;
}

export function useGamification() {
  const ctx = useContext(GamificationContext);
  if (!ctx) throw new Error('useGamification must be used within GamificationProvider');
  return ctx;
}
