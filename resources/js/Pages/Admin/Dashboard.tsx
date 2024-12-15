import { Sidebar } from './Layouts/Sidebar';
import { Head } from '@inertiajs/react';
import DashboardPage from '@/Components/dashboard/Dashboard';
import { User } from '@/types';

interface DashboardProps {
    users: User[];
}

export default function Dashboard({ users }: DashboardProps) {
    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-8">
                    <DashboardPage users={users} />
                </main>
            </div>
        </>
    );
}