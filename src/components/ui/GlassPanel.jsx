import React from 'react';

const GlassPanel = ({ variant = 'light', className = '', children, onClick }) => {
    const getVariantClass = () => {
        switch (variant) {
            case 'dark': return 'glass-dark';
            case 'nav': return 'glass-nav';
            case 'modal': return 'glass-modal';
            case 'light':
            default:
                return 'glass-light hover:-translate-y-1 transition-transform duration-300';
        }
    };

    return (
        <div
            className={`${getVariantClass()} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default GlassPanel;
