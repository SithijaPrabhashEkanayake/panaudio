import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ShieldCheck, ServerCrash, Package, FolderGit2 } from 'lucide-react';
import Button from '../components/ui/Button';
import ProductFormModal from '../components/admin/ProductFormModal';
import ProjectFormModal from '../components/admin/ProjectFormModal';
import { API_URL } from '../config';

const PRODUCTS_API = `${API_URL}/api/products`;
const PROJECTS_API = `${API_URL}/api/projects`;

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('products');

    // Products State
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    // Projects State
    const [projects, setProjects] = useState([]);
    const [loadingProjects, setLoadingProjects] = useState(true);

    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoadingProducts(true);
            const res = await fetch(PRODUCTS_API);
            if (!res.ok) throw new Error('Failed to fetch products');
            const data = await res.json();
            setProducts(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Could not connect to the backend server. Make sure it is running.");
        } finally {
            setLoadingProducts(false);
        }
    };

    const fetchProjects = async () => {
        try {
            setLoadingProjects(true);
            const res = await fetch(PROJECTS_API);
            if (!res.ok) throw new Error('Failed to fetch projects');
            const data = await res.json();
            setProjects(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Could not connect to the backend server. Make sure it is running.");
        } finally {
            setLoadingProjects(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchProjects();
    }, []);

    const handleOpenAdd = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        const isProduct = activeTab === 'products';
        const itemName = isProduct ? 'product' : 'project';
        const url = isProduct ? `${PRODUCTS_API}/${id}` : `${PROJECTS_API}/${id}`;

        if (!window.confirm(`Are you sure you want to delete this ${itemName}?`)) return;

        try {
            const res = await fetch(url, { method: 'DELETE' });
            if (!res.ok) throw new Error('Delete failed');

            if (isProduct) {
                setProducts(prev => prev.filter(p => p.id !== id));
            } else {
                setProjects(prev => prev.filter(p => p.id !== id));
            }
        } catch (err) {
            alert(err.message);
        }
    };

    const handleSubmit = async (formData, imageFile) => {
        const isProduct = activeTab === 'products';
        const url = isProduct ? PRODUCTS_API : PROJECTS_API;

        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (key !== 'id' && key !== 'image') {
                    data.append(key, formData[key]);
                }
            });
            if (imageFile) data.append('image', imageFile);

            if (editingItem) {
                const res = await fetch(`${url}/${editingItem.id}`, { method: 'PUT', body: data });
                if (!res.ok) throw new Error('Update failed');
                const updated = await res.json();
                if (isProduct) setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
                else setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
            } else {
                const res = await fetch(url, { method: 'POST', body: data });
                if (!res.ok) throw new Error('Add failed');
                const newlyAdded = await res.json();
                if (isProduct) setProducts(prev => [...prev, newlyAdded]);
                else setProjects(prev => [...prev, newlyAdded]);
            }
            setIsModalOpen(false);
        } catch (err) {
            alert(err.message);
        }
    };

    const isLoading = activeTab === 'products' ? loadingProducts : loadingProjects;
    const currentData = activeTab === 'products' ? products : projects;

    return (
        <div className="min-h-screen bg-bg-base pt-32 pb-24 px-6">
            <div className="container mx-auto max-w-7xl">
                {/* Header Sequence */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-accent bg-accent/10 px-4 py-2 rounded-full w-fit border border-accent/20">
                            <ShieldCheck className="w-5 h-5" />
                            <span className="font-sans font-semibold tracking-wide text-sm">ADMINISTRATOR DASHBOARD</span>
                        </div>
                        <h1 className="font-sora text-3xl md:text-5xl font-bold text-text-primary">
                            Manage Portfolio
                        </h1>
                        <p className="font-sans text-text-secondary max-w-xl text-lg mt-2">
                            Add, update, and manage the inventory displayed across the website.
                        </p>
                    </div>
                    <Button variant="primary" size="lg" onClick={handleOpenAdd}>
                        <Plus className="w-5 h-5 mr-2" /> Add New {activeTab === 'products' ? 'Product' : 'Project'}
                    </Button>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-4 mb-8 border-b border-border-soft pb-4 overflow-x-auto hide-scrollbar">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-semibold transition-all whitespace-nowrap ${activeTab === 'products' ? 'bg-text-primary text-white shadow-md' : 'glass-light text-text-secondary hover:text-text-primary border border-border-soft'
                            }`}
                    >
                        <Package className="w-5 h-5" /> Products
                    </button>
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-semibold transition-all whitespace-nowrap ${activeTab === 'projects' ? 'bg-text-primary text-white shadow-md' : 'glass-light text-text-secondary hover:text-text-primary border border-border-soft'
                            }`}
                    >
                        <FolderGit2 className="w-5 h-5" /> Projects
                    </button>
                </div>

                {/* Content Area */}
                {isLoading ? (
                    <div className="w-full flex justify-center py-20">
                        <div className="w-12 h-12 rounded-full border-4 border-accent/30 border-t-accent animate-spin" />
                    </div>
                ) : error ? (
                    <div className="glass-light p-12 text-center rounded-3xl border border-red-500/20 bg-red-500/5">
                        <ServerCrash className="w-16 h-16 text-red-400 mx-auto mb-6" />
                        <h3 className="font-sora text-2xl font-semibold mb-4 text-text-primary">Backend Connection Offline</h3>
                        <p className="font-sans text-text-secondary max-w-md mx-auto">{error}</p>
                    </div>
                ) : (
                    <div className="bg-bg-pure border border-border-soft rounded-2xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left font-sans">
                                <thead>
                                    <tr className="bg-bg-base/50 text-text-secondary text-sm font-semibold border-b border-border-soft">
                                        <th className="py-4 px-6 uppercase tracking-wider">{activeTab === 'products' ? 'Product' : 'Project'}</th>
                                        <th className="py-4 px-6 uppercase tracking-wider">{activeTab === 'products' ? 'Brand' : 'Client'}</th>
                                        <th className="py-4 px-6 uppercase tracking-wider">Category</th>
                                        <th className="py-4 px-6 uppercase tracking-wider">Featured</th>
                                        <th className="py-4 px-6 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-soft">
                                    {currentData.map((item) => (
                                        <tr key={item.id} className="hover:bg-bg-base/30 transition-colors group">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-lg bg-bg-base overflow-hidden shrink-0 border border-border-soft flex items-center justify-center">
                                                        {item.image ? (
                                                            <img src={`${API_URL}${item.image}`} alt={item.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <span className="text-xs text-text-muted font-medium">No Img</span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-text-primary">{item.name}</div>
                                                        <div className="text-sm text-text-secondary truncate max-w-xs">{activeTab === 'products' ? item.description : item.scope}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-text-primary font-medium">{activeTab === 'products' ? item.brand : item.client}</td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-border-soft/50 text-text-secondary">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                {item.featured ? (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
                                                        Featured
                                                    </span>
                                                ) : (
                                                    <span className="text-text-muted text-sm">—</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleOpenEdit(item)}
                                                        className="p-2 text-text-secondary hover:text-accent bg-bg-base rounded-lg border border-border-soft hover:border-accent/30 transition-all"
                                                        title={`Edit ${activeTab === 'products' ? 'Product' : 'Project'}`}
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="p-2 text-text-secondary hover:text-red-500 bg-bg-base rounded-lg border border-border-soft hover:border-red-500/30 transition-all"
                                                        title={`Delete ${activeTab === 'products' ? 'Product' : 'Project'}`}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {currentData.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="py-12 text-center text-text-secondary font-sans">
                                                No items found in the database.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {activeTab === 'products' ? (
                <ProductFormModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleSubmit}
                    initialData={editingItem}
                />
            ) : (
                <ProjectFormModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleSubmit}
                    initialData={editingItem}
                />
            )}
        </div>
    );
};

export default AdminPage;
