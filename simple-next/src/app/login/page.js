'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('token', data.token);
                console.log(data);
                router.push('/hommo');


            } else if (res.status === 400) {

                setError("You have entered a wrong email or password");

            } else {
                const errorData = await res.json();
                setError(errorData.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    }
    return (
        <div className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-r from-purple-500 to-blue-500">
            <div className='h-96 bg-white  flex flex-col my-auto rounded-2xl w-96 justify-between '>

                <form onSubmit={handleSubmit} className='flex flex-col px-5 mt-9 text-mb '>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="  Email"
                        required
                        className='mb-5 h-9'
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="  Password"
                        required
                        className='mb-5 mt-5 h-9'
                    />
                    <button type="submit" className='h-9 w-24  rounded-xl bg-gradient-to-l from-gray-500 to-blue-500'>Login</button>
                </form>
                {error && <p className='h-12 text-xl text-red-500 ml-5'>{error}</p>}
                <button onClick={() => router.push('/login/register')} className='ml-5 mb-9 bg-gradient-to-l from-blue-500 to-gray-500 h-9 w-72 rounded-xl  '>Dont have an Acct ? :: Register</button>
            </div>

        </div>
    );
}

export default Login;