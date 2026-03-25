import React from 'react';

const SectionEyebrow = ({ children, className = '' }) => {
    return (
        <div className={`flex items-center font-sans font-medium text-[12px] uppercase tracking-[0.10em] text-[#C02810] ${className}`}>
            {children}
        </div>
    );
};

export default SectionEyebrow;
