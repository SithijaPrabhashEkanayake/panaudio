import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { API_URL } from '../config';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();

            if (data.success) {
                localStorage.setItem('panAdminToken', data.token);
                navigate('/pan-sys-portal'); // Redirect to dashboard
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('Server connection failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] bg-bg-base flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="glass-light bg-bg-pure/80 backdrop-blur-xl border border-border-soft p-8 md:p-10 rounded-[2rem] shadow-2 relative z-10">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-accent/20">
                            <Lock className="w-8 h-8 text-accent" strokeWidth={1.5} />
                        </div>
                        <h2 className="font-sora font-semibold text-2xl text-text-primary mb-2">Admin Portal</h2>
                        <p className="font-sans text-sm text-text-secondary">Please sign in to access the dashboard</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                            <p className="font-sans text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="font-sans font-medium text-sm text-text-primary ml-1">Username</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                                    <User className="w-5 h-5" strokeWidth={1.5} />
                                </span>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-dark-surface/5 border border-border-soft rounded-xl py-3 pl-12 pr-4 font-sans text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                                    placeholder="Enter username"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="font-sans font-medium text-sm text-text-primary ml-1">Password</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                                    <Lock className="w-5 h-5" strokeWidth={1.5} />
                                </span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-dark-surface/5 border border-border-soft rounded-xl py-3 pl-12 pr-4 font-sans text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full mt-2"
                            fullWidth
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                            {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                        </Button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
