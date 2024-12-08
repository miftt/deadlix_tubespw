import { User } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { Badge } from '@/Components/ui/badge';

interface UserTableProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (userId: number) => void;
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/50">
            <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                    <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-800">
                            <th className="h-12 px-6 text-left align-middle font-medium text-gray-500 dark:text-gray-300">
                                User
                            </th>
                            <th className="h-12 px-6 text-left align-middle font-medium text-gray-500 dark:text-gray-300">
                                Role
                            </th>
                            <th className="h-12 px-6 text-left align-middle font-medium text-gray-500 dark:text-gray-300">
                                Status
                            </th>
                            <th className="h-12 px-6 text-left align-middle font-medium text-gray-500 dark:text-gray-300">
                                Created
                            </th>
                            <th className="h-12 w-[80px] px-6 text-left align-middle font-medium text-gray-500 dark:text-gray-300">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={user.id}
                                className={`
                  border-b border-gray-200 transition-colors 
                  hover:bg-gray-50 data-[state=selected]:bg-gray-100
                  dark:border-gray-800 dark:hover:bg-gray-800/50 
                  dark:data-[state=selected]:bg-gray-800
                  ${index === users.length - 1 ? 'last:border-none' : ''}
                `}
                            >
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-10 w-10 border border-gray-200 dark:border-gray-700">
                                            <AvatarImage src={user.avatar} />
                                            <AvatarFallback className="bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-300">
                                                {user.name[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900 dark:text-gray-100">
                                                {user.name}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {user.email}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <Badge
                                        variant={user.role === 'admin' ? 'destructive' : 'secondary'}
                                        className={`
                      ${user.role === 'admin'
                                                ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                                                : 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 dark:text-gray-400'}
                    `}
                                    >
                                        {user.role}
                                    </Badge>
                                </td>
                                <td className="p-6">
                                    <Badge
                                        variant={user.status === 'active' ? 'default' : 'secondary'}
                                        className={`
                      ${user.status === 'active'
                                                ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                                                : 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 dark:text-gray-400'}
                    `}
                                    >
                                        {user.status}
                                    </Badge>
                                </td>
                                <td className="p-6 text-gray-500 dark:text-gray-400">
                                    {new Date(user.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </td>
                                <td className="p-6">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="h-8 w-8 p-0 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            className="w-40 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800"
                                        >
                                            <DropdownMenuItem
                                                onClick={() => onEdit(user)}
                                                className="text-gray-700 focus:bg-gray-100 dark:text-gray-300 dark:focus:bg-gray-800"
                                            >
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => onDelete(user.id)}
                                                className="text-red-500 focus:bg-red-50 dark:focus:bg-red-500/10"
                                            >
                                                <Trash className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}