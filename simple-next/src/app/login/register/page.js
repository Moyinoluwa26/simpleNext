"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            });

            if (res.ok) {
                const data = await res.json();
                console.log(data);
                router.push('/login');
            }
            else if (res.status === 400) {
                setError("This email is already registered");

            } else {
                const errorData = await res.json();
                setError(errorData.message || 'Something went wrong');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-r from-purple-500 to-blue-500">
            <div className='h-96 bg-white flex flex-col my-auto rounded-2xl w-96 justify-between '>
                <form onSubmit={handleSubmit} className='px-5 flex mt-9   flex-col my-3'>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                        className='mt-5 h-9'
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className='mt-5 h-9'
                    />
                    <input
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className='mt-5 h-9'
                    />
                    <button type="submit" className='mt-9 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-gray-500 w-36  text-white text-lg '>Register</button>
                </form>

                {error && <p style={{ color: 'red' }} className='bg-black h-12 '>{error}</p>}
            </div>
        </div>
    );
}


