import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';
import { API_URL } from '../../config';

const ProductModal = ({ selectedProduct, onClose }) => {
    if (!selectedProduct) return null;

    return (
        typeof document !== 'undefined' && createPortal(
            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-hidden"
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, height: '100vh', width: '100vw' }}>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#131110]/55 backdrop-blur-md"
                            onClick={onClose}
                        />

                        {/* Modal Content */}
                        <motion.div
                            layoutId={`product-card-${selectedProduct.id}`}
                            className="relative w-full max-w-5xl max-h-[90vh] glass-modal bg-bg-base/95 backdrop-blur-xl border border-border-soft overflow-hidden rounded-[2rem] shadow-2xl z-10 flex flex-col md:flex-row p-6 md:p-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 md:top-6 md:right-6 glass-light w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors z-20"
                                aria-label="Close Modal"
                            >
                                <X className="w-5 h-5 text-text-primary" />
                            </button>

                            <div className="flex flex-col md:flex-row gap-6 md:gap-8 h-full w-full max-h-[calc(90vh-[4rem])] overflow-hidden">
                                {/* Image Section */}
                                <div className="w-full md:w-1/2 flex-shrink-0 h-full">
                                    <div className="aspect-video md:aspect-square lg:aspect-[4/3] max-h-[40vh] md:max-h-[60vh] h-full rounded-2xl overflow-hidden bg-bg-base relative shadow-3">
                                        <motion.img
                                            layoutId={`product-image-${selectedProduct.id}`}
                                            src={selectedProduct.image ? `${API_URL}${selectedProduct.image}` : `https://placehold.co/800x600/E8471C/FFFFFF?text=${encodeURIComponent(selectedProduct.name || 'Product')}`}
                                            alt={selectedProduct.name}
                                            className="w-full h-full object-cover md:object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Details Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                    className="w-full md:w-1/2 flex flex-col pt-2 pb-4 overflow-y-auto custom-scrollbar pr-2 h-full"
                                >
                                    <div className="glass-dark inline-block rounded-pill px-4 py-1.5 text-white text-xs font-sans font-bold uppercase tracking-wider mb-4 w-max shrink-0">
                                        {selectedProduct.brand}
                                    </div>
                                    <h2 className="font-sora font-bold text-2xl md:text-3xl lg:text-4xl text-text-primary mb-2 leading-tight shrink-0">
                                        {selectedProduct.name}
                                    </h2>

                                    <div className="flex items-center gap-1 mb-2 shrink-0">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className="w-4 h-4 fill-accent text-accent" />
                                        ))}
                                        <span className="text-sm text-text-muted ml-2">(4.9 out of 5)</span>
                                    </div>

                                    <p className="font-sora font-bold text-2xl text-text-primary mb-4 shrink-0">
                                        {selectedProduct.price || 'Contact for Quote'}
                                    </p>

                                    <p className="font-sans text-[13px] font-bold text-accent uppercase tracking-wider mb-6 shrink-0">
                                        {selectedProduct.category}
                                    </p>

                                    <p className="font-sans text-text-secondary text-base md:text-lg leading-relaxed mb-8">
                                        {selectedProduct.description}
                                    </p>

                                    <div className="bg-bg-base/50 rounded-2xl p-6 border border-border-soft font-mono text-[13px] text-text-primary mt-auto shrink-0">
                                        <table className="w-full">
                                            <tbody>
                                                <tr><td className="py-2 text-text-muted w-1/3">Brand</td><td className="py-2 font-medium">{selectedProduct.brand}</td></tr>
                                                <tr className="border-t border-border-soft/50"><td className="py-2 text-text-muted">Type</td><td className="py-2 font-medium">{selectedProduct.category}</td></tr>
                                                <tr className="border-t border-border-soft/50"><td className="py-2 text-text-muted">Availability</td><td className="py-2 font-medium text-success">In Stock / Order</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>,
            document.body
        )
    );
};

export default ProductModal;
