import { FormEventHandler } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { PlayCircle } from 'lucide-react';
import InputError from '@/Components/InputError';

export default function Login() {
    const {data, setData, post, reset, processing, errors } = useForm({
        email: '',
        password: '',
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img
                    src="/images/loginbg.Png"
                    alt="Background"
                    className="w-full h-full object-cover zoom-in-125"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Login Form */}
            <div className="max-w-md w-full space-y-8 relative z-10">
                {/* Glass effect container */}
                <div className="backdrop-blur-md bg-black/80 p-8 rounded-xl shadow-2xl border border-gray-800">
                    <div className="flex justify-center mb-8">
                        <Link href="/" className="flex items-center">
                            <PlayCircle size={32} className="mr-1 text-red-500" />
                            <span className="text-white text-xl font-bold">Deadflix</span>
                        </Link>
                    </div>
                    <div>
                        <h2 className="mt-2 text-center text-3xl font-extrabold text-white">
                            Sign in to your account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={submit}>
                        <div className="rounded-md space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-gray-200 text-sm font-medium">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-3 py-2.5 border border-gray-600 bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent focus:z-10 sm:text-sm"
                                    placeholder="Enter your email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className='mt-2'/>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-gray-200 text-sm font-medium">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-3 py-2.5 border border-gray-600 bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent focus:z-10 sm:text-sm"
                                    placeholder="Enter your password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className='mt-2'/>
                            </div>
                        </div>

                        <div>
                            <button
                                disabled={processing}
                                type="submit"
                                className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div className="mt-6 text-center text-sm">
                        <p className="text-gray-300">
                            Don't have an account?{' '}
                            <Link
                                href="/register"
                                className="font-semibold text-red-500 hover:text-red-400 transition-colors duration-200"
                            >
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
