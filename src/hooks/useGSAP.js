import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useGSAP = (callback, dependencies = []) => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(callback, containerRef);
        return () => ctx.revert();
    }, [callback, ...dependencies]);

    return containerRef;
};

export default useGSAP;
