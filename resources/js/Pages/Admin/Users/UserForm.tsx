import React from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

interface Props {
    user?: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
    isEditing?: boolean;
}

export default function UserForm({ user, isEditing = false }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        role: user?.role || 'user',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.users.update', user?.id));
        } else {
            post(route('admin.users.store'));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <InputLabel htmlFor="name" value="Name" />
                <TextInput
                    id="name"
                    type="text"
                    value={data.name}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('name', e.target.value)}
                    required
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                    id="email"
                    type="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('email', e.target.value)}
                    required
                />
                <InputError message={errors.email} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="password" value="Password" />
                <TextInput
                    id="password"
                    type="password"
                    value={data.password}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('password', e.target.value)}
                    required={!isEditing}
                />
                <InputError message={errors.password} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="role" value="Role" />
                <select
                    id="role"
                    value={data.role}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    onChange={(e) => setData('role', e.target.value)}
                    required
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <InputError message={errors.role} className="mt-2" />
            </div>

            <PrimaryButton disabled={processing}>
                {isEditing ? 'Update User' : 'Create User'}
            </PrimaryButton>
        </form>
    );
} 