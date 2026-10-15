import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function Dashboard({ products = [] }) {
    const [activeTab, setActiveTab] = useState('home');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Calculate dynamic metric values from products array
    const totalReservations = products.length;
    const pendingTasksCount = products.filter(item => item.status === 'Pending').length;

    // Helper to generate prefix based on category selection
    const generateReference = (type) => {
        const randomNum = Math.floor(100 + Math.random() * 900);
        switch (type) {
            case 'Deluxe': return `R-${randomNum}`;
            case 'Suite': return `S-${randomNum}`;
            case 'Dining': return `SRV-${randomNum}`;
            case 'Transport': return `TR-${randomNum}`;
            case 'Wellness': return `SPA-${randomNum}`;
            default: return `REF-${randomNum}`;
        }
    };

    // Form setup using Inertia's useForm hook
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        reference: generateReference('Deluxe'),
        type: 'Deluxe',
        request: '',
        status: 'Pending',
        time: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Generate current time stamp upon submission
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        post('/products', {
            data: {
                ...data,
                time: currentTime,
            },
            onSuccess: () => {
                reset();
                setIsModalOpen(false);
            },
        });
    };

    // Function to update status between Pending and Resolved
    const toggleStatus = (item) => {
        const nextStatus = item.status === 'Pending' ? 'Resolved' : 'Pending';
        router.patch(`/products/${item.id}`, { status: nextStatus }, { preserveScroll: true });
    };

    // Function to delete a request
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this service request?')) {
            router.delete(`/products/${id}`, { preserveScroll: true });
        }
    };

    const displayProducts = products && products.length > 0 ? products : [
        { id: 1, name: 'Maria Santos', reference: 'R-204', type: 'Deluxe', request: 'Late check-in after 10 PM', status: 'Pending', time: '09:21 AM' },
    ];

    return (
        <AuthenticatedLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            <Head title={activeTab === 'home' ? 'Home' : 'Room Services & Bookings'} />

            {/* HOME TAB VIEW */}
            {activeTab === 'home' && (
                <div className="space-y-6">
                    <div 
                        className="relative overflow-hidden rounded-2xl shadow-2xl h-96 bg-cover bg-center border border-purple-900/40"
                        style={{ backgroundImage: "url('/hotell.jpg')" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0424] via-[#120826]/80 to-black/30 p-8 md:p-12 flex items-end">
                            <div className="relative z-10 max-w-2xl">
                                <span className="inline-block text-xs font-mono tracking-widest text-purple-300 uppercase mb-2 bg-purple-950/80 px-2.5 py-1 rounded border border-purple-800/40">
                                    Welcome to Casa Marisol
                                </span>
                                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
                                    Your Premier Seaside Sanctuary
                                </h1>
                                <p className="text-slate-200 text-sm mb-6 leading-relaxed">
                                    Experience effortless luxury and seamless hospitality management. Manage requests, room services, and guest bookings all in one place.
                                </p>
                                <button 
                                    onClick={() => setActiveTab('products')}
                                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold px-5 py-2.5 rounded-lg text-sm transition shadow-lg shadow-amber-400/10 cursor-pointer"
                                >
                                    View Room Services & Bookings →
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Metric Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div 
                            onClick={() => setActiveTab('products')} 
                            className="bg-[#120826]/90 border border-purple-950/80 hover:border-purple-800 rounded-xl p-6 shadow-xl cursor-pointer transition hover:scale-[1.02]"
                        >
                            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Total Reservations</p>
                            <p className="text-3xl font-bold text-white mt-2">{totalReservations}</p>
                            <p className="text-xs text-purple-400 mt-2">Active guest stays in database</p>
                        </div>
                        <div 
                            onClick={() => setActiveTab('products')} 
                            className="bg-[#120826]/90 border border-purple-950/80 hover:border-purple-800 rounded-xl p-6 shadow-xl cursor-pointer transition hover:scale-[1.02]"
                        >
                            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Active Services</p>
                            <p className="text-3xl font-bold text-purple-300 mt-2">5</p>
                            <p className="text-xs text-purple-400 mt-2">Room Service Categories</p>
                        </div>
                        <div 
                            onClick={() => setActiveTab('products')} 
                            className="bg-[#120826]/90 border border-purple-950/80 hover:border-amber-500/50 rounded-xl p-6 shadow-xl cursor-pointer transition hover:scale-[1.02]"
                        >
                            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Pending Tasks</p>
                            <p className="text-3xl font-bold text-amber-400 mt-2">{pendingTasksCount}</p>
                            <p className="text-xs text-amber-400/80 mt-2">Requests waiting to process</p>
                        </div>
                    </div>
                </div>
            )}

            {/* ROOM SERVICES & BOOKINGS TAB VIEW */}
            {activeTab === 'products' && (
                <div className="space-y-8">
                    {/* Hero Banner with hotell.jpg Cover Background */}
                    <div 
                        className="relative overflow-hidden rounded-2xl shadow-2xl h-80 bg-cover bg-center border border-purple-900/40"
                        style={{ backgroundImage: "url('/hotell.jpg')" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0424] via-[#120826]/85 to-black/40 p-8 md:p-10 flex items-end">
                            <div className="relative z-10 max-w-2xl">
                                <p className="text-xs font-mono tracking-widest text-purple-300 uppercase mb-2">
                                    // CASA MARISOL . SERVICES & BOOKINGS
                                </p>
                                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
                                    Long day? Get items & services worth coming back to.
                                </h1>
                                <p className="text-slate-200 text-sm mb-5 leading-relaxed">
                                    Skip the queue. Submit guest requests, room service orders, or stay preferences and the front desk will confirm details instantly.
                                </p>
                                <button 
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold px-5 py-2.5 rounded-lg text-sm transition shadow-lg shadow-amber-400/10 cursor-pointer"
                                >
                                    Add New Request / Service
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* All Requests Table */}
                    <div className="bg-[#120826]/90 border border-purple-950/80 rounded-2xl shadow-xl overflow-hidden backdrop-blur-md">
                        <div className="p-6 border-b border-purple-950/60 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-white tracking-wide">All Requests</h3>
                            <span className="text-xs text-purple-400 font-mono">{displayProducts.length} Total Requests</span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-purple-950/60 text-[11px] font-mono tracking-wider text-slate-400 uppercase bg-[#170a33]/40">
                                        <th className="py-3 px-6">Guest / Item</th>
                                        <th className="py-3 px-6">Reference</th>
                                        <th className="py-3 px-6">Type</th>
                                        <th className="py-3 px-6">Request Notes</th>
                                        <th className="py-3 px-6">Status</th>
                                        <th className="py-3 px-6 text-center">Time</th>
                                        <th className="py-3 px-6 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-purple-950/30 text-sm">
                                    {displayProducts.map((item) => (
                                        <tr key={item.id} className="hover:bg-purple-950/20 transition">
                                            <td className="py-4 px-6 font-medium text-white">{item.name}</td>
                                            <td className="py-4 px-6 text-slate-300 font-mono text-xs">{item.reference}</td>
                                            <td className="py-4 px-6 text-slate-300">{item.type}</td>
                                            <td className="py-4 px-6 text-slate-400 text-xs">{item.request}</td>
                                            <td className="py-4 px-6">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleStatus(item)}
                                                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition hover:scale-105 ${
                                                        item.status === 'Pending' 
                                                            ? 'bg-amber-400/10 text-amber-400 border border-amber-400/30' 
                                                            : 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/30'
                                                    }`}
                                                    title="Click to toggle Pending / Resolved"
                                                >
                                                    {item.status}
                                                </button>
                                            </td>
                                            <td className="py-4 px-6 text-center text-slate-400 font-mono text-xs">{item.time || '12:00 PM'}</td>
                                            <td className="py-4 px-6 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(item.id)}
                                                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-600 transition border border-rose-500/20 cursor-pointer"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL FORM FOR NEW REQUEST / SERVICE */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
                    <div className="bg-[#120826] border border-purple-900/60 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative">
                        <div className="flex justify-between items-center mb-6 border-b border-purple-950 pb-4">
                            <h3 className="text-xl font-bold text-white">Add New Request / Service</h3>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-white text-xl font-bold px-2 cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Guest / Item Name</label>
                                <input 
                                    type="text" 
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g. Maria Santos or Airport Shuttle"
                                    className="w-full bg-[#1b0b3b]/80 border border-purple-900/60 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                                    required
                                />
                                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Reference No.</label>
                                    <input 
                                        type="text" 
                                        value={data.reference}
                                        onChange={(e) => setData('reference', e.target.value)}
                                        placeholder="e.g. R-204"
                                        className="w-full bg-[#1b0b3b]/80 border border-purple-900/60 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Room / Service Type</label>
                                    <select 
                                        value={data.type}
                                        onChange={(e) => {
                                            const newType = e.target.value;
                                            setData({
                                                ...data,
                                                type: newType,
                                                reference: generateReference(newType),
                                            });
                                        }}
                                        className="w-full bg-[#1b0b3b]/80 border border-purple-900/60 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                                    >
                                        <option value="Deluxe">Deluxe Room</option>
                                        <option value="Suite">Presidential Suite</option>
                                        <option value="Dining">Room Dining</option>
                                        <option value="Transport">Transport / Shuttle</option>
                                        <option value="Wellness">Spa & Wellness</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Request Notes</label>
                                <textarea 
                                    value={data.request}
                                    onChange={(e) => setData('request', e.target.value)}
                                    placeholder="e.g. Late check-in after 10 PM, extra pillows needed"
                                    rows="3"
                                    className="w-full bg-[#1b0b3b]/80 border border-purple-900/60 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                                    required
                                ></textarea>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4 border-t border-purple-950">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white bg-purple-950/40 hover:bg-purple-900/40 transition cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2 rounded-lg text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 transition shadow-lg shadow-amber-400/10 cursor-pointer"
                                >
                                    {processing ? 'Saving...' : 'Submit Request'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}