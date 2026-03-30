import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Upload } from 'lucide-react';
import Button from '../ui/Button';

const ProjectFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        client: '',
        sector: 'Government',
        image: '',
        projects: [{ year: '', name: '' }]
    });
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (initialData && initialData.client) {
            if (initialData.projects && Array.isArray(initialData.projects)) {
                setFormData({
                    client: initialData.client,
                    sector: initialData.sector,
                    image: initialData.image || '',
                    projects: initialData.projects.length > 0 ? initialData.projects : [{ year: '', name: '' }]
                });
                setImagePreview(initialData.image || '');
            } else {
                setFormData({
                    client: initialData.client || '',
                    sector: initialData.sector || 'Government',
                    image: initialData.image || '',
                    projects: [{ year: initialData.year || '', name: initialData.name || '' }]
                });
                setImagePreview(initialData.image || '');
            }
        } else {
            setFormData({
                client: '',
                sector: 'Government',
                image: '',
                projects: [{ year: '', name: '' }]
            });
            setImagePreview('');
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProjectChange = (index, field, value) => {
        const updatedProjects = [...formData.projects];
        updatedProjects[index][field] = value;
        setFormData(prev => ({
            ...prev,
            projects: updatedProjects
        }));
    };

    const addProject = () => {
        setFormData(prev => ({
            ...prev,
            projects: [...prev.projects, { year: '', name: '' }]
        }));
    };

    const removeProject = (index) => {
        if (formData.projects.length > 1) {
            const updatedProjects = formData.projects.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                projects: updatedProjects
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return createPortal((
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-2xl bg-bg-pure border border-border-soft rounded-2xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
                >
                    <div className="flex justify-between items-center p-6 border-b border-border-soft bg-bg-base/50 shrink-0">
                        <h2 className="font-sora text-xl font-semibold text-text-primary">
                            {initialData ? 'Edit Projects' : 'Add New Client with Projects'}
                        </h2>
                        <button onClick={onClose} type="button" className="p-2 rounded-full hover:bg-bg-pure transition-colors text-text-secondary">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="overflow-y-auto px-6 py-6 custom-scrollbar">
                        <form id="projectForm" onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-sans text-sm font-medium text-text-secondary">Client Name</label>
                                    <input
                                        required
                                        type="text"
                                        name="client"
                                        value={formData.client}
                                        onChange={handleChange}
                                        className="w-full bg-bg-base border border-border-soft rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
                                        placeholder="e.g. University of Moratuwa"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-sans text-sm font-medium text-text-secondary">Sector</label>
                                    <select
                                        required
                                        name="sector"
                                        value={formData.sector}
                                        onChange={handleChange}
                                        className="w-full bg-bg-base border border-border-soft rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors appearance-none"
                                    >
                                        <option>Government</option>
                                        <option>Education</option>
                                        <option>Media</option>
                                        <option>Healthcare</option>
                                        <option>Telecom</option>
                                        <option>Private/Commercial</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="font-sans text-sm font-medium text-text-secondary">Project Image</label>
                                <div
                                    className="border-2 border-dashed border-border-soft rounded-xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-accent/50 hover:bg-bg-base/50 transition-colors"
                                >
                                    {imagePreview ? (
                                        <div className="relative w-full h-32 rounded-lg overflow-hidden bg-bg-base">
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <label className="text-white text-sm font-medium flex items-center gap-2 cursor-pointer">
                                                    <Upload className="w-4 h-4" /> Change Image
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center py-4 text-text-secondary cursor-pointer">
                                            <Upload className="w-8 h-8 mb-2 opacity-50" />
                                            <span className="text-sm font-medium">Click to upload image</span>
                                            <span className="text-xs text-text-muted mt-1">PNG, JPG up to 5MB</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className="border-t border-border-soft pt-5">
                                <div className="flex items-center justify-between mb-4">
                                    <label className="font-sans text-sm font-medium text-text-secondary">Projects</label>
                                    <button
                                        type="button"
                                        onClick={addProject}
                                        className="flex items-center gap-1 text-sm text-accent hover:text-accent-hover transition-colors"
                                    >
                                        <Plus className="w-4 h-4" /> Add Project
                                    </button>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {formData.projects.map((project, index) => (
                                        <div key={index} className="bg-bg-base/50 border border-border-soft rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-xs font-medium text-text-muted">Project {index + 1}</span>
                                                {formData.projects.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeProject(index)}
                                                        className="p-1 text-text-muted hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-3 gap-3">
                                                <div className="col-span-1">
                                                    <input
                                                        type="text"
                                                        value={project.year}
                                                        onChange={(e) => handleProjectChange(index, 'year', e.target.value)}
                                                        className="w-full bg-bg-base border border-border-soft rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-accent transition-colors text-sm"
                                                        placeholder="Year (e.g. 2024)"
                                                    />
                                                </div>
                                                <div className="col-span-2">
                                                    <input
                                                        required
                                                        type="text"
                                                        value={project.name}
                                                        onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                                                        className="w-full bg-bg-base border border-border-soft rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-accent transition-colors text-sm"
                                                        placeholder="Project description"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="flex justify-end gap-3 p-6 border-t border-border-soft bg-bg-base/50 shrink-0">
                        <Button type="button" variant="ghost" className="border-border-soft hover:bg-bg-base" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" form="projectForm" variant="primary">
                            {initialData ? 'Save Changes' : 'Add Projects'}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    ), document.body);
};

export default ProjectFormModal;
