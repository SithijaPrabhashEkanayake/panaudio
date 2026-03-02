import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useGSAP from '../../hooks/useGSAP';

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = ({ end, suffix = '', label, duration = 1.8 }) => {
    const numberRef = useRef(null);

    const containerRef = useGSAP(() => {
        gsap.from(numberRef.current, {
            textContent: 0,
            duration: duration,
            ease: 'power2.out',
            snap: { textContent: 1 },
            stagger: 0.15,
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                once: true
            }
        });
    });

    return (
        <div ref={containerRef} className="flex flex-col items-center justify-center text-center">
            <div className="flex items-baseline mb-2">
                <span className="font-sora font-bold text-4xl md:text-[40px] text-text-primary tracking-tight">
                    <span ref={numberRef} className="stat-number">{end}</span>
                </span>
                <span className="font-sora font-bold text-2xl md:text-3xl text-accent ml-1">
                    {suffix}
                </span>
            </div>
            <p className="font-sans font-medium text-[11px] md:text-[12px] uppercase tracking-[0.10em] text-text-secondary">
                {label}
            </p>
        </div>
    );
};

export default AnimatedCounter;
