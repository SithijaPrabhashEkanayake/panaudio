import React, { useState } from 'react';
import { Shield, Star, Lightbulb, Users, HeartHandshake, X, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import VideoHero from '../components/ui/VideoHero';
import SectionEyebrow from '../components/ui/SectionEyebrow';
import GlassPanel from '../components/ui/GlassPanel';
import useGSAP from '../hooks/useGSAP';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
    { year: '1984', title: 'Founded', desc: 'First 3M distributor in Sri Lanka.' },
    { year: '1985+', title: 'Expansion', desc: 'Sole Imation distributor and HP Platinum Partner.' },
    { year: '2000s', title: 'Global Brands', desc: 'Secured IBM, Sony, EIKI, and DSPPA partnerships.' },
    { year: '2016', title: 'Turnkey Integration', desc: 'Expanded into full-scale AV and Networking projects.' },
    { year: 'Today', title: 'Technology Leaders', desc: 'Over 40 years of Pan-regional technology excellence.' }
];

const values = [
    { icon: Shield, label: 'Reliability' },
    { icon: Star, label: 'Service Excellence' },
    { icon: Lightbulb, label: 'Innovation' },
    { icon: HeartHandshake, label: 'Trust' },
    { icon: Users, label: 'Partnership' }
];

const galleryImages = [
    '/gallery/IMG_5157.JPG',
    '/gallery/IMG_5164.JPG',
    '/gallery/IMG_5167.JPG',
    '/gallery/IMG_5174.JPG',
    '/gallery/IMG_8769.JPG',
    '/gallery/IMG_8789.JPG',
    '/gallery/IMG_8793.JPG',
    '/gallery/IMG_8822.JPG',
    '/gallery/IMG_8824.JPG',
    '/gallery/IMG_8827.JPG',
    '/gallery/IMG_8847 COPY.JPG',
    '/gallery/IMG_8883.JPG',
    '/gallery/IMG_E8769.JPG',
    '/gallery/IMG_E8784.JPG',
    '/gallery/IMG_E8793.JPG',
    '/gallery/IMG_E8803.JPG',
    '/gallery/IMG_E8804.JPG',
    '/gallery/IMG_E8807.JPG',
    '/gallery/IMG_E8814.JPG',
    '/gallery/IMG_E8818.JPG'
];

const AboutPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (image, index) => {
        setSelectedImage(image);
        setCurrentIndex(index);
    };

    const closeLightbox = () => setSelectedImage(null);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
        setSelectedImage(galleryImages[(currentIndex + 1) % galleryImages.length]);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
        setSelectedImage(galleryImages[(currentIndex - 1 + galleryImages.length) % galleryImages.length]);
    };

    const containerRef = useGSAP(() => {
        gsap.from('.timeline-line', {
            scaleY: 0,
            transformOrigin: 'top center',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.timeline-section',
                start: 'top 70%',
                end: 'bottom 30%',
                scrub: 0.5
            }
        });

        gsap.from('.timeline-milestone', {
            opacity: 0,
            x: -24,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.timeline-section',
                start: 'top 70%'
            }
        });

        gsap.to('.leader-image', {
            boxShadow: '0 0 36px rgba(232,71,28,0.40), 0 16px 48px rgba(0,0,0,0.12)',
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.leader-section',
                start: 'top 60%',
                toggleActions: 'play none none reverse'
            }
        });

        gsap.from('.gallery-item', {
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            stagger: 0.05,
            scrollTrigger: {
                trigger: '.gallery-section',
                start: 'top 80%'
            }
        });
    });

    return (
        <div ref={containerRef} className="flex flex-col w-full bg-bg-base">
            <VideoHero
                videoSrc="/about-us-hero.webm"
                posterSrc="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
            >
                <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center justify-center text-center">
                    <div className="glass-light p-8 md:p-12 rounded-3xl max-w-4xl" style={{ backgroundColor: 'rgba(247,247,245,0.10)' }}>
                        <SectionEyebrow className="hero-eyebrow justify-center mb-6 text-white border-white">
                            <span className="text-white tracking-[0.15em]">OUR STORY</span>
                        </SectionEyebrow>
                        <h1 className="hero-word font-sora text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
                            About Pan Audio
                        </h1>
                        <p className="hero-subtext font-sans text-xl text-white/80 max-w-2xl mx-auto font-light">
                            Four Decades of Technology Excellence
                        </p>
                    </div>
                </div>
            </VideoHero>

            {/* SECTION 2 — Founding Story */}
            <section className="timeline-section py-24 container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    <div className="w-full lg:w-[60%] relative flex feature-timeline">
                        {/* The vertical line */}
                        <div className="absolute left-[13px] md:left-[19px] top-2 bottom-0 w-[2px] bg-border-soft">
                            <div className="timeline-line w-full h-full bg-accent origin-top" />
                        </div>

                        <div className="flex flex-col gap-12 w-full z-10 pl-12 md:pl-16">
                            {milestones.map((m, i) => (
                                <div key={i} className="timeline-milestone relative group">
                                    {/* Circle dot placed on the line */}
                                    <div className="absolute -left-[48px] md:-left-[64px] top-1.5 w-7 h-7 bg-bg-base border-[3px] border-border-soft rounded-full flex items-center justify-center transition-colors duration-500 group-hover:border-accent">
                                        <div className="w-2.5 h-2.5 rounded-full bg-transparent transition-colors duration-500 group-hover:bg-accent" />
                                    </div>
                                    <div className="text-accent font-mono text-xl mb-1">{m.year}</div>
                                    <h3 className="font-sora font-semibold text-[20px] text-text-primary mb-2">{m.title}</h3>
                                    <p className="font-sans text-[16px] text-text-secondary leading-relaxed">{m.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full lg:w-[40%] sticky top-32">
                        <GlassPanel variant="light" className="p-10">
                            <SectionEyebrow className="mb-6">OUR HERITAGE</SectionEyebrow>
                            <h2 className="font-sora font-semibold text-3xl mb-6 text-text-primary">A Legacy of Innovation</h2>
                            <p className="font-serif text-text-secondary leading-relaxed mb-6 text-[17px]">
                                Established in 1984, Pan Audio began its journey introducing revolutionary 3M products to the Sri Lankan market.
                            </p>
                            <p className="font-serif text-text-secondary leading-relaxed mb-6 text-[17px]">
                                From our roots in distribution, we've evolved into the region's premier technology integrator, engineering complete solutions covering AV, IT, and specialized electronics for enterprise and government sectors.
                            </p>
                            <p className="font-serif font-medium text-text-primary text-[17px]">
                                Today, our engineering footprint spans hundreds of critical installations, bringing global standards to local infrastructure.
                            </p>
                        </GlassPanel>
                    </div>
                </div>
            </section>

            {/* SECTION 3 — Leader's Profile */}
            <section className="leader-section py-24 bg-white border-y border-border-soft">
                <div className="container mx-auto px-6 max-w-7xl">
                    <GlassPanel variant="light" className="flex flex-col md:flex-row overflow-hidden border border-border-soft/50 rounded-3xl p-0">
                        <div className="w-full md:w-[45%] h-[400px] md:h-auto p-4 md:p-8">
                            <img
                                src="/team/sebastian.png"
                                alt="Mr. Sebastian Karunakaran, Managing Director"
                                width={450}
                                height={500}
                                className="leader-image w-full h-full rounded-2xl object-cover object-top transition-all duration-300 shadow-3"
                            />
                        </div>
                        <div className="w-full md:w-[55%] p-10 md:p-16 flex flex-col justify-center">
                            <SectionEyebrow className="mb-6">LEADERSHIP</SectionEyebrow>
                            <h2 className="font-sora font-semibold text-[28px] text-text-primary mb-2">Mr. Sebastian Karunakaran</h2>
                            <div className="font-sans text-[14px] text-accent uppercase tracking-wider font-semibold mb-6">
                                Managing Director
                            </div>
                            <p className="font-sans text-[16px] text-text-secondary leading-relaxed mb-4">
                                "Our guiding philosophy has always been to anticipate the technological needs of tomorrow and integrate them today. We don't just supply equipment; we architect experiences that empower organizations to communicate and operate without friction."
                            </p>
                            <p className="font-sans text-[16px] text-text-secondary leading-relaxed">
                                Under his leadership, Pan Audio transitioned from a hardware distributor to a comprehensive solutions provider, securing exclusive partnerships with global titans and delivering some of the most complex integration projects in the nation's history.
                            </p>
                        </div>
                    </GlassPanel>
                </div>
            </section>

            {/* SECTION 4 — Vision & Mission */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 30% 50%, rgba(232,71,28,0.06), transparent 50%)' }} />
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <GlassPanel variant="dark" className="p-12 md:p-16">
                            <div className="text-accent font-sans font-bold text-sm uppercase tracking-[0.15em] mb-6">VISION</div>
                            <p className="font-sora text-2xl leading-relaxed text-white font-light">
                                "To push boundaries, pioneering through the constantly evolving world of technology to create seamless experiences for our clients."
                            </p>
                        </GlassPanel>

                        <GlassPanel variant="light" className="p-12 md:p-16">
                            <div className="text-accent font-sans font-bold text-sm uppercase tracking-[0.15em] mb-6">MISSION</div>
                            <p className="font-sora text-2xl leading-relaxed text-text-primary font-light">
                                "Bringing total synergy and fluidity within the spheres of technology and service to the region."
                            </p>
                        </GlassPanel>
                    </div>
                </div>
            </section>

            {/* SECTION 5 — Core Values */}
            <section className="py-16 bg-bg-pure border-t border-border-soft overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl mb-12 text-center flex justify-center">
                    <SectionEyebrow className="mb-4">OUR CORE VALUES</SectionEyebrow>
                </div>
                <div className="flex px-6 gap-6 overflow-x-auto pb-8 snap-x hide-scrollbar max-w-7xl mx-auto">
                    {values.map((val, i) => (
                        <GlassPanel key={i} variant="light" className="flex-shrink-0 w-[240px] p-8 flex flex-col items-center justify-center text-center snap-center border border-border-soft">
                            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4 text-accent">
                                <val.icon strokeWidth={1.5} className="w-7 h-7" />
                            </div>
                            <h3 className="font-sora font-semibold text-text-primary text-lg">{val.label}</h3>
                        </GlassPanel>
                    ))}
                </div>
            </section>

            {/* SECTION 6 — EIKI 73 Years Badge */}
            <section className="py-20 bg-[#131110]">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12 text-center md:text-left">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center shadow-accent-lg">
                            <div className="text-center text-white">
                                <div className="font-sora font-bold text-3xl">73</div>
                                <div className="font-sans text-[10px] uppercase tracking-wider">Years</div>
                            </div>
                        </div>
                        <div className="max-w-xl">
                            <div className="text-accent font-sans font-semibold text-sm uppercase tracking-wider mb-2">Proud Partner Since 1952</div>
                            <h3 className="font-sora font-semibold text-3xl md:text-4xl text-white mb-4">EIKI — 73 Years of Industry Excellence</h3>
                            <p className="font-sans text-[#A8A09A] text-lg leading-relaxed">
                                EIKI has been at the forefront of projection technology for over seven decades, delivering exceptional visual solutions trusted by professionals worldwide.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 7 — Photo Gallery */}
            <section className="gallery-section py-24 bg-bg-base border-t border-border-soft">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-12">
                        <SectionEyebrow className="mb-4">GALLERY</SectionEyebrow>
                        <h2 className="font-sora font-semibold text-3xl md:text-5xl text-text-primary mb-4">Our Work & Events</h2>
                        <p className="font-sans text-text-secondary text-lg max-w-2xl mx-auto">
                            Capturing moments from our installations, events, and team activities across Sri Lanka.
                        </p>
                    </div>
                    
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {galleryImages.map((image, index) => {
                            const heights = { 0: 280, 1: 200, 2: 240 };
                            const h = heights[index % 3];
                            const widths = { 0: 420, 1: 280, 2: 360 };
                            const w = widths[index % 3];
                            return (
                                <motion.div
                                    key={index}
                                    className="gallery-item relative overflow-hidden rounded-xl cursor-pointer group break-inside-avoid"
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => openLightbox(image, index)}
                                >
                                    <img
                                        src={image}
                                        alt={`Gallery image ${index + 1} of Pan Audio projects and events`}
                                        width={w}
                                        height={h}
                                        className="w-full transition-transform duration-500 group-hover:scale-110"
                                        style={{ 
                                            height: h,
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-full bg-white/0 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300">
                                            <span className="text-white opacity-0 group-hover:opacity-100 text-2xl">+</span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={closeLightbox}
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, y: 100 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.5, opacity: 0, y: 100 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="relative max-w-4xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage}
                                alt="Gallery full view"
                                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                            />
                            
                            <button
                                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                                onClick={closeLightbox}
                            >
                                <X className="w-5 h-5" />
                            </button>
                            
                            <div className="flex items-center justify-between mt-4">
                                <button
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                                    onClick={prevImage}
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                
                                <div className="text-white font-sans text-sm">
                                    {currentIndex + 1} / {galleryImages.length}
                                </div>
                                
                                <button
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                                    onClick={nextImage}
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AboutPage;
