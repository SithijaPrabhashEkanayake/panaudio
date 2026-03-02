import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Speaker, MonitorPlay, Video, Home, Network, Shield, Database, Zap, Thermometer, Cable, Monitor } from 'lucide-react';
import VideoHero from '../components/ui/VideoHero';
import SectionEyebrow from '../components/ui/SectionEyebrow';
import CategoryPills from '../components/ui/CategoryPills';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
import { products } from '../data/products';
import { solutions } from '../data/solutions';

const iconMap = {
    Speaker: Speaker,
    MonitorPlay: MonitorPlay,
    Video: Video,
    Home: Home,
    Network: Network,
    Shield: Shield,
    Database: Database,
    Zap: Zap,
    Thermometer: Thermometer,
    Cable: Cable,
    Monitor: Monitor
};

const SolutionsPage = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', ...solutions.map(s => s.name)];

    const sectionRefs = useRef({});

    const scrollToSection = (cat) => {
        setActiveCategory(cat);
        if (cat === 'All') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (sectionRefs.current[cat]) {
            const y = sectionRefs.current[cat].getBoundingClientRect().top + window.scrollY - 150;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col w-full bg-bg-base">
            {/* SECTION 1 — Solutions Hero */}
            <VideoHero
                videoSrc="/solutions-hero.webm"
                posterSrc="https://placehold.co/1920x1080/131110/FFFFFF?text=Solutions"
            >
                <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center justify-center text-center">
                    <div className="glass-light p-8 md:p-12 rounded-3xl max-w-4xl" style={{ backgroundColor: 'rgba(247,247,245,0.10)' }}>
                        <SectionEyebrow className="hero-eyebrow justify-center mb-6 text-white border-white">
                            <span className="text-white tracking-[0.15em]">WHAT WE DO</span>
                        </SectionEyebrow>
                        <h1 className="hero-word font-sora text-4xl md:text-6xl lg:text-[72px] font-bold text-white mb-6 tracking-tight leading-tight">
                            Comprehensive<br />Technology Solutions
                        </h1>
                        <p className="hero-subtext font-sans text-xl text-white/80 max-w-2xl mx-auto font-light">
                            Tailored for Every Sector — Government to Enterprise
                        </p>
                    </div>
                </div>
            </VideoHero>

            {/* SECTION 2 — Category Pills */}
            <CategoryPills
                categories={categories}
                active={activeCategory}
                onChange={scrollToSection}
            />

            {/* SECTION 3 — Solution Sections */}
            <div className="py-16">
                {solutions.map((sol, index) => {
                    const Icon = iconMap[sol.iconName] || Speaker;
                    const isEven = index % 2 === 0;

                    // Using matching products based on solution category
                    const categoryProducts = products.filter(p => p.category === sol.name).slice(0, 3);

                    return (
                        <section
                            key={sol.id}
                            className={`py-24 ${isEven ? 'bg-bg-base' : 'bg-bg-pure border-y border-border-soft'}`}
                            ref={(el) => (sectionRefs.current[sol.name] = el)}
                        >
                            <div className="container mx-auto px-6 max-w-7xl">
                                <div className={`flex flex-col lg:flex-row gap-16 ${isEven ? '' : 'lg:flex-row-reverse'}`}>

                                    {/* Text Column */}
                                    <div className="w-full lg:w-1/3 flex flex-col items-start justify-center">
                                        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-8">
                                            <Icon className="w-8 h-8 text-accent" strokeWidth={1.5} />
                                        </div>
                                        <SectionEyebrow className="mb-4">CAPABILITIES</SectionEyebrow>
                                        <h2 className="font-sora font-semibold text-[32px] md:text-[40px] text-text-primary mb-6 leading-tight">
                                            {sol.name}
                                        </h2>
                                        <p className="font-sans text-[16px] text-text-secondary leading-relaxed mb-10">
                                            {sol.description}
                                        </p>

                                        <ul className="mb-10 flex flex-wrap gap-2">
                                            {sol.categories.map(cat => (
                                                <li key={cat} className="px-3 py-1.5 bg-border-soft/50 rounded-lg text-text-primary text-[13px] font-mono">
                                                    {cat}
                                                </li>
                                            ))}
                                        </ul>

                                        <Button variant="secondary" onClick={() => window.location.href = '/products'}>
                                            View All Products <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>

                                    {/* Product Grid Column */}
                                    <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                        {categoryProducts.length > 0 ? (
                                            categoryProducts.map(prod => (
                                                <div key={prod.id} className="h-full">
                                                    <ProductCard {...prod} />
                                                </div>
                                            ))
                                        ) : (
                                            // Fallback placeholders if no products matches
                                            [1, 2, 3].map(i => (
                                                <div key={i} className="h-full">
                                                    <ProductCard
                                                        name={`${sol.name} Demo ${i}`}
                                                        category={sol.name}
                                                        description="Premium technology designed for integration."
                                                        image={`https://placehold.co/600x400/E8471C/FFFFFF?text=Demo`}
                                                    />
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
};

export default SolutionsPage;
