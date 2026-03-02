import React from 'react';

const SectionEyebrow = ({ children, className = '' }) => {
    return (
        <div className={`flex items-center font-sans font-medium text-[12px] uppercase tracking-[0.10em] text-accent ${className}`}>
            <span className="w-7 h-[1.5px] bg-accent mr-3 inline-block"></span>
            {children}
        </div>
    );
};

export default SectionEyebrow;
