import React from 'react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import {
    Users,
    CreditCard,
    LayoutDashboard,
    Settings,
    LogOut
} from 'lucide-react';
import { Toaster } from 'sonner';

interface SidebarProps {
    className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
    const menuItems = [
        {
            title: "Dashboard",
            icon: <LayoutDashboard className="w-5 h-5" />,
            href: route('admin.dashboard')
        },
        {
            title: "Users Management",
            icon: <Users className="w-5 h-5" />,
            href: route('admin.users.index')
        },
        {
            title: "Transactions",
            icon: <CreditCard className="w-5 h-5" />,
            href: route('admin.transactions')
        },
    ];

    return (
        <>
            <div className={cn("pb-12 min-h-screen", className)}>
                <Toaster position="top-center" richColors />
                <div className="space-y-4 py-4">
                    <div className="px-3 py-2">
                        <h2 className="mb-6 px-4 text-lg font-semibold">
                            Admin Dashboard
                        </h2>
                        <div className="space-y-1">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center rounded-lg px-3 py-2 text-gray-900 dark:text-gray-100 transition-all hover:bg-gray-100 dark:hover:bg-gray-800",
                                        route().current(item.href) ? 'bg-gray-100 dark:bg-gray-800' : ''
                                    )}
                                >
                                    {item.icon}
                                    <span className="ml-3">{item.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="px-3 py-2 absolute bottom-4">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex w-full items-center rounded-lg px-3 py-2 text-red-500 transition-all hover:bg-red-100 dark:hover:bg-red-900"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="ml-3">Logout</span>
                    </Link>
                </div>
            </div>
        </>
    );
} 