import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import UpdateProfileForm from '@/Pages/Profile/Partials/UpdateProfileForm';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm';
import UpdateProfilePhotoForm from '@/Pages/Profile/Partials/UpdateProfilePhotoForm';

export default function Edit() {
    const { auth } = usePage().props;

    return (
        <>
            <Navbar user={auth.user} />
            <Head title="Edit Profile" />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 mt-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">Profile Photo</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <UpdateProfilePhotoForm user={auth.user} />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">Update Profile</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <UpdateProfileForm user={auth.user} />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">Update Password</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <UpdatePasswordForm />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">Delete Account</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <DeleteUserForm />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
