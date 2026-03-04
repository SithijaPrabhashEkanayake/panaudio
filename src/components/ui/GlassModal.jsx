import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { glassEntrance } from '../../animations/variants';

const GlassModal = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100]">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#131110]/55 backdrop-blur-md -z-10"
                        onClick={onClose}
                    />
                    <motion.div
                        variants={glassEntrance}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-modal w-[90vw] md:w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8 rounded-3xl"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 md:top-6 md:right-6 glass-light w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors z-20"
                            aria-label="Close Modal"
                        >
                            <X className="w-5 h-5 text-text-primary" />
                        </button>
                        {children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default GlassModal;
