import React from 'react';

const TestimonialCard = ({ quote, name, designation, org, orgLogo }) => {
    return (
        <div className="glass-light p-8 relative overflow-hidden flex flex-col h-full rounded-2xl">
            {/* Large quote mark */}
            <div className="absolute top-4 left-4 text-[80px] leading-none font-sora text-accent opacity-[0.15] select-none pointer-events-none">
                "
            </div>

            <div className="relative z-10 flex-grow">
                <p className="font-sans italic text-[16px] md:text-[18px] text-text-primary leading-relaxed mb-8">
                    "{quote}"
                </p>
            </div>

            <div className="relative z-10 flex items-center justify-between mt-auto pt-4 border-t border-border-soft">
                <div>
                    <h4 className="font-sans font-bold text-[16px] text-text-primary">
                        {name}
                    </h4>
                    <p className="font-sans font-medium text-[13px] text-text-secondary">
                        {designation}{org ? `, ${org}` : ''}
                    </p>
                </div>
                {orgLogo && (
                    <img src={orgLogo} alt={org || 'Organization'} className="h-8 object-contain max-w-[80px]" />
                )}
            </div>
        </div>
    );
};

export default TestimonialCard;
