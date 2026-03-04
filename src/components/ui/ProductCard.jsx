import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ id, image, brand, brandLogo, category, name, description, price, onClick }) => {
    return (
        <motion.div
            layoutId={`product-card-${id}`}
            onClick={onClick}
            className="group bg-white rounded-xl overflow-hidden shadow-1 hover:shadow-4 hover:-translate-y-[6px] transition-all duration-300 cursor-pointer border border-border-soft flex flex-col h-full"
        >
            {/* Image Area */}
            <div className="relative aspect-[16/10] overflow-hidden bg-bg-base">
                <motion.img
                    layoutId={`product-image-${id}`}
                    src={image ? `http://localhost:5000${image}` : `https://placehold.co/800x500/E8471C/FFFFFF?text=${encodeURIComponent(name || 'Product')}`}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                />
                {/* Brand Badge */}
                {brand && (
                    <div className="absolute top-3 right-3 glass-dark rounded-pill px-3 py-1 flex items-center gap-2">
                        {brandLogo ? (
                            <img src={brandLogo} alt={brand} className="h-4 object-contain" />
                        ) : (
                            <span className="text-white text-xs font-sans font-medium">{brand}</span>
                        )}
                    </div>
                )}
            </div>

            {/* Body Area */}
            <div className="p-5 flex flex-col flex-grow">
                <span className="text-accent text-[11px] font-sans font-bold uppercase tracking-wider mb-2">
                    {category}
                </span>
                <h3 className="font-sora font-semibold text-[20px] text-text-primary leading-tight mb-2">
                    {name}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-3 h-3 fill-accent text-accent" />
                    ))}
                    <span className="text-xs text-text-muted ml-1">(4.9)</span>
                </div>
                <p className="font-sora font-bold text-lg text-text-primary mb-3">
                    {price || 'Contact for Quote'}
                </p>
                <p className="font-sans text-[14px] text-text-secondary leading-relaxed line-clamp-2 mb-4 flex-grow">
                    {description}
                </p>
                <div className="flex items-center text-accent font-sans font-semibold text-[14px] group-hover:text-accent-hover transition-colors mt-auto">
                    View Details <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
