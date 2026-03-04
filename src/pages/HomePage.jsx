import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, Speaker, Network, Shield, Database, HeartPulse, Cpu, ArrowRight } from 'lucide-react';
import VideoHero from '../components/ui/VideoHero';
import SectionEyebrow from '../components/ui/SectionEyebrow';
import Button from '../components/ui/Button';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import GlassPanel from '../components/ui/GlassPanel';
import ProductCard from '../components/ui/ProductCard';
import ProductModal from '../components/ui/ProductModal';
import ProjectCard from '../components/ui/ProjectCard';
import { cardStagger, cardItem } from '../animations/variants';
import { partners } from '../data/partners';
import { API_URL } from '../config';

const HomePage = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const h1Text = "Sound. Vision. Connection.".split(' ');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, projectsRes] = await Promise.all([
                    fetch(`${API_URL}/api/products`),
                    fetch(`${API_URL}/api/projects`)
                ]);

                if (productsRes.ok) {
                    const data = await productsRes.json();
                    setFeaturedProducts(data.filter(p => p.featured).slice(0, 6));
                }

                if (projectsRes.ok) {
                    const data = await projectsRes.json();
                    const featured = data.filter(p => p.featured);
                    // Use featured projects if they exist, otherwise fallback to the most recent ones
                    setFeaturedProjects(featured.length > 0 ? featured.slice(0, 3) : data.slice(0, 3));
                }
            } catch (err) {
                console.error("Failed to fetch featured data:", err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col w-full">
            {/* SECTION 1 — Hero */}
            <VideoHero
                videoSrc="/homepage-hero.webm"
                posterSrc="https://placehold.co/1920x1080/131110/FFFFFF?text=Pan+Audio+Hero"
            >
                <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center justify-center text-center">
                    <div className="glass-light p-6 md:p-10 lg:p-12 mb-8 mt-16 md:mt-24 rounded-[2.5rem] max-w-[850px] w-full" style={{ backgroundColor: 'rgba(247,247,245,0.10)' }}>
                        <SectionEyebrow className="hero-eyebrow justify-center mb-5 text-white border-white scale-90 origin-center">
                            <span className="text-white tracking-[0.15em] text-xs md:text-sm">SRI LANKA'S TECHNOLOGY INTEGRATION LEADER</span>
                        </SectionEyebrow>

                        <h1 className="font-sora text-white mb-5 flex flex-col gap-2">
                            <span className="flex justify-center gap-3 md:gap-4 flex-wrap text-4xl md:text-6xl lg:text-[72px] font-bold tracking-tight">
                                {h1Text.map((word, i) => (
                                    <span key={i} className="hero-word inline-block">{word}</span>
                                ))}
                            </span>
                            <span className="hero-word text-2xl md:text-4xl font-light text-white/90 mt-2">
                                Engineered for Excellence.
                            </span>
                        </h1>

                        <p className="hero-subtext font-sans text-base md:text-lg text-[#F5F2F0]/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                            40 years of delivering premium Audio-Visual, Networking, and Security solutions across Sri Lanka and the Subcontinent.
                        </p>

                        <div className="hero-cta-group flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/solutions">
                                <Button variant="primary" size="lg">Explore Solutions <ArrowRight className="w-5 h-5 ml-2" /></Button>
                            </Link>
                            <Link to="/projects">
                                <Button variant="ghost" size="lg" className="border-white text-white hover:bg-white/10 hover:border-white">View Projects <ArrowRight className="w-5 h-5 ml-2" /></Button>
                            </Link>
                        </div>
                    </div>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-bounce">
                        <ChevronDown className="w-8 h-8 text-accent" />
                    </div>
                </div>
            </VideoHero>

            {/* SECTION 2 — Stats Bar */}
            <section className="stats-bar relative z-20 -mt-8 py-10 px-6 xl:px-0 max-w-[1280px] mx-auto w-full">
                <GlassPanel variant="light" className="p-8 md:p-10 w-full">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border-soft/50">
                        <AnimatedCounter end={40} suffix="+" label="YEARS OF EXCELLENCE" />
                        <AnimatedCounter end={500} suffix="+" label="PROJECTS DELIVERED" />
                        <AnimatedCounter end={20} suffix="+" label="GLOBAL BRAND PARTNERS" />
                        <AnimatedCounter end={10} suffix="" label="FOCUS INDUSTRY VERTICALS" />
                    </div>
                </GlassPanel>
            </section>

            {/* SECTION 3 — Solutions Teaser */}
            <section className="py-24 container mx-auto px-6 max-w-7xl">
                <div className="text-center md:text-left mb-16 flex flex-col items-center md:items-start">
                    <SectionEyebrow className="mb-4">WHAT WE DO</SectionEyebrow>
                    <h2 className="font-sora font-semibold text-3xl md:text-5xl text-text-primary">Comprehensive Technology Solutions</h2>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={cardStagger}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {[
                        { icon: Speaker, title: 'Audio Visual Solutions', desc: 'Premium PA systems, digital speakers, and conferencing tools.' },
                        { icon: Network, title: 'Network Infrastructure', desc: 'Robust LAN, switches, firewalls, and structured cabling.' },
                        { icon: Shield, title: 'Security & Surveillance', desc: 'CCTV networks, fire alarms, and biometric access control.' },
                        { icon: Database, title: 'Data Management', desc: 'Secure storage solutions including NAS and managed drives.' },
                        { icon: HeartPulse, title: 'Health Informatics', desc: 'Specialized healthcare IT and AV installations.' },
                        { icon: Cpu, title: 'Smart Systems', desc: 'Integrated building automation and smart control systems.' }
                    ].map((item, i) => (
                        <motion.div key={i} variants={cardItem}>
                            <GlassPanel variant="light" className="p-8 h-full flex flex-col">
                                <item.icon className="w-10 h-10 text-accent mb-6" strokeWidth={1.5} />
                                <h3 className="font-sora font-semibold text-[20px] mb-3">{item.title}</h3>
                                <p className="font-sans text-[14px] text-text-secondary leading-relaxed mb-6 flex-grow">{item.desc}</p>
                                <Link to="/solutions" className="text-accent font-sans font-semibold text-[14px] inline-flex items-center hover:text-accent-hover transition-colors">
                                    Explore <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </GlassPanel>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* SECTION 4 — Featured Products Carousel */}
            <section className="py-24 bg-bg-pure overflow-hidden border-y border-border-soft">
                <div className="container mx-auto px-6 max-w-7xl mb-12 flex flex-col items-center text-center">
                    <SectionEyebrow className="mb-4">FEATURED PRODUCTS</SectionEyebrow>
                    <h2 className="font-sora font-semibold text-3xl md:text-5xl text-text-primary">World-Renowned Brands</h2>
                </div>

                <div className="flex gap-6 px-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
                    <AnimatePresence>
                        {featuredProducts.map((prod) => (
                            <motion.div
                                key={prod.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="w-[85vw] md:w-[400px] flex-shrink-0 snap-center"
                            >
                                <ProductCard {...prod} onClick={() => setSelectedProduct(prod)} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="mt-8 flex justify-center">
                    <Link to="/products">
                        <Button variant="secondary">
                            View All Products <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>

                <ProductModal
                    selectedProduct={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            </section>

            {/* SECTION 5 — Partner Logo Strip */}
            <section className="py-16 bg-[#131110] overflow-hidden border-t-2 border-accent">
                <div className="container mx-auto px-6 max-w-7xl mb-8 flex justify-center">
                    <SectionEyebrow className="mb-4 justify-center text-white/50 border-white/50">
                        <span className="text-white/70">OUR TRUSTED PARTNERS</span>
                    </SectionEyebrow>
                </div>
                <div className="relative flex overflow-x-hidden group">
                    <div className="animate-marquee whitespace-nowrap flex items-center gap-16 px-8 group-hover:[animation-play-state:paused]">
                        {[...partners, ...partners, ...partners].map((p, i) => (
                            <span key={i} className="text-white/50 font-sora font-bold text-3xl hover:text-white transition-colors cursor-default grayscale hover:grayscale-0">
                                {p.name}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 6 — Project Highlights Teaser */}
            <section className="py-24 container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="flex flex-col items-start">
                        <SectionEyebrow className="mb-4">PROJECT HIGHLIGHTS</SectionEyebrow>
                        <h2 className="font-sora font-semibold text-3xl md:text-5xl text-text-primary">Delivering Excellence<br />Across Sectors</h2>
                    </div>
                    <Link to="/projects">
                        <Button variant="secondary">View All Projects <ArrowRight className="w-4 h-4 ml-2" /></Button>
                    </Link>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={cardStagger}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {featuredProjects.map((proj) => (
                        <motion.div key={proj.id} variants={cardItem} className="h-full">
                            <ProjectCard {...proj} projectName={proj.name} />
                        </motion.div>
                    ))}
                </motion.div>
            </section>


            {/* SECTION 8 — Client Logos Strip */}
            <section className="py-16 overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl mb-8 text-center flex justify-center">
                    <SectionEyebrow className="mb-4">OUR CLIENTS</SectionEyebrow>
                </div>
                <div className="relative flex overflow-x-hidden group">
                    <div className="animate-marquee-slow whitespace-nowrap flex items-center gap-16 px-8 group-hover:[animation-play-state:paused]">
                        {['CMC', 'SLBC', 'CPC', 'NIE', 'KDU', 'WNS', 'Abans', 'IDH Hospital', 'Ministry of Higher Education', 'University of Moratuwa', 'CMC', 'SLBC', 'CPC'].map((c, i) => (
                            <span key={i} className="text-text-muted font-sora font-bold text-2xl hover:text-text-primary transition-colors cursor-default">
                                {c}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
