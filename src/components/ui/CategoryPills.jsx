import React from 'react';

const CategoryPills = ({ categories = [], active, onChange }) => {
    return (
        <div className="sticky top-[72px] z-30 w-full py-4 bg-bg-base/90 backdrop-blur-md border-b border-border-soft overflow-x-auto hide-scrollbar">
            <div className="container mx-auto px-6 max-w-7xl flex items-center gap-3 w-max min-w-full md:w-full md:flex-wrap">
                {categories.map((cat) => {
                    const isActive = active === cat;
                    return (
                        <button
                            key={cat}
                            onClick={() => onChange(cat)}
                            className={`px-5 py-2 rounded-pill font-sans font-medium text-[14px] transition-all duration-300 ease-out flex-shrink-0 border ${isActive
                                    ? 'bg-accent text-white shadow-accent border-accent'
                                    : 'glass-light text-text-secondary hover:text-accent border-white/50 hover:border-accent'
                                }`}
                        >
                            {cat}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryPills;
