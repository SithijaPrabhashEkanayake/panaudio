import React, { createContext, useContext, useState, useEffect } from 'react';
import { projectsData as initialProjectsData } from '../data/projects';

const ProjectsContext = createContext();

const STORAGE_KEY = 'panaudio_projects';

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialProjectsData;
      }
    }
    return initialProjectsData;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.warn('Failed to save projects to localStorage:', e);
    }
  }, [projects]);

  const resetProjects = () => {
    setProjects(initialProjectsData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProjectsData));
    } catch (e) {
      console.warn('Failed to save projects to localStorage:', e);
    }
  };

  return (
    <ProjectsContext.Provider value={{ projects, setProjects, resetProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};
