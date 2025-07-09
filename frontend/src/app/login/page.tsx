// frontend/app/login/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for App Router

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Login successful!');
                // Store the JWT (e.g., in localStorage for now, we'll discuss secure options like HttpOnly cookies later)
                localStorage.setItem('nexusToken', data.token);
                // You might also store username/email from `data` if needed for display
                localStorage.setItem('nexusUsername', data.username); // Store username for display
                // Redirect to a dashboard or home page
                router.push('/dashboard'); // Create this page later
            } else {
                setMessage(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage('Network error. Could not connect to the server.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-white mb-6 text-center">Login to Nexus</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Correctly using setEmail
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Corrected: now uses setPassword
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Login
                    </button>
                </form>
                {message && (
                    <p className={`mt-4 text-center ${message.includes('successful') ? 'text-green-400' : 'text-red-400'}`}>
                        {message}
                    </p>
                )}
                <p className="mt-4 text-center text-gray-400">
                    Don&apos;t have an account? <a href="/register" className="text-blue-500 hover:underline">Register here</a>
                </p>
            </div>
        </div>
    );
}