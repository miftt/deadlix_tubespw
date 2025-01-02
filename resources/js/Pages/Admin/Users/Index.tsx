import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { User } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { MoreHorizontal, UserPlus, Pencil, Trash2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { toast } from 'sonner';
import Pagination from '@/Components/Pagination';

interface Props {
    users: {
        data: User[];
        links: any;
    };
}

export default function Index({ users }: Props) {
    const { auth } = usePage().props;
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        password: '',
    });

    // Handle form submission for create/edit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedUser) {
            // Edit mode
            router.put(route('admin.users.update', selectedUser.id), formData, {
                onSuccess: () => {
                    setIsEditModalOpen(false);
                    toast.success('User updated successfully');
                },
                onError: (errors) => {
                    Object.keys(errors).forEach((key) => {
                        toast.error(errors[key]);
                    });
                }
            });
        } else {
            // Create mode
            router.post(route('admin.users.store'), formData, {
                onSuccess: () => {
                    setIsCreateModalOpen(false);
                    toast.success('User created successfully');
                },
                onError: (errors) => {
                    Object.keys(errors).forEach((key) => {
                        toast.error(errors[key]);
                    });
                }
            });
        }
    };

    // Handle delete
    const handleDelete = () => {
        if (selectedUser) {
            router.delete(route('admin.users.destroy', selectedUser.id), {
                onSuccess: () => {
                    setIsDeleteModalOpen(false);
                    toast.success('User deleted successfully');
                },
                onError: (error) => {
                    toast.error('Failed to delete user');
                }
            });
        }
    };

    // Open edit modal with user data
    const openEditModal = (user: User) => {
        setSelectedUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            password: '',
        });
        setIsEditModalOpen(true);
    };

    // Open create modal
    const openCreateModal = () => {
        setSelectedUser(null);
        setFormData({
            name: '',
            email: '',
            role: 'user',
            password: '',
        });
        setIsCreateModalOpen(true);
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role.toLowerCase()) {
            case 'admin':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default:
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Manage Users" />

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                    <CardTitle className="text-2xl font-bold">Users Management</CardTitle>
                    <Button onClick={openCreateModal}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add New User
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead className="w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Badge className={getRoleBadgeColor(user.role)} variant="outline">
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => openEditModal(user)}>
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="text-red-600 focus:text-red-600"
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setIsDeleteModalOpen(true);
                                                        }}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <Pagination links={users.links} />
                </CardContent>
            </Card>

            {/* Create/Edit Modal */}
            <Dialog open={isCreateModalOpen || isEditModalOpen}
                onOpenChange={() => {
                    setIsCreateModalOpen(false);
                    setIsEditModalOpen(false);
                }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {selectedUser ? 'Edit User' : 'Create New User'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="role">Role</Label>
                                <Select
                                    value={formData.role}
                                    onValueChange={(value) => setFormData({ ...formData, role: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password {selectedUser && '(leave blank to keep current)'}</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required={!selectedUser}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">
                                {selectedUser ? 'Update' : 'Create'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this user? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}