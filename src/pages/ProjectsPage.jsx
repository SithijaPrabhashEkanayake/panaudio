import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoHero from '../components/ui/VideoHero';
import SectionEyebrow from '../components/ui/SectionEyebrow';
import CategoryPills from '../components/ui/CategoryPills';
import ProjectCard from '../components/ui/ProjectCard';
import ProjectModal from '../components/ui/ProjectModal';
import TestimonialCard from '../components/ui/TestimonialCard';

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/projects');
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data);
                }
            } catch (err) {
                console.error("Failed to fetch projects:", err);
            }
        };
        fetchProjects();
    }, []);

    const categories = ['All', 'Government & Education', 'Corporate', 'Healthcare & Government', 'Specialised & Private'];

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(p => p.category === activeCategory || p.category.includes(activeCategory));

    return (
        <div className="flex flex-col w-full bg-bg-base">
            {/* SECTION 1 — Projects Hero */}
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

            {/* SECTION 2 — Category Filter Pills */}
            <CategoryPills
                categories={categories}
                active={activeCategory}
                onChange={setActiveCategory}
            />

            {/* SECTION 3 — Projects Grid */}
            <section className="py-24 container mx-auto px-6 max-w-7xl min-h-[60vh]">
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredProjects.map((proj) => (
                            <motion.div
                                key={proj.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className="h-full"
                            >
                                <ProjectCard {...proj} projectName={proj.name} onClick={() => setSelectedProject(proj)} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </section>

            {/* SECTION 4 — Testimonials */}
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

            {/* Project Modal */}
            <ProjectModal
                selectedProject={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </div>
    );
};

export default ProjectsPage;
