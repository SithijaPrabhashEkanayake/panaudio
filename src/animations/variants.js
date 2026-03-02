export const glassEntrance = {
    initial: { opacity: 0, y: 28, scale: 0.96, filter: 'blur(10px)' },
    animate: {
        opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
        transition: { duration: 0.60, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
        opacity: 0, y: -12, scale: 0.98, filter: 'blur(6px)',
        transition: { duration: 0.25, ease: [0.45, 0.05, 0.55, 0.95] }
    }
};

export const cardStagger = {
    animate: { transition: { staggerChildren: 0.075, delayChildren: 0.10 } }
};

export const cardItem = {
    initial: { opacity: 0, y: 20, scale: 0.97 },
    animate: {
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.50, ease: [0.22, 1, 0.36, 1] }
    }
};

export const pageTransition = {
    initial: { opacity: 0, scale: 0.975, filter: 'blur(4px)' },
    animate: {
        opacity: 1, scale: 1, filter: 'blur(0px)',
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
        opacity: 0, scale: 1.015, filter: 'blur(3px)',
        transition: { duration: 0.28, ease: [0.45, 0.05, 0.55, 0.95] }
    }
};
