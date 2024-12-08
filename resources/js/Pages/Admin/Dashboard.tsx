import { Sidebar } from './Layouts/Sidebar';
import { Head } from '@inertiajs/react';
import DashboardPage from '@/Components/dashboard/Dashboard';
export default function Dashboard() {
    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-8">
                    <DashboardPage />
                </main>
            </div>
        </>
    );
}