import { FormEventHandler } from "react";
import { Link, useForm } from "@inertiajs/react";

interface RegisterProps {
    status?: string;
}

export default function Register({ status }: RegisterProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
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
                    <h1 className="text-center text-white text-2xl font-bold mb-4">Register</h1>

                    {/* Menampilkan status jika ada */}
                    {status && (
                        <div className="mb-4 text-center">
                            <span className="text-green-500">{status}</span>
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={submit}>
                        {/* Input Name */}
                        <div>
                            <label htmlFor="name" className="text-sm font-medium text-gray-300 block">
                                Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                                placeholder="Your Name"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

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
                                required
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
                                required
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        {/* Input Confirm Password */}
                        <div>
                            <label htmlFor="password_confirmation" className="text-sm font-medium text-gray-300 block">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                                placeholder="••••••••"
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation}</p>}
                        </div>

                        <button
                            className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                            type="submit"
                            disabled={processing}
                        >
                            {processing ? 'Registering...' : 'Register'}
                        </button>
                    </form>

                    {/* Link ke halaman login */}
                    <div className="text-center text-gray-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-red-500 hover:underline">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
