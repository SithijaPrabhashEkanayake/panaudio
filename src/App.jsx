import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { pageTransition } from './animations/variants';

import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SolutionsPage from './pages/SolutionsPage';
import ProductsPage from './pages/ProductsPage';
import ProjectsPage from './pages/ProjectsPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';

import AdminPage from './pages/AdminPage';

// ScrollToTop
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const PageWrapper = ({ children }) => (
    <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex-grow flex flex-col"
    >
        {children}
    </motion.div>
);

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<PageWrapper><HomePage /></PageWrapper>} />
                    <Route path="about" element={<PageWrapper><AboutPage /></PageWrapper>} />
                    <Route path="solutions" element={<PageWrapper><SolutionsPage /></PageWrapper>} />
                    <Route path="products" element={<PageWrapper><ProductsPage /></PageWrapper>} />
                    <Route path="projects" element={<PageWrapper><ProjectsPage /></PageWrapper>} />
                    <Route path="services" element={<PageWrapper><ServicesPage /></PageWrapper>} />
                    <Route path="contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
                    <Route path="admin" element={<PageWrapper><AdminPage /></PageWrapper>} />
                </Route>
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <BrowserRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <ScrollToTop />
            <AnimatedRoutes />
        </BrowserRouter>
    );
}

export default App;
