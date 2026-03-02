import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle } from 'lucide-react';
import GlassPanel from '../components/ui/GlassPanel';
import VideoHero from '../components/ui/VideoHero';
import SectionEyebrow from '../components/ui/SectionEyebrow';
import Button from '../components/ui/Button';
import { glassEntrance } from '../animations/variants';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '', phone: '', email: '', country: '', type: 'Audio Visual Solutions', message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);
            setFormData({ name: '', phone: '', email: '', country: '', type: 'Audio Visual Solutions', message: '' });
        }, 1500);
    };

    return (
        <div className="flex flex-col w-full bg-bg-base min-h-screen">
            {/* SECTION 1 — Contact Header */}
            <VideoHero
                videoSrc="/about-us-hero.webm"
                posterSrc="https://placehold.co/1920x1080/131110/FFFFFF?text=Contact"
            >
                <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center justify-center text-center">
                    <div className="glass-light p-6 md:p-10 lg:p-12 mb-8 mt-16 md:mt-24 rounded-[2.5rem] max-w-[850px] w-full" style={{ backgroundColor: 'rgba(247,247,245,0.10)' }}>
                        <SectionEyebrow className="mb-4 border-white text-white scale-90 origin-center justify-center">
                            <span className="text-white tracking-[0.15em] text-xs md:text-sm">SUPPORT</span>
                        </SectionEyebrow>
                        <h1 className="font-sora text-4xl md:text-6xl lg:text-[72px] font-bold text-white mb-4 tracking-tight">
                            Get in Touch
                        </h1>
                        <p className="font-sans text-base md:text-lg text-[#F5F2F0]/80 max-w-2xl mx-auto font-light leading-relaxed">
                            We're Here to Help
                        </p>
                    </div>
                </div>
            </VideoHero>

            {/* SECTION 2 — Two-column layout */}
            <section className="py-16 md:py-24 container mx-auto px-6 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* LEFT COLUMN: Company info */}
                    <div className="w-full lg:w-[45%] flex flex-col gap-6">
                        <GlassPanel variant="light" className="p-8 md:p-10 flex flex-col gap-8 flex-grow border border-border-soft">
                            <img src="/logo.png" alt="Pan Audio" className="h-[44px] self-start object-contain" />

                            <div className="flex flex-col gap-6 font-sans text-[15px] text-text-secondary">
                                <div className="flex gap-4">
                                    <MapPin className="w-6 h-6 text-accent flex-shrink-0" strokeWidth={1.5} />
                                    <p className="leading-relaxed">Nadaraja Building, 3-1/1,<br />Station Road, Colombo 03,<br />Sri Lanka</p>
                                </div>

                                <div className="flex gap-4">
                                    <Phone className="w-6 h-6 text-accent flex-shrink-0" strokeWidth={1.5} />
                                    <div className="flex flex-col gap-1">
                                        <p><strong className="text-text-primary font-semibold">AV Solutions:</strong> +94 71 161 65 64</p>
                                        <p><strong className="text-text-primary font-semibold">CCTV & Networking:</strong> +94 77 63 62 744</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <Mail className="w-6 h-6 text-accent flex-shrink-0" strokeWidth={1.5} />
                                    <a href="mailto:info@panaudio.com" className="hover:text-accent font-medium transition-colors">info@panaudio.com</a>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <Clock className="w-6 h-6 text-accent flex-shrink-0" strokeWidth={1.5} />
                                    <p>Monday – Friday, 9:00 AM – 5:00 PM</p>
                                </div>
                            </div>

                            <div className="mt-auto pt-4 border-t border-border-soft">
                                <Button variant="secondary" fullWidth icon={MessageCircle} onClick={() => window.open('https://wa.me/94711616564', '_blank')}>
                                    WhatsApp Us
                                </Button>
                            </div>
                        </GlassPanel>

                        <div className="w-full aspect-square md:aspect-video lg:aspect-square bg-gray-200 rounded-3xl overflow-hidden glass-light shadow-2">
                            <iframe
                                title="Pan Audio Location"
                                src="https://maps.google.com/maps?q=Pan%20Audio,%20Nadaraja%20Building,%20Station%20Road,%20Colombo%2003,%20Sri%20Lanka&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                className="grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Lead form */}
                    <div className="w-full lg:w-[55%]">
                        <GlassPanel variant="light" className="p-8 md:p-12 relative overflow-hidden h-full border border-border-soft">
                            <h3 className="font-sora font-semibold text-[26px] md:text-[32px] text-text-primary mb-8 leading-tight">Send us a Message</h3>

                            <AnimatePresence mode="wait">
                                {success ? (
                                    <motion.div
                                        key="success"
                                        variants={glassEntrance}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="absolute inset-0 bg-bg-pure z-20 flex flex-col items-center justify-center p-10 text-center rounded-3xl"
                                    >
                                        <CheckCircle className="w-16 h-16 text-success mb-6" strokeWidth={1.5} />
                                        <h3 className="font-sora font-semibold text-3xl text-text-primary mb-4">Thank you!</h3>
                                        <p className="font-sans text-lg text-text-secondary leading-relaxed mb-8 max-w-sm mx-auto">
                                            We have received your query. We will get in touch with you as soon as we can.
                                        </p>
                                        <Button variant="secondary" onClick={() => setSuccess(false)}>Send another message</Button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        onSubmit={handleSubmit}
                                        className="flex flex-col gap-6"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    >
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="w-full md:w-1/2 flex flex-col">
                                                <label className="font-sans font-medium text-[13px] text-text-secondary uppercase tracking-wider mb-2">Full Name *</label>
                                                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="h-14 bg-white/60 border border-border-soft rounded-xl px-5 font-sans focus:border-accent focus:shadow-accent outline-none transition-all duration-300" placeholder="John Doe" />
                                            </div>
                                            <div className="w-full md:w-1/2 flex flex-col">
                                                <label className="font-sans font-medium text-[13px] text-text-secondary uppercase tracking-wider mb-2">Contact Number *</label>
                                                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="h-14 bg-white/60 border border-border-soft rounded-xl px-5 font-sans focus:border-accent focus:shadow-accent outline-none transition-all duration-300" placeholder="+94 7X XXX XXXX" />
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="w-full md:w-1/2 flex flex-col">
                                                <label className="font-sans font-medium text-[13px] text-text-secondary uppercase tracking-wider mb-2">Email Address *</label>
                                                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="h-14 bg-white/60 border border-border-soft rounded-xl px-5 font-sans focus:border-accent focus:shadow-accent outline-none transition-all duration-300" placeholder="john@company.com" />
                                            </div>
                                            <div className="w-full md:w-1/2 flex flex-col">
                                                <label className="font-sans font-medium text-[13px] text-text-secondary uppercase tracking-wider mb-2">Country *</label>
                                                <select name="country" required value={formData.country} onChange={handleChange} className="h-14 bg-white/60 border border-border-soft rounded-xl px-5 font-sans focus:border-accent focus:shadow-accent outline-none transition-all duration-300 appearance-none">
                                                    <option value="">Select Country</option>
                                                    <option value="Sri Lanka">Sri Lanka</option>
                                                    <option value="Maldives">Maldives</option>
                                                    <option value="India">India</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="flex flex-col">
                                            <label className="font-sans font-medium text-[13px] text-text-secondary uppercase tracking-wider mb-2">Enquiry Type *</label>
                                            <select name="type" required value={formData.type} onChange={handleChange} className="h-14 bg-white/60 border border-border-soft rounded-xl px-5 font-sans focus:border-accent focus:shadow-accent outline-none transition-all duration-300 appearance-none">
                                                <option value="Audio Visual Solutions">Audio Visual Solutions</option>
                                                <option value="Networking">Networking</option>
                                                <option value="CCTV & Security">CCTV & Security</option>
                                                <option value="Project Consultation">Project Consultation</option>
                                                <option value="Technical Service">Technical Service</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        <div className="flex flex-col">
                                            <label className="font-sans font-medium text-[13px] text-text-secondary uppercase tracking-wider mb-2">Message *</label>
                                            <textarea name="message" required value={formData.message} onChange={handleChange} rows="4" className="bg-white/60 border border-border-soft rounded-xl p-5 font-sans focus:border-accent focus:shadow-accent outline-none transition-all duration-300 resize-none" placeholder="How can we help you?"></textarea>
                                        </div>

                                        <div className="mt-4">
                                            <Button type="submit" variant="primary" size="lg" fullWidth className="relative h-14" disabled={isSubmitting}>
                                                {isSubmitting ? (
                                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                ) : "Send Message"}
                                            </Button>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </GlassPanel>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
