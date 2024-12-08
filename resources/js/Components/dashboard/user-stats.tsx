import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Users, UserPlus, UserMinus } from "lucide-react";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

interface UserStatsProps {
    users: User[];
}

export function UserStats({ users }: UserStatsProps) {
    const totalUsers = users.length;
    const adminUsers = users.filter(user => user.role === 'admin').length;
    const regularUsers = users.filter(user => user.role === 'user').length;

    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Card className="dark:border-gray-800 dark:bg-gray-900/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium ">
                        Total Users
                    </CardTitle>
                    <Users className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold ">{totalUsers}</div>
                </CardContent>
            </Card>

            <Card className="dark:border-gray-800 dark:bg-gray-900/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium ">
                        Admin Users
                    </CardTitle>
                    <UserPlus className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold ">{adminUsers}</div>
                </CardContent>
            </Card>

            <Card className="dark:border-gray-800 dark:bg-gray-900/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Regular Users
                    </CardTitle>
                    <UserMinus className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{regularUsers}</div>
                </CardContent>
            </Card>
        </div>
    );
}
