import { UserStats } from '@/Components/dashboard/user-stats';
import { UserChart } from '@/Components/dashboard/user-chart';
import { LayoutDashboard } from 'lucide-react';
import { User } from '@/types';

interface DashboardPageProps {
    users: User[];
}

export default function DashboardPage({ users }: DashboardPageProps) {
    const safeUsers = users || [];
    
    const adminPercentage = safeUsers.length > 0
        ? Math.round((safeUsers.filter(u => u.role === 'admin').length / safeUsers.length) * 100)
        : 0;
    
    const userPercentage = safeUsers.length > 0
        ? Math.round((safeUsers.filter(u => u.role === 'user').length / safeUsers.length) * 100)
        : 0;

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

            <UserStats users={safeUsers} />

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
                            percentage: adminPercentage
                        },
                        {
                            name: 'Users',
                            percentage: userPercentage
                        },
                    ]}
                />
            </div>
        </div>
    );
}