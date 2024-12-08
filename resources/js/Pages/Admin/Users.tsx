import { Sidebar } from './Layouts/Sidebar';
import { Head } from '@inertiajs/react';
import UsersPage from '@/Components/dashboard/Users';

export default function Users() {
    return (
        <>
            <Head title="Users Management" />
            <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-8">
                    <UsersPage />
                </main>
            </div>
        </>
    );
}