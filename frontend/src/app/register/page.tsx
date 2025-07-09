// frontend/app/register/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for App Router

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Registration successful! You can now log in.');
                // Optionally redirect to login page after successful registration
                router.push('/login');
            } else {
                setMessage(data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setMessage('Network error. Could not connect to the server.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-white mb-6 text-center">Register for Nexus</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-300 text-sm font-bold mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // Correctly using setUsername
                            required
                        />
                    </div>
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
                            onChange={(e) => setPassword(e.target.value)} // Correctly using setPassword
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Register
                    </button>
                </form>
                {message && (
                    <p className={`mt-4 text-center ${message.includes('successful') ? 'text-green-400' : 'text-red-400'}`}>
                        {message}
                    </p>
                )}
                {/* Note: 'Already have an account?' has no apostrophe, so no escaping needed here */}
                <p className="mt-4 text-center text-gray-400">
                    Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login here</a>
                </p>
            </div>
        </div>
    );
}