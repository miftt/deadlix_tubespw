import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';
import { Clock, Edit2, History, LogOut, ShoppingCart, Users } from 'lucide-react';

interface Props {
    subscription?: {
        plan: string;
        validUntil: string;
        status: string;
    };
}

export default function Dashboard({ subscription }: Props) {
    const { auth } = usePage().props;
    return (
        <>
            <Navbar user={auth.user} />
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6">
                        {/* Plan Card */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                                <CardTitle className="text-2xl font-bold">Your plan</CardTitle>
                                <div className="flex items-center space-x-2">
                                    {subscription?.plan === 'Pro' && (
                                        <div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {subscription.plan}
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                {subscription ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                            <Clock className="w-5 h-5 mr-2" />
                                            Your {subscription.plan} is valid until {new Date(subscription.validUntil).toLocaleDateString('id-ID')}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center space-y-4">
                                        <p className="text-gray-600 dark:text-gray-400">
                                            You don't have an active subscription
                                        </p>
                                        <Button asChild>
                                            <Link href={route('premium.index')}>
                                                Get Premium
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Account Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">Account</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <Link
                                        href={route('profile.edit')}
                                        className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <Edit2 className="w-5 h-5" />
                                            <span>Edit profile</span>
                                        </div>
                                    </Link>

                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="flex items-center justify-between w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <LogOut className="w-5 h-5" />
                                            <span>Logout</span>
                                        </div>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">Purchase</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <Link
                                        href={route('premium.index')}
                                        className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <ShoppingCart className="w-5 h-5" />
                                            <span>Purchase premium plan</span>
                                        </div>
                                    </Link>

                                    <Link
                                        href={route('dashboard.history')}
                                        className="flex items-center justify-between w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <History className="w-5 h-5" />
                                            <span>History</span>
                                        </div>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                        {auth.user.role === 'admin' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold">Admin</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <Link
                                            href={route('admin.users.index')}
                                            className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <Users className="w-5 h-5" />
                                                <span>Dashboard admin</span>
                                            </div>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
} 