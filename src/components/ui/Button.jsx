import React from 'react';

const Button = ({ variant = 'primary', size = 'md', icon: Icon, className = '', children, onClick, ...props }) => {
    const baseClasses = 'inline-flex items-center justify-center font-sans font-semibold transition-all duration-300 focus:outline-none';

    const sizeClasses = {
        sm: 'text-sm px-4 py-2 h-9',
        md: 'text-[15px] px-6 py-3 h-11',
        lg: 'text-base px-8 py-4 h-14',
    };

    const variantClasses = {
        primary: 'bg-accent text-white rounded-pill animate-glow-pulse hover:bg-accent-hover hover:-translate-y-[2px] hover:shadow-accent-lg',
        secondary: 'glass-light border border-border-soft text-text-primary rounded-xl hover:border-accent hover:text-accent',
        ghost: 'bg-transparent border border-accent text-accent rounded-pill hover:bg-accent/10',
    };

    return (
        <button
            className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {Icon && <Icon className="w-5 h-5 mr-2" strokeWidth={1.5} />}
            {children}
        </button>
    );
};

export default Button;
