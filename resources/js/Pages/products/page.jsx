import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ProductsPage({ products = [] }) {
    const sampleProducts = products.length > 0 ? products : [
        { id: 1, name: 'Deluxe Suite Setup', reference: 'R-204', type: 'Deluxe', request: 'Late check-in after 10 PM', status: 'Pending', time: '09:21 AM' },
        { id: 2, name: 'Executive Suite Package', reference: 'R-311', type: 'Suite', request: 'Anniversary setup', status: 'Pending', time: '09:26 AM' },
        { id: 3, name: 'Standard Room Prep', reference: 'R-107', type: 'Standard', request: 'Ground floor room', status: 'Pending', time: '09:37 AM' },
        { id: 4, name: 'VIP Airport Pickup', reference: 'R-402', type: 'Executive', request: 'Airport pickup', status: 'Confirmed', time: '08:54 AM' },
        { id: 5, name: 'Extra Bed Arrangement', reference: 'R-215', type: 'Family', request: 'Extra bed for child', status: 'Confirmed', time: '08:49 AM' },
    ];

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-white leading-tight">Products & Requests</h2>}
        >
            <Head title="Products" />

            <div className="space-y-8">
                {/* Banner Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1b0b3b] via-[#150730] to-[#0f0424] p-8 border border-purple-900/40 shadow-2xl">
                    <div className="relative z-10 max-w-2xl">
                        <p className="text-xs font-mono tracking-widest text-purple-400 uppercase mb-2">
                            // catalog . management
                        </p>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3">
                            Long day? Get items & services worth coming back to.
                        </h1>
                        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                            Skip the queue. Submit product or booking requests and the front desk will confirm details instantly.
                        </p>
                        <button className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold px-5 py-2.5 rounded-lg text-sm transition shadow-lg shadow-amber-400/10">
                            Add New Product
                        </button>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="bg-[#13072b]/80 border border-purple-950/60 rounded-xl p-5 shadow-lg backdrop-blur-sm">
                        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Total Products</p>
                        <p className="text-3xl font-bold text-white mt-2">48</p>
                    </div>
                    <div className="bg-[#13072b]/80 border border-purple-950/60 rounded-xl p-5 shadow-lg backdrop-blur-sm">
                        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Categories</p>
                        <p className="text-3xl font-bold text-purple-300 mt-2">6</p>
                    </div>
                    <div className="bg-[#13072b]/80 border border-purple-950/60 rounded-xl p-5 shadow-lg backdrop-blur-sm">
                        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Processing Time</p>
                        <p className="text-3xl font-bold text-emerald-400 mt-2">14:00</p>
                    </div>
                </div>

                {/* Table Component */}
                <div className="bg-[#120826]/90 border border-purple-950/80 rounded-2xl shadow-xl overflow-hidden backdrop-blur-md">
                    <div className="p-6 border-b border-purple-950/60 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-white tracking-wide">All Requests</h3>
                        <div className="flex bg-[#0b0318] p-1 rounded-lg border border-purple-950/60 text-xs font-medium">
                            <button className="px-3 py-1.5 rounded-md bg-purple-700 text-white shadow">All</button>
                            <button className="px-3 py-1.5 rounded-md text-slate-400 hover:text-white transition">Pending</button>
                            <button className="px-3 py-1.5 rounded-md text-slate-400 hover:text-white transition">Confirmed</button>
                        </div>
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
                                    <th className="py-3 px-6 text-right">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-purple-950/30 text-sm">
                                {sampleProducts.map((item) => (
                                    <tr key={item.id} className="hover:bg-purple-950/20 transition">
                                        <td className="py-4 px-6 font-medium text-white">{item.name}</td>
                                        <td className="py-4 px-6 text-slate-300 font-mono text-xs">{item.reference}</td>
                                        <td className="py-4 px-6 text-slate-300">{item.type}</td>
                                        <td className="py-4 px-6 text-slate-400 text-xs">{item.request}</td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                                item.status === 'Pending' 
                                                    ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20' 
                                                    : 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right text-slate-400 font-mono text-xs">{item.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}