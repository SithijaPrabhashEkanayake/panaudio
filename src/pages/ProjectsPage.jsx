import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoHero from '../components/ui/VideoHero';
import SectionEyebrow from '../components/ui/SectionEyebrow';
import TestimonialCard from '../components/ui/TestimonialCard';
import { ChevronDown } from 'lucide-react';
import { useProjects } from '../context/ProjectsContext';
import { sectorColors } from '../data/projects';

const sectors = ['All', 'Government', 'Education', 'Media', 'Healthcare', 'Telecom', 'Private/Commercial'];

const ProjectsPage = () => {
  const { projects } = useProjects();
  const [expandedClient, setExpandedClient] = useState(null);
  const [activeSector, setActiveSector] = useState('All');

  const filteredProjects = useMemo(() => {
    const filtered = activeSector === 'All' 
      ? projects
      : projects.filter(p => p.sector === activeSector);
    
    const groups = {};
    filtered.forEach(project => {
      if (!groups[project.client]) {
        groups[project.client] = {
          sector: project.sector,
          image: project.image || null,
          projects: []
        };
      }
      groups[project.client].projects.push({
        year: project.year,
        name: project.name
      });
    });

    Object.keys(groups).forEach(client => {
      groups[client].projects.sort((a, b) => parseInt(a.year) - parseInt(b.year));
    });

    return groups;
  }, [projects, activeSector]);

  const clients = Object.keys(filteredProjects);
  const totalProjects = projects.length;
  const filteredTotal = Object.values(filteredProjects).reduce((sum, client) => sum + client.projects.length, 0);

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor: '#FFFFE3' }}>
      <VideoHero
        videoSrc="/project-hero.webm"
        posterSrc="https://placehold.co/1920x1080/131110/FFFFFF?text=Our+Work"
      >
        <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center justify-center text-center">
          <div className="glass-light p-8 md:p-12 rounded-3xl max-w-4xl" style={{ backgroundColor: 'rgba(247,247,245,0.10)' }}>
            <SectionEyebrow className="hero-eyebrow justify-center mb-6 text-white border-white">
              <span className="text-white tracking-[0.15em]">OUR WORK</span>
            </SectionEyebrow>
            <h1 className="hero-word font-sora text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Delivering Excellence
            </h1>
            <p className="hero-subtext font-sans text-xl text-white/80 max-w-2xl mx-auto font-light">
              Across Sri Lanka and Beyond
            </p>
          </div>
        </div>
      </VideoHero>

      <section className="py-16 container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-sora text-2xl md:text-3xl font-semibold text-text-primary mb-2">Our Projects</h2>
            <p className="font-sans text-text-secondary">Browse through our completed projects by client</p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="font-sora text-3xl font-bold text-accent">{clients.length}</p>
              <p className="font-sans text-sm text-text-muted">Total Clients</p>
            </div>
            <div className="text-center">
              <p className="font-sora text-3xl font-bold text-accent">{activeSector === 'All' ? totalProjects : filteredTotal}</p>
              <p className="font-sans text-sm text-text-muted">Total Projects</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-8">
          {sectors.map(sector => (
            <button
              key={sector}
              onClick={() => {
                setActiveSector(sector);
                setExpandedClient(null);
              }}
              style={activeSector === sector ? { 
                backgroundColor: '#E7471C', 
                color: 'white',
                boxShadow: '0 0 20px rgba(231, 71, 28, 0.5), 0 0 40px rgba(231, 71, 28, 0.3)' 
              } : {}}
              className={`px-4 py-1.5 rounded-pill font-sans font-medium text-[13px] transition-all duration-300 flex-shrink-0 ${activeSector === sector
                  ? ''
                  : 'glass-light text-text-secondary hover:text-text-primary border border-border-soft'
                  }`}
            >
              {sector}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {clients.map((client) => {
            const data = filteredProjects[client];
            const isExpanded = expandedClient === client;
            const color = sectorColors[data.sector] || sectorColors.Government;
            const projectCount = data.projects.length;

            return (
              <motion.div
                key={client}
                className="bg-bg-pure border border-border-soft rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  boxShadow: isExpanded 
                    ? `0 0 25px rgba(231, 71, 28, 0.25), 0 0 50px rgba(231, 71, 28, 0.1), inset 0 0 30px rgba(231, 71, 28, 0.03)`
                    : `0 0 15px rgba(231, 71, 28, 0.08), 0 0 30px rgba(231, 71, 28, 0.04)`,
                  borderColor: isExpanded ? 'rgba(231, 71, 28, 0.4)' : undefined,
                  transition: 'box-shadow 0.4s ease, border-color 0.4s ease'
                }}
              >
                <button
                  onClick={() => setExpandedClient(isExpanded ? null : client)}
                  className="w-full flex items-center justify-between p-5 md:p-6 hover:bg-bg-base/50 transition-colors text-left"
                >
                  <div className="flex flex-col gap-2 min-w-0 flex-grow pr-4">
                    <h3 className="font-sora font-semibold text-lg text-text-primary truncate">
                      {client}
                    </h3>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${color.bg} ${color.text} ${color.border}`}>
                        {data.sector}
                      </span>
                      <span className="font-sans text-sm text-text-muted">
                        {projectCount} {projectCount === 1 ? 'project' : 'projects'}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`w-6 h-6 text-text-muted shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border-soft overflow-hidden"
                    >
                      <div className="p-5 md:p-6 bg-bg-base/30">
                        {data.image && (
                          <div className="mb-5">
                            <img 
                              src={data.image} 
                              alt={client} 
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          </div>
                        )}
                        <div className="flex flex-col gap-3">
                          {data.projects.map((proj, idx) => (
                            <div key={idx} className="flex items-start gap-4">
                              <span className="font-mono text-sm font-semibold text-accent shrink-0 w-14">
                                {proj.year}
                              </span>
                              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                                {proj.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="py-24 bg-bg-pure border-t border-border-soft overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl mb-16 flex flex-col items-center text-center">
          <SectionEyebrow className="mb-4">CLIENT SUCCESS STORIES</SectionEyebrow>
          <h2 className="font-sora font-semibold text-3xl md:text-5xl text-text-primary">Hear From Our Partners</h2>
        </div>

        <div className="flex px-6 gap-6 overflow-x-auto pb-12 snap-x hide-scrollbar max-w-7xl mx-auto">
          <div className="w-[85vw] md:w-[400px] flex-shrink-0 snap-center">
            <TestimonialCard
              quote="Pan Audio delivered beyond our expectations. Their technical expertise with the AV systems for our new boardroom was phenomenal."
              name="Harsha Silva" designation="IT Director" org="Orion City"
            />
          </div>
          <div className="w-[85vw] md:w-[400px] flex-shrink-0 snap-center">
            <TestimonialCard
              quote="The surveillance system implementation scale across multiple sites was handled flawlessly. Their after-sales support is unmatched."
              name="Amal Perera" designation="Head of Security" org="Abans Group"
            />
          </div>
          <div className="w-[85vw] md:w-[400px] flex-shrink-0 snap-center">
            <TestimonialCard
              quote="Reliable, highly professional, and an absolute pleasure to work with. They've been setting the standard for AV integrators."
              name="Dr. Kamalini" designation="Chief Administrator" org="IDH Hospital"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
