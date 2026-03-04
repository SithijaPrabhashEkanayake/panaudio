import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectCard = ({ id, image, projectName, client, category, scope, onClick }) => {

    const getCategoryColor = (cat = '') => {
        const c = cat.toLowerCase();
        if (c.includes('gov') || c.includes('education')) return 'bg-accent text-white';
        if (c.includes('healthcare')) return 'bg-success/10 text-success border border-success/20';
        if (c.includes('private')) return 'bg-purple-100 text-purple-700 border border-purple-200';
        return 'bg-blue-50 text-blue-600 border border-blue-100'; // Corporate / default
    };

    return (
        <motion.div
            layoutId={`project-card-${id}`}
            onClick={onClick}
            className={`group bg-white rounded-xl overflow-hidden shadow-1 border border-border-soft flex flex-col transition-all duration-300 h-full ${onClick ? 'hover:shadow-4 hover:-translate-y-[6px] cursor-pointer' : ''}`}
        >
            {/* Image Area */}
            <div className="relative aspect-[16/10] overflow-hidden bg-bg-base">
                <motion.img
                    layoutId={`project-image-${id}`}
                    src={image ? `http://localhost:5000${image}` : `https://picsum.photos/800/500?random=${Math.floor(Math.random() * 1000)}`}
                    alt={projectName}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                />
                {/* Category Badge */}
                <div className={`absolute top-3 right-3 rounded-pill px-3 py-1 text-[11px] font-sans font-bold uppercase tracking-wider ${getCategoryColor(category)}`}>
                    {category}
                </div>
            </div>

            {/* Body Area */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="text-text-muted text-[13px] font-sans font-medium mb-1">
                    {client}
                </div>
                <h3 className="font-sora font-semibold text-[20px] text-text-primary leading-tight mb-2">
                    {projectName}
                </h3>
                <p className="font-sans text-[14px] text-text-secondary leading-relaxed line-clamp-2 mb-4 flex-grow">
                    {scope}
                </p>
                {onClick && (
                    <div className="flex items-center text-accent font-sans font-semibold text-[14px] group-hover:text-accent-hover transition-colors mt-auto">
                        View Details <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ProjectCard;
