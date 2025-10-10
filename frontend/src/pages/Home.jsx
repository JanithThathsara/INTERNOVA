import React from "react";

export default function Home() {
    return (
        <div style={{ background: 'linear-gradient(180deg, #ffffff 0%, #ad91a3 100%)' }} className="min-h-screen">
            {/* Hero Section */}
            <div className="px-8 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-800 mb-6">
                        Welcome to <span className="text-purple-600">NoticeBoard</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        A comprehensive platform for managing notices, direct messages, and
                        notifications. Stay connected and informed with our intuitive
                        communication system.
                    </p>
                    <div className="mt-8">
                        <button
                            style={{
                                background: 'linear-gradient(135deg, #7b5e86, #ad91a3)',
                                color: 'white'
                            }}
                            className="font-semibold py-3 px-8 rounded-lg shadow-lg transform transition hover:scale-105"
                        >
                            Get Started
                        </button>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-16 max-w-6xl mx-auto">
                    <div
                        className="rounded-xl p-8 hover:shadow-xl transition-shadow"
                        style={{
                            background: 'rgba(255, 255, 255, 0.85)',
                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
                        }}
                    >
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <svg
                                className="w-8 h-8 text-purple-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                            Notice Management
                        </h3>
                        <p className="text-gray-600 text-center leading-relaxed">
                            Create, edit, and publish notices with ease. Organize
                            announcements and keep everyone informed.
                        </p>
                    </div>

                    <div
                        className="rounded-xl p-8 hover:shadow-xl transition-shadow"
                        style={{
                            background: 'rgba(255, 255, 255, 0.85)',
                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
                        }}
                    >
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <svg
                                className="w-8 h-8 text-purple-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                            Direct Messages
                        </h3>
                        <p className="text-gray-600 text-center leading-relaxed">
                            Send and receive private messages. Communicate directly with team
                            members and colleagues.
                        </p>
                    </div>

                    <div
                        className="rounded-xl p-8 hover:shadow-xl transition-shadow lg:col-span-1 md:col-span-2 lg:col-span-1"
                        style={{
                            background: 'rgba(255, 255, 255, 0.85)',
                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
                        }}
                    >
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <svg
                                className="w-8 h-8 text-purple-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 17h5l-5 5v-5zM15 17H9a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v10z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                            Smart Notifications
                        </h3>
                        <p className="text-gray-600 text-center leading-relaxed">
                            Stay updated with real-time notifications. Never miss important
                            announcements or messages.
                        </p>
                    </div>
                </div>

                {/* Stats Section */}
                <div
                    className="rounded-2xl mt-16 p-8 max-w-4xl mx-auto"
                    style={{
                        background: 'rgba(255, 255, 255, 0.85)',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                        Platform Statistics
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-4">
                            <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
                            <div className="text-gray-600 font-medium">Active Users</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-bold text-purple-600 mb-2">
                                1,200+
                            </div>
                            <div className="text-gray-600 font-medium">Messages Sent</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
                            <div className="text-gray-600 font-medium">Uptime</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
