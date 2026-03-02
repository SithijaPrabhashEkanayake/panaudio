import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useGSAP from '../../hooks/useGSAP';

gsap.registerPlugin(ScrollTrigger);

const VideoHero = ({ videoSrc, posterSrc, overlayOpacity = 0.70, children }) => {
    const containerRef = useGSAP(() => {
        const c = containerRef.current;
        if (!c) return;

        gsap.to('.hero-video-bg', {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: c,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        // Hero text entrance
        const tl = gsap.timeline({ delay: 0.3 });
        if (c.querySelector('.hero-eyebrow')) {
            tl.from('.hero-eyebrow', { opacity: 0, y: 14, duration: 0.4, ease: 'power2.out' }, 0);
        }
        if (c.querySelector('.hero-word')) {
            tl.from('.hero-word', { opacity: 0, y: 32, duration: 0.55, ease: [0.22, 1, 0.36, 1], stagger: 0.06 }, 0.3);
        }
        if (c.querySelector('.hero-subtext')) {
            tl.from('.hero-subtext', { opacity: 0, y: 16, duration: 0.45, ease: 'power2.out' }, 0.65);
        }
        if (c.querySelector('.hero-cta-group')) {
            tl.from('.hero-cta-group', { opacity: 0, y: 12, scale: 0.97, duration: 0.45, ease: [0.34, 1.56, 0.64, 1], clearProps: 'all' }, 0.7);
        }
    });

    return (
        <section ref={containerRef} className="hero-section relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center">
            <video key={videoSrc}
                className="hero-video-bg absolute inset-0 w-full h-[120%] object-cover z-0 -top-[10%]"
                style={{ filter: 'brightness(0.6)' }}
                autoPlay
                muted
                loop
                playsInline
                poster={posterSrc}
            >
                <source src={videoSrc} type={videoSrc?.endsWith('.webm') ? "video/webm" : "video/mp4"} />
            </video>
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(19,17,16,0.3), rgba(19,17,16,0.7))`
                }}
            />
            <div className="relative z-30 w-full h-full flex items-center justify-center">
                {children}
            </div>
        </section>
    );
};

export default VideoHero;
