import React from 'react';
import { Scissors, CheckCircle, Zap, Monitor, Battery, Settings, PenTool, Wrench, Layers, MessageCircle, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoHero from '../components/ui/VideoHero';
import SectionEyebrow from '../components/ui/SectionEyebrow';
import GlassPanel from '../components/ui/GlassPanel';
import Button from '../components/ui/Button';
import useGSAP from '../hooks/useGSAP';
import { services } from '../data/services';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
    Scissors, CheckCircle, Zap, Monitor, Battery, Settings, PenTool, Wrench, Layers
};

const processSteps = [
    'Consultation', 'Design', 'Supply', 'Installation', 'Testing & Commissioning', 'Maintenance'
];

const ServicesPage = () => {
    const containerRef = useGSAP(() => {
        // Process timeline line animation
        gsap.from('.process-line', {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.process-section',
                start: 'top 75%',
                end: 'bottom 25%',
                scrub: 0.5
            }
        });

        // Milestone fill animations
        gsap.utils.toArray('.process-dot').forEach((dot, i) => {
            gsap.to(dot, {
                backgroundColor: '#E8471C',
                borderColor: '#E8471C',
                duration: 0.5,
                scrollTrigger: {
                    trigger: dot,
                    start: 'left center',
                    containerAnimation: null, // Depending on if horizontal scroll is used. Here it's a grid/flex wrapper.
                    toggleActions: 'play none none reverse'
                }
            });
        });
    });

    return (
        <div ref={containerRef} className="flex flex-col w-full bg-bg-base">
            {/* SECTION 1 — Services Hero */}
            <VideoHero
                videoSrc="/service-hero.webm"
                posterSrc="https://placehold.co/1920x1080/131110/FFFFFF?text=Technical+Services"
            >
                <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center justify-center text-center">
                    <div className="glass-light p-8 md:p-12 rounded-3xl max-w-4xl" style={{ backgroundColor: 'rgba(247,247,245,0.10)' }}>
                        <SectionEyebrow className="hero-eyebrow justify-center mb-6 text-white border-white">
                            <span className="text-white tracking-[0.15em]">EXPERT SUPPORT</span>
                        </SectionEyebrow>
                        <h1 className="hero-word font-sora text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            Technical Services
                        </h1>
                        <p className="hero-subtext font-sans text-xl text-white/80 max-w-2xl mx-auto font-light">
                            End-to-End Support by Certified Experts
                        </p>
                    </div>
                </div>
            </VideoHero>

            {/* SECTION 2 — Service Cards Grid */}
            <section className="py-24 container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-16 flex flex-col items-center">
                    <SectionEyebrow className="mb-4">WHAT WE OFFER</SectionEyebrow>
                    <h2 className="font-sora font-semibold text-3xl md:text-5xl text-text-primary">Professional Technical Services</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((svc) => {
                        const Icon = iconMap[svc.iconName] || Wrench;
                        return (
                            <GlassPanel key={svc.id} variant="light" className="p-8 flex flex-col">
                                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                                    <Icon strokeWidth={1.5} className="w-7 h-7 text-accent" />
                                </div>
                                <h3 className="font-sora font-semibold text-[20px] text-text-primary mb-3">
                                    {svc.title}
                                </h3>
                                <p className="font-sans text-[14px] text-text-secondary leading-relaxed">
                                    {svc.description}
                                </p>
                            </GlassPanel>
                        );
                    })}
                </div>
            </section>

            {/* SECTION 3 — Service Process Timeline */}
            <section className="process-section py-24 bg-white border-y border-border-soft overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-16 flex flex-col items-center">
                        <SectionEyebrow className="mb-4">OUR APPROACH</SectionEyebrow>
                        <h2 className="font-sora font-semibold text-3xl md:text-5xl text-text-primary">Turnkey Execution</h2>
                    </div>

                    <div className="relative mt-8 md:mt-16 mb-8 max-w-6xl mx-auto hidden md:block">
                        {/* The horizontal line */}
                        <div className="absolute top-4 left-[5%] right-[5%] h-[2px] bg-border-soft">
                            <div className="process-line w-full h-full bg-accent origin-left" />
                        </div>

                        <div className="flex justify-between relative z-10 w-full">
                            {processSteps.map((step, i) => (
                                <div key={i} className="flex flex-col items-center w-[16%] text-center relative group">
                                    <div className="process-dot w-8 h-8 rounded-full bg-white border-[3px] border-border-soft transition-colors duration-500 mb-6 flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <h4 className="font-sora font-semibold text-[15px] mb-2">{step}</h4>
                                    <p className="font-sans text-[13px] text-text-muted">Step {i + 1}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile view for timeline */}
                    <div className="md:hidden flex flex-col gap-8 relative pl-6">
                        <div className="absolute top-2 bottom-2 left-[21px] w-[2px] bg-border-soft" />
                        {processSteps.map((step, i) => (
                            <div key={i} className="relative z-10 flex gap-6 items-center">
                                <div className="w-4 h-4 rounded-full bg-accent border-4 border-white shadow-sm flex-shrink-0" />
                                <div>
                                    <h4 className="font-sora font-semibold text-[16px]">{step}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 4 — Service CTA */}
            <section className="py-24 relative overflow-hidden bg-bg-base">
                <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(232,71,28,0.06), transparent 70%)' }} />
                <div className="container mx-auto px-6 max-w-7xl relative z-10 flex justify-center">
                    <GlassPanel variant="light" className="p-12 md:p-16 text-center max-w-[800px] w-full border border-border-soft rounded-3xl">
                        <h2 className="font-sora font-bold text-3xl md:text-5xl text-text-primary mb-4 leading-tight">Need Technical Support?</h2>
                        <p className="font-sans text-lg text-text-secondary leading-relaxed mb-10 max-w-xl mx-auto">
                            Our certified engineers are ready to help keep your essential systems operating flawlessly. Contact us to schedule an inspection.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Button onClick={() => window.location.href = '/contact'} variant="primary" size="lg">Request Service <ArrowRight className="w-5 h-5 ml-2" /></Button>
                            <Button onClick={() => window.open('https://wa.me/94711616564', '_blank')} variant="secondary" size="lg" icon={MessageCircle}>WhatsApp Us</Button>
                        </div>
                    </GlassPanel>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
