import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import SectionEyebrow from './SectionEyebrow';

const ProjectModal = ({ selectedProject, onClose }) => {
    if (!selectedProject) return null;

    return (
        typeof document !== 'undefined' && createPortal(
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-hidden"
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, height: '100vh', width: '100vw' }}>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#131110]/55 backdrop-blur-md"
                            onClick={onClose}
                        />

                        {/* Modal Content */}
                        <motion.div
                            layoutId={`project-card-${selectedProject.id}`}
                            className="relative w-full max-w-5xl max-h-[90vh] glass-modal bg-bg-base/95 backdrop-blur-xl border border-border-soft overflow-hidden rounded-[2rem] shadow-2xl z-10 p-6 md:p-8 flex flex-col gap-6 overflow-y-auto custom-scrollbar"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 md:top-6 md:right-6 glass-light w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors z-20"
                                aria-label="Close Modal"
                            >
                                <X className="w-5 h-5 text-text-primary" />
                            </button>

                            <div className="w-full aspect-video max-h-[40vh] rounded-2xl overflow-hidden shadow-3 relative shrink-0">
                                <motion.img
                                    layoutId={`project-image-${selectedProject.id}`}
                                    src={selectedProject.image ? `http://localhost:5000${selectedProject.image}` : `https://picsum.photos/1200/600?random=${Math.floor(Math.random() * 1000)}`}
                                    alt={selectedProject.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:p-8">
                                    <h2 className="font-sora font-bold text-2xl md:text-4xl lg:text-5xl text-white">
                                        {selectedProject.name}
                                    </h2>
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="flex flex-col md:flex-row gap-8 shrink-0 pb-4"
                            >
                                <div className="w-full md:w-2/3">
                                    <SectionEyebrow className="mb-4">Scope of Work</SectionEyebrow>
                                    <p className="font-sans text-[16px] text-text-secondary leading-relaxed mb-6">
                                        {selectedProject.scope}. This comprehensive installation involved careful planning, bespoke system design, and rigorous testing to align with the client's high standards.
                                    </p>
                                    <p className="font-sans italic text-[16px] text-text-primary border-l-2 border-accent pl-4 py-2">
                                        "Delivered a seamless integration resulting in robust operations and long-term reliability for {selectedProject.client}."
                                    </p>
                                </div>

                                <div className="w-full md:w-1/3">
                                    <div className="bg-dark-surface/5 rounded-2xl p-6 border border-border-soft font-mono text-[13px] text-text-primary">
                                        <table className="w-full">
                                            <tbody>
                                                <tr><td className="py-3 text-text-muted w-1/3">Client</td><td className="py-3 font-medium">{selectedProject.client}</td></tr>
                                                <tr className="border-t border-border-soft/50"><td className="py-3 text-text-muted">Sector</td><td className="py-3 font-medium">
                                                    <span className="bg-accent/10 text-accent px-2 py-1 rounded font-sans font-bold uppercase text-[10px] tracking-wider">{selectedProject.category}</span>
                                                </td></tr>
                                                <tr className="border-t border-border-soft/50"><td className="py-3 text-text-muted">Solutions</td><td className="py-3 font-medium">{selectedProject.scope}</td></tr>
                                                <tr className="border-t border-border-soft/50"><td className="py-3 text-text-muted">Year</td><td className="py-3 font-medium">2023</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>,
            document.body
        )
    );
};

export default ProjectModal;
