import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ activeTab, setActiveTab, children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-[#0b041a] text-slate-100 font-sans selection:bg-purple-500 selection:text-white">
            <nav className="border-b border-purple-950/60 bg-[#120826]/90 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center space-x-8">
                            {/* Brand Logo */}
                            <div className="shrink-0 flex items-center">
                                <button onClick={() => setActiveTab('home')} className="flex items-center space-x-2">
                                    <span className="text-purple-400 font-mono text-sm bg-purple-950/60 px-2.5 py-1 rounded border border-purple-800/40">
                                        &lt;/&gt;
                                    </span>
                                    <span className="font-bold text-white tracking-wide">Casa Marisol</span>
                                </button>
                            </div>

                            {/* Tab Switcher Buttons */}
                            <div className="hidden space-x-6 sm:flex h-full items-center">
                                <button
                                    onClick={() => setActiveTab('home')}
                                    className={`h-full border-b-2 px-1 pt-1 text-sm font-medium transition ${
                                        activeTab === 'home'
                                            ? 'border-purple-500 text-white font-semibold'
                                            : 'border-transparent text-slate-400 hover:text-slate-200'
                                    }`}
                                >
                                    Home
                                </button>
                                <button
                                    onClick={() => setActiveTab('products')}
                                    className={`h-full border-b-2 px-1 pt-1 text-sm font-medium transition ${
                                        activeTab === 'products'
                                            ? 'border-purple-500 text-white font-semibold'
                                            : 'border-transparent text-slate-400 hover:text-slate-200'
                                    }`}
                                >
                                    Room Services & Bookings
                                </button>
                            </div>
                        </div>

                        {/* User Profile Dropdown */}
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="inline-flex items-center px-3 py-2 border border-purple-900/50 text-sm leading-4 font-medium rounded-md text-slate-300 bg-[#1b0b3b]/60 hover:text-white hover:bg-purple-900/40 focus:outline-none transition">
                                        {user.name}
                                        <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Header Title */}
            <header className="bg-[#120826]/40 border-b border-purple-950/30 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h2 className="font-semibold text-xl text-white leading-tight capitalize">
                        {activeTab === 'home' ? 'Dashboard' : 'Room Services & Bookings'}
                    </h2>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
        </div>
    );
}