import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import WhatsAppFAB from '../ui/WhatsAppFAB';

const Layout = () => {
    return (
        <>
            <NavBar />
            <main className="flex-grow pt-0 flex flex-col min-h-screen">
                <Outlet />
            </main>
            <Footer />
            <WhatsAppFAB />
        </>
    );
};

export default Layout;
