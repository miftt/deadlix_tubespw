import { FormEventHandler, useState } from "react";
import { Link, useForm } from "@inertiajs/react";

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    // Gunakan useForm untuk mengelola state form
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // Handler submit
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="h-screen w-full hero-bg">
            <header className="max-w-7xl mx-auto flex items-center justify-between p-4">
                <Link href="/">
                    <img src="/images/deadlix-logo.png" alt="logo" className="w-52" />
                </Link>
            </header>

            <div className="flex justify-center items-center mt-20 mx-3">
                <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
                    <h1 className="text-center text-white text-2xl font-bold mb-4">Login</h1>

                    {/* Menampilkan status jika ada */}
                    {status && (
                        <div className="mb-4 text-center">
                            <span className="text-green-500">{status}</span>
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={submit}>
                        {/* Input Email */}
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-300 block">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                                placeholder="you@example.com"
                                id="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        {/* Input Password */}
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-300 block">
                                Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                                placeholder="••••••••"
                                id="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        <button
                            className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                            type="submit"
                            disabled={processing}
                        >
                            {processing ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    {/* Link untuk reset password jika diizinkan */}
                    {canResetPassword && (
                        <div className="text-center">
                            <Link href="/forgot-password" className="text-red-500 hover:underline text-sm">
                                Forgot your password?
                            </Link>
                        </div>
                    )}

                    {/* Link ke halaman sign up */}
                    <div className="text-center text-gray-400">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-red-500 hover:underline">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
