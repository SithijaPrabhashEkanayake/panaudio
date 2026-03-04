import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Star, X } from 'lucide-react';
import SectionEyebrow from '../components/ui/SectionEyebrow';
import VideoHero from '../components/ui/VideoHero';
import ProductCard from '../components/ui/ProductCard';
import ProductModal from '../components/ui/ProductModal';
import GlassModal from '../components/ui/GlassModal';
import { brands } from '../data/brands';
import { solutions } from '../data/solutions';
import { API_URL } from '../config';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeBrand, setActiveBrand] = useState('All');
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${API_URL}/api/products`);
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);
                }
            } catch (err) {
                console.error("Failed to fetch products:", err);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setSelectedProduct(null);
        };
        if (selectedProduct) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [selectedProduct]);

    const brandOptions = ['All', ...brands.map(b => b.name)];
    const categoryOptions = ['All', ...solutions.map(s => s.name)];

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const nameMatch = p.name ? p.name.toLowerCase() : '';
            const brandMatch = p.brand ? p.brand.toLowerCase() : '';
            const searchLower = searchTerm.toLowerCase();

            const matchSearch = nameMatch.includes(searchLower) || brandMatch.includes(searchLower);
            const matchBrand = activeBrand === 'All' || p.brand === activeBrand;
            const matchCategory = activeCategory === 'All' || p.category === activeCategory;
            return matchSearch && matchBrand && matchCategory;
        });
    }, [products, searchTerm, activeBrand, activeCategory]);

    return (
        <div className="flex flex-col w-full bg-bg-base">
            {/* SECTION 1 — Products Hero */}
            <VideoHero
                videoSrc="/products-hero.webm"
                posterSrc="https://placehold.co/1920x1080/131110/FFFFFF?text=Products"
            >
                <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center justify-center text-center">
                    <div className="glass-light p-6 md:p-10 lg:p-12 mb-8 mt-16 md:mt-24 rounded-[2.5rem] max-w-[850px] w-full" style={{ backgroundColor: 'rgba(247,247,245,0.10)' }}>
                        <SectionEyebrow className="mb-4 border-white text-white scale-90 origin-center justify-center">
                            <span className="text-white tracking-[0.15em] text-xs md:text-sm">PREMIUM PORTFOLIO</span>
                        </SectionEyebrow>
                        <h1 className="font-sora text-4xl md:text-6xl lg:text-[72px] font-bold text-white mb-4 tracking-tight">
                            Premium Products
                        </h1>
                        <p className="font-sans text-base md:text-lg text-[#F5F2F0]/80 max-w-2xl mx-auto font-light leading-relaxed">
                            World-Renowned Brands. Local Expertise.
                        </p>
                    </div>
                </div>
            </VideoHero>

            {/* SECTION 2 — Search & Filter Bar */}
            <section className="sticky top-[72px] z-30 bg-bg-base/90 backdrop-blur-md border-b border-border-soft py-6">
                <div className="container mx-auto px-6 max-w-7xl flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Input */}
                        <div className="relative flex-grow flex items-center glass-light rounded-pill px-6 h-14 border border-border-soft focus-within:border-accent focus-within:shadow-accent transition-all duration-300">
                            <Search className="w-5 h-5 text-text-muted mr-3" />
                            <input
                                type="text"
                                placeholder="Search products, brands..."
                                className="w-full bg-transparent border-none outline-none font-sans text-[15px] text-text-primary placeholder-text-muted"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <span className="font-sans font-medium text-[14px] text-text-secondary whitespace-nowrap ml-4">
                                {filteredProducts.length} products
                            </span>
                        </div>

                        {/* Category Select (Custom Glass Dropdown) */}
                        <div className="relative w-full md:w-[280px] z-40" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full glass-light rounded-pill h-14 border border-border-soft px-6 flex items-center justify-between font-sans text-[15px] text-text-primary outline-none focus:border-accent focus:shadow-accent transition-all duration-300"
                            >
                                <span className="truncate pr-4 font-medium">
                                    {activeCategory === 'All' ? 'All Category' : `${activeCategory} Category`}
                                </span>
                                <ChevronDown className={`w-5 h-5 text-text-muted transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 right-0 mt-3 py-3 glass-light rounded-2xl border border-border-soft shadow-xl overflow-hidden z-50 max-h-[350px] overflow-y-auto filter-blur-md backdrop-blur-xl"
                                        style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}
                                    >
                                        {categoryOptions.map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => {
                                                    setActiveCategory(cat);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-6 py-3 font-sans text-[14px] transition-colors duration-200 ${activeCategory === cat
                                                    ? 'bg-accent/10 text-accent font-semibold'
                                                    : 'text-text-secondary hover:bg-white/60 hover:text-text-primary'
                                                    }`}
                                            >
                                                {cat} Category
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Brand Pills */}
                    <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                        {brandOptions.map(brand => (
                            <button
                                key={brand}
                                onClick={() => setActiveBrand(brand)}
                                className={`px-4 py-1.5 rounded-pill font-sans font-medium text-[13px] transition-all duration-300 flex-shrink-0 ${activeBrand === brand
                                    ? 'bg-text-primary text-white'
                                    : 'glass-light text-text-secondary hover:text-text-primary border border-border-soft'
                                    }`}
                            >
                                {brand}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3 — Product Grid */}
            <section className="py-16 container mx-auto px-6 max-w-7xl min-h-[50vh]">
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {filteredProducts.map(prod => (
                            <motion.div
                                key={prod.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="h-full"
                            >
                                <ProductCard {...prod} onClick={() => setSelectedProduct(prod)} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProducts.length === 0 && (
                    <div className="w-full py-24 flex flex-col items-center justify-center text-center">
                        <Search className="w-12 h-12 text-border-soft mb-4" />
                        <h3 className="font-sora font-semibold text-2xl text-text-primary mb-2">No products found</h3>
                        <p className="font-sans text-text-secondary">Try adjusting your active filters or search term.</p>
                    </div>
                )}
            </section>

            {/* SECTION 4 — Brand Grid */}
            <section className="py-24 bg-white border-t border-border-soft">
                <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center">
                    <SectionEyebrow className="mb-12">OUR PRODUCT BRANDS</SectionEyebrow>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-20">
                        {brands.map((b, i) => (
                            <div key={i} className="text-text-muted font-sora font-bold text-3xl md:text-4xl hover:text-accent transition-colors duration-300 cursor-default grayscale hover:grayscale-0 hover:scale-[1.08] transform">
                                {b.name}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Modal */}
            <ProductModal
                selectedProduct={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    );
};

export default ProductsPage;
