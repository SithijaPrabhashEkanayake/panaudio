import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '../../config';

const ProjectCard = ({ id, projectName, client, category, scope, year, image, subProjects, index, isExpanded, onToggle }) => {
    const getCategoryColor = (cat = '') => {
        const c = cat.toLowerCase();
        if (c.includes('gov') || c.includes('education')) return 'bg-accent/10 text-accent border-accent/20';
        if (c.includes('healthcare')) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        if (c.includes('private')) return 'bg-purple-100 text-purple-700 border-purple-200';
        return 'bg-teal-100 text-teal-700 border-teal-200';
    };

    return (
        <motion.div
            className="group bg-bg-pure rounded-xl overflow-hidden border border-border-soft transition-all duration-300 cursor-pointer hover:shadow-md hover:border-border-soft/80"
            style={{ boxShadow: '0 0 20px rgba(231, 71, 28, 0.4)', maxWidth: '600px' }}
            layout
        >
            <div onClick={onToggle} className="flex items-center">
                <div className="w-1.5 bg-gradient-to-b from-accent to-accent/60 shrink-0 h-full"></div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 gap-2 flex-grow w-full">
                    <div className="flex flex-col gap-2 flex-grow min-w-0">
                        <div className="flex items-center gap-3">
                            <span className="text-text-muted text-[11px] font-sans font-medium tracking-wide uppercase truncate">
                                {client}
                            </span>
                        </div>

                        <h3 className="font-sora font-semibold text-sm md:text-base text-text-primary leading-tight truncate">
                            {projectName}
                        </h3>

                        <div className="flex items-center gap-3 flex-wrap">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getCategoryColor(category)}`}>
                                {category}
                            </span>
                            <span className="font-sans text-[12px] text-text-secondary truncate">
                                {scope}
                            </span>
                            {year && (
                                <span className="font-sans text-[12px] text-text-muted">
                                    • {year}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-end sm:min-w-[100px] shrink-0">
                        <div className="flex items-center text-accent font-sans font-medium text-[12px] group-hover:text-accent-hover transition-colors gap-1.5">
                            {isExpanded ? 'Close' : 'View'} <ArrowRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-border-soft overflow-hidden"
                    >
                        <div className="p-4 flex flex-col gap-4">
                            {image && (
                                <div className="w-full h-40 rounded-lg overflow-hidden">
                                    <img
                                        src={image.startsWith('http') ? image : `${API_URL}${image}`}
                                        alt={projectName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            <div className="flex flex-col gap-2">
                                <p className="font-sans text-[14px] text-text-secondary leading-relaxed">
                                    {scope}. This comprehensive installation involved careful planning, bespoke system design, and rigorous testing to align with the client's high standards.
                                </p>
                                <p className="font-sans italic text-[14px] text-text-primary border-l-2 border-accent pl-4 py-2">
                                    "Delivered a seamless integration resulting in robust operations and long-term reliability for {client}."
                                </p>
                            </div>

                            <div className="bg-dark-surface/5 rounded-xl p-4 border border-border-soft font-mono text-[12px] text-text-primary">
                                <table className="w-full">
                                    <tbody>
                                        <tr><td className="py-2 text-text-muted w-1/3">Client</td><td className="py-2 font-medium">{client}</td></tr>
                                        <tr className="border-t border-border-soft/50"><td className="py-2 text-text-muted">Sector</td><td className="py-2 font-medium">
                                            <span className="bg-accent/10 text-accent px-2 py-0.5 rounded font-sans font-bold uppercase text-[10px] tracking-wider">{category}</span>
                                        </td></tr>
                                        <tr className="border-t border-border-soft/50"><td className="py-2 text-text-muted">Solutions</td><td className="py-2 font-medium">{scope}</td></tr>
                                        <tr className="border-t border-border-soft/50"><td className="py-2 text-text-muted">Year</td><td className="py-2 font-medium">{year}</td></tr>
                                    </tbody>
                                </table>
                            </div>

                            {subProjects && subProjects.length > 0 && (
                                <div className="border-t border-border-soft pt-4">
                                    <p className="font-sans font-semibold text-[13px] text-text-secondary mb-3">Projects Completed at Location</p>
                                    <div className="space-y-2">
                                        {subProjects.map((sub, idx) => (
                                            <div key={idx} className="flex items-center justify-between bg-white/40 border border-border-soft rounded-lg p-3">
                                                <div>
                                                    <p className="font-semibold text-[13px] text-text-primary">{sub.name}</p>
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-accent/10 text-accent font-sans font-medium text-[10px] mt-1">
                                                        {sub.system}
                                                    </span>
                                                </div>
                                                <span className="font-mono text-[12px] text-text-muted">{sub.year || '2023'}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ProjectCard;
