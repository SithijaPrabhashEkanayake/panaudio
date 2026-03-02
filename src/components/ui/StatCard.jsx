import React from 'react';

const StatCard = ({ number, suffix = '', label }) => {
    return (
        <div className="glass-light p-6 md:p-8 flex flex-col items-center justify-center text-center rounded-2xl transition-transform hover:-translate-y-1 duration-300">
            <div className="flex items-baseline mb-2">
                <span className="font-sora font-bold text-5xl md:text-[56px] text-text-primary tracking-tight">
                    {/* Typically this number will be animated via GSAP when used in the actual page */}
                    <span className="stat-number">{number}</span>
                </span>
                <span className="font-sora font-semibold text-3xl text-accent ml-1">
                    {suffix}
                </span>
            </div>
            <p className="font-sans font-medium text-[12px] uppercase tracking-[0.10em] text-text-secondary">
                {label}
            </p>
        </div>
    );
};

export default StatCard;
