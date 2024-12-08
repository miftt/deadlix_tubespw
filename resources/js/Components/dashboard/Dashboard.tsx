import { UserStats } from '@/Components/dashboard/user-stats';
import { UserChart } from '@/Components/dashboard/user-chart';
import { LayoutDashboard } from 'lucide-react';

export default function DashboardPage() {
    const users = [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            role: "admin",
            created_at: "2024-03-15T10:00:00.000Z"
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "user",
            created_at: "2024-03-14T08:30:00.000Z"
        },
        {
            id: 3,
            name: "Bob Wilson",
            email: "bob@example.com",
            role: "user",
            created_at: "2024-03-13T15:45:00.000Z"
        },
        {
            id: 4,
            name: "Alice Brown",
            email: "alice@example.com",
            role: "admin",
            created_at: "2024-03-12T11:20:00.000Z"
        },
        {
            id: 5,
            name: "Charlie Davis",
            email: "charlie@example.com",
            role: "user",
            created_at: "2024-03-11T09:15:00.000Z"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <LayoutDashboard className="h-6 w-6 text-gray-400" />
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                            Dashboard
                        </h1>
                    </div>
                    <p className="text-sm">
                        Overview of your user statistics and growth.
                    </p>
                </div>
            </div>

            <UserStats users={users} />

            <div className="grid gap-6 md:grid-cols-2">
                <UserChart
                    title="Monthly Growth"
                    dataKey="users"
                    type="line"
                />
                <UserChart
                    title="User Distribution"
                    dataKey="percentage"
                    type="bar"
                    data={[
                        {
                            name: 'Admin',
                            percentage: Math.round((users.filter(u => u.role === 'admin').length / users.length) * 100)
                        },
                        {
                            name: 'Users',
                            percentage: Math.round((users.filter(u => u.role === 'user').length / users.length) * 100)
                        },
                    ]}
                />
            </div>
        </div>
    );
}