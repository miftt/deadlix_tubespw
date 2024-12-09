import { Sidebar } from './Layouts/Sidebar';
import { Head } from '@inertiajs/react';
import UsersPage from '@/Components/dashboard/Users';
import { PageProps } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

interface Props extends PageProps {
    users: User[];
}

export default function Users({ users }: Props) {
    return (
        <>
            <Head title="Users Management" />
            <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-8">
                    <UsersPage users={users} />
                </main>
            </div>
        </>
    );
}