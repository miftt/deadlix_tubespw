import { useForm } from '@inertiajs/react';
import React from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { toast } from 'sonner';

export default function UpdatePasswordForm() {
    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('password.update'), {
            onSuccess: () => {
                reset();
                toast.success('Password updated.');
            },
            onError: () => {
                toast.error('Failed to update password.');
            }
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <div>
                <Label htmlFor="current_password">Current Password</Label>
                <Input
                    id="current_password"
                    type="password"
                    value={data.current_password}
                    onChange={(e) => setData('current_password', e.target.value)}
                />
                {errors.current_password && (
                    <p className="text-sm text-red-600 mt-1">{errors.current_password}</p>
                )}
            </div>

            <div>
                <Label htmlFor="password">New Password</Label>
                <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                />
                {errors.password && (
                    <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                )}
            </div>

            <div>
                <Label htmlFor="password_confirmation">Confirm Password</Label>
                <Input
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                />
            </div>

            <Button type="submit" disabled={processing}>
                Update Password
            </Button>
        </form>
    );
}
