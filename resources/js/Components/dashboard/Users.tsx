import { useState } from 'react';
import { UserTable } from '@/Components/dashboard/user-table';
import { UserDialog } from '@/Pages/Admin/Dialog/UserDialog';
import { Button } from '@/Components/ui/button';
import { Plus, Users as UsersIcon } from 'lucide-react';
import { User } from '@/types';
import { Head } from '@inertiajs/react';
interface users {
    users: any;
}

export default function UsersPage(user: users) {
    const [users, setUsers] = useState<User[]>(user.users);
    const [selectedUser, setSelectedUser] = useState<User | undefined>();
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleSave = (userData: Partial<User>) => {
        if (selectedUser) {
            setUsers(users.map((user) =>
                user.id === selectedUser.id ? { ...user, ...userData } : user
            ));
        } else {
            const newUser: User = {
                id: users.length + 1,
                status: 'active',
                created_at: new Date().toISOString(),
                ...userData,
            } as User;
            setUsers([...users, newUser]);
        }
    };

    const handleDelete = (userId: number) => {
        setUsers(users.filter((user) => user.id !== userId));
    };

    return (
        <>
            <Head title="Users Management" />
            <div className="flex">
                <div className="flex-1">
                    <div className="flex min-h-screen flex-col gap-8 p-8">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <UsersIcon className="h-6 w-6 text-gray-400" />
                                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                        Users
                                    </h1>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Manage user accounts and permissions.
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Button
                                    onClick={() => {
                                        setSelectedUser(undefined);
                                        setDialogOpen(true);
                                    }}
                                    className="bg-red-600 text-white hover:bg-red-700"
                                >
                                    <Plus className="mr-2 h-4 w-4" /> Add User
                                </Button>
                            </div>
                        </div>

                        <UserTable
                            users={users}
                            onEdit={(user) => {
                                setSelectedUser(user);
                                setDialogOpen(true);
                            }}
                            onDelete={handleDelete}
                        />

                        <UserDialog
                            user={selectedUser}
                            open={dialogOpen}
                            onOpenChange={setDialogOpen}
                            onSave={handleSave}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}