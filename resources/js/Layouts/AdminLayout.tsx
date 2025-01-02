import React from 'react';
import { User } from '@/types';
import Navbar from '@/Components/Navbar';
import Sidebar from '@/Components/Sidebar';

interface AdminLayoutProps {
    children: React.ReactNode;
    user: User;
}

export default function AdminLayout({ children, user }: AdminLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="flex">
                <Sidebar className="w-64 border-r bg-white dark:bg-gray-800" />
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
} 