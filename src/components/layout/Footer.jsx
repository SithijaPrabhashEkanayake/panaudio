import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '#' },
    { name: 'Instagram', icon: Instagram, url: '#' },
    { name: 'LinkedIn', icon: Linkedin, url: '#' },
    { name: 'Twitter', icon: Twitter, url: '#' }
];

const Footer = () => {
    return (
        <footer className="bg-[#131110] text-[#F5F2F0] border-t-2 border-accent mt-auto pt-16 pb-8">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <img src="/logo-white.svg" alt="Pan Audio" width={150} height={44} className="h-[44px] mb-6" onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/150x44/131110/FFFFFF?text=PAN+AUDIO';
                        }} />
                        <p className="font-sans text-[#A8A09A] text-sm leading-relaxed mb-6">
                            Bringing total synergy and fluidity within the spheres of technology and service to the region since 1984.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-[#1E1A19] flex items-center justify-center text-[#A8A09A] hover:bg-accent hover:text-white transition-all duration-300"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-sora font-semibold text-lg mb-4 text-white">Contact</h4>
                        <ul className="space-y-3 font-sans text-sm text-[#A8A09A]">
                            <li>Nadaraja Building, 3-1/1,<br />Station Road, Colombo 03,<br />Sri Lanka</li>
                            <li><strong className="text-white">AV:</strong> +94 71 161 65 64</li>
                            <li><strong className="text-white">CCTV:</strong> +94 77 63 62 744</li>
                            <li className="flex flex-col gap-1 mt-1 mb-1">
                                <a href="mailto:info@panaudio.com" className="hover:text-accent transition-colors">info@panaudio.com</a>
                                <a href="mailto:sales@panaudio.com" className="hover:text-accent transition-colors">sales@panaudio.com</a>
                                <a href="mailto:avd@panaudio.com" className="hover:text-accent transition-colors">avd@panaudio.com</a>
                            </li>
                            <li>Mon–Fri 9am–5pm</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-sora font-semibold text-lg mb-4 text-white">Quick Links</h4>
                        <ul className="space-y-3 font-sans text-sm text-[#A8A09A]">
                            {['Home', 'About', 'Solutions', 'Products', 'Projects', 'Services', 'Contact'].map(link => (
                                <li key={link}>
                                    <Link to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="hover:text-accent transition-colors">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-sora font-semibold text-lg mb-4 text-white">Our Partners</h4>
                        <div className="flex flex-wrap gap-4">
                            {['IBM', 'EIKI', 'DSPPA', 'HUAWEI', 'LOGITECH', 'JBL'].map(partner => (
                                <div key={partner} className="text-[#9A9590] font-sans font-bold text-lg hover:text-white transition-colors cursor-pointer grayscale hover:grayscale-0">
                                    {partner}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#1E1A19] pt-8 flex flex-col md:flex-row items-center justify-between font-sans text-xs text-[#6E6961]">
                    <p>&copy; {new Date().getFullYear()} Pan Audio Private Ltd. All Rights Reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="#" className="hover:text-[#A8A09A]">Privacy Policy</a>
                        <a href="#" className="hover:text-[#A8A09A]">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
