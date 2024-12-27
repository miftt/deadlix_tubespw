import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { User } from "@/types";
import { FormEventHandler, useEffect } from "react";
import {  useForm, router } from "@inertiajs/react";
import { toast } from "sonner";

interface UserDialogProps {
    user?: User;
    open: boolean;
    id?: string;
    onOpenChange: (open: boolean) => void;
    onSave: (userData: Partial<User>) => void;
    deleteDialogOpen: boolean;
    onDeleteDialogChange: (open: boolean) => void;
    userToDelete: number | null;
    onDelete: (userId: number) => void;
}

export function UserDialog({
    user,
    open,
    onOpenChange,
    onSave,
    deleteDialogOpen,
    onDeleteDialogChange,
    userToDelete,
    onDelete
}: UserDialogProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        id: user?.id || '',
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        role: user?.role || 'user',
        status: user?.status || 'nonaktif',
        is_admin: user?.is_admin || false
    });

    // Update form data when user prop changes
    useEffect(() => {
        if (user) {
            setData({
                id: user.id,
                name: user.name,
                email: user.email,
                password: '',
                role: user.role,
                status: user.status,
                is_admin: user.is_admin
            });
        } else {
            reset();
        }
    }, [user]);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (user) {
            // Update existing user
            put(route('admin.user.update', { id: user.id }), {
                onSuccess: () => {
                    onOpenChange(false);
                    reset();
                    toast.success('User updated successfully');
                    setTimeout(() => {
                        router.visit(route('admin.users'));
                    }, 1000);
                },
                onError: (errors) => {
                    toast.error('Failed to update user');
                }
            });
        } else {
            // Create new user
            post(route('admin.user.store'), {
                onSuccess: () => {
                    onOpenChange(false);
                    reset();
                    toast.success('User created successfully');
                    setTimeout(() => {
                        router.visit(route('admin.users'));
                    }, 1000);
                },
                onError: (errors) => {
                    toast.error('Failed to create user');
                }
            });
        }
    };

    // Reset form when modal is closed
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            reset();
        }
        onOpenChange(open);
    };

    const confirmDelete = () => {
        if (userToDelete) {
            router.delete(`/admin/users/${userToDelete}`, {
                onSuccess: () => {
                    onDelete(userToDelete);
                    onDeleteDialogChange(false);
                    toast.success('User deleted successfully');
                },
            });
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{user ? 'Edit User' : 'Add New User'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) => setData("status", e.target.value)}
                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                            >
                                <option value="aktif">Aktif</option>
                                <option value="nonaktif">Nonaktif</option>
                            </select>
                        </div>
                        <div>
                            <Label htmlFor="role">Role</Label>
                            <select
                                id="role"
                                value={data.role}
                                onChange={(e) => {
                                    setData(data => ({
                                        ...data,
                                        role: e.target.value,
                                        is_admin: e.target.value === 'admin'
                                    }))
                                }}
                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                            {errors.role && (
                                <p className="text-sm text-red-500 mt-1">{errors.role}</p>
                            )}
                        </div>
                        {!user && (
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData("password", e.target.value)}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                                )}
                            </div>
                        )}
                        {errors.error && (
                            <div className="p-2 text-sm text-red-500 bg-red-50 rounded">
                                {"something went wrong"}
                            </div>
                        )}
                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleOpenChange(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : 'Save'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={deleteDialogOpen} onOpenChange={onDeleteDialogChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete User</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this user? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => onDeleteDialogChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}