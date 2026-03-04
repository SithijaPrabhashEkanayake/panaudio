import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload } from 'lucide-react';
import Button from '../ui/Button';
import { API_URL } from '../../config';

const ProjectFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
    const fileInputRef = useRef(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        client: '',
        category: 'Corporate',
        scope: '',
        featured: false,
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
            setImagePreview(initialData.image ? `${API_URL}${initialData.image}` : null);
        } else {
            setFormData({
                name: '',
                client: '',
                category: 'Corporate',
                scope: '',
                featured: false,
            });
            setImagePreview(null);
        }
        setImageFile(null);
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData, imageFile);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-lg bg-bg-pure border border-border-soft rounded-2xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
                >
                    <div className="flex justify-between items-center p-6 border-b border-border-soft bg-bg-base/50 shrink-0">
                        <h2 className="font-sora text-xl font-semibold text-text-primary">
                            {initialData ? 'Edit Project' : 'Add New Project'}
                        </h2>
                        <button onClick={onClose} type="button" className="p-2 rounded-full hover:bg-bg-pure transition-colors text-text-secondary">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="overflow-y-auto px-6 py-6 custom-scrollbar">
                        <form id="projectForm" onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="font-sans text-sm font-medium text-text-secondary">Project Name</label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-bg-base border border-border-soft rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
                                    placeholder="e.g. National Institute of Education"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-sans text-sm font-medium text-text-secondary">Client</label>
                                    <input
                                        required
                                        type="text"
                                        name="client"
                                        value={formData.client}
                                        onChange={handleChange}
                                        className="w-full bg-bg-base border border-border-soft rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
                                        placeholder="e.g. NIE"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-sans text-sm font-medium text-text-secondary">Category</label>
                                    <select
                                        required
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full bg-bg-base border border-border-soft rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors appearance-none"
                                    >
                                        <option>Government & Education</option>
                                        <option>Corporate</option>
                                        <option>Healthcare & Government</option>
                                        <option>Specialised & Private</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="font-sans text-sm font-medium text-text-secondary">Scope of Work</label>
                                <input
                                    required
                                    type="text"
                                    name="scope"
                                    value={formData.scope}
                                    onChange={handleChange}
                                    className="w-full bg-bg-base border border-border-soft rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors resize-none"
                                    placeholder="e.g. AV & Networking"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="font-sans text-sm font-medium text-text-secondary">Project Image</label>
                                <div
                                    className="border-2 border-dashed border-border-soft rounded-xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-accent/50 hover:bg-bg-base/50 transition-colors"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {imagePreview ? (
                                        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-bg-base">
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="text-white text-sm font-medium flex items-center gap-2"><Upload className="w-4 h-4" /> Change Image</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center py-6 text-text-secondary">
                                            <Upload className="w-8 h-8 mb-2 opacity-50" />
                                            <span className="text-sm font-medium">Click to upload image</span>
                                            <span className="text-xs text-text-muted mt-1">PNG, JPG up to 5MB</span>
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>

                            <div className="flex items-center gap-3 mt-2">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    name="featured"
                                    checked={formData.featured}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded border-border-soft text-accent focus:ring-accent accent-accent bg-bg-base cursor-pointer"
                                />
                                <label htmlFor="featured" className="font-sans text-sm font-medium text-text-primary cursor-pointer">
                                    Featured Project
                                </label>
                            </div>
                        </form>
                    </div>

                    <div className="flex justify-end gap-3 p-6 border-t border-border-soft bg-bg-base/50 shrink-0">
                        <Button type="button" variant="ghost" className="border-border-soft hover:bg-bg-base" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" form="projectForm" variant="primary">
                            {initialData ? 'Save Changes' : 'Add Project'}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ProjectFormModal;
