import React from 'react';

const FloatingLabel = ({ icon: Icon, text, position, className = '' }) => {
    return (
        <div
            className={`floating-label absolute flex items-center gap-2 glass-dark rounded-pill px-3 py-1.5 text-white text-[13px] font-sans font-medium z-20 ${className}`}
            style={position}
        >
            <svg className="absolute -z-10 pointer-events-none opacity-50" style={{ width: '60px', height: '60px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} viewBox="0 0 100 100">
                <line x1="50" y1="50" x2="0" y2="0" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
            {Icon && <Icon className="w-4 h-4 text-accent" strokeWidth={1.5} />}
            <span>{text}</span>
        </div>
    );
};

export default FloatingLabel;
