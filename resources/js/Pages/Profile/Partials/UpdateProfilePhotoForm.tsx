import { useForm } from '@inertiajs/react';
import { User } from '@/types';
import { Button } from '@/Components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    user: any;
}

export default function UpdateProfilePhotoForm({ user }: Props) {
    const [photoPreview, setPhotoPreview] = useState<string | null>(() => {
        if (user.profile_photo_url && user.profile_photo_url !== '/default-avatar.png') {
            return user.profile_photo_url;
        }
        return null;
    });
    const { data, setData, post, progress, processing, reset } = useForm({
        photo: null as File | null,
    });

    function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validasi ukuran file (5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size should not exceed 5MB');
            return;
        }

        // Validasi tipe file
        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            toast.error('Only JPG and PNG files are allowed');
            return;
        }

        setData('photo', file);
        setPhotoPreview(URL.createObjectURL(file));
    }

    function submitForm(e: React.FormEvent) {
        e.preventDefault();
        post(route('profile.photo.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset('photo');
                setPhotoPreview(null);
                toast.success('Profile photo updated successfully');
            },
            onError: (e: any) => {
                toast.error(e.photo);
            }
        });
    }

    return (
        <form onSubmit={submitForm}>
            <div className="space-y-6">
                <div className="flex items-center gap-6">
                    {/* Current Profile Photo */}
                    <div className="relative h-20 w-20">
                        <div className="h-20 w-20 rounded-full overflow-hidden">
                            {photoPreview ? (
                                <img
                                    src={photoPreview}
                                    alt="Profile preview"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <img
                                    src={user.profile_photo_url || '/default-avatar.png'}
                                    alt="Current profile photo"
                                    className="h-full w-full object-cover"
                                />
                            )}
                        </div>
                    </div>

                    {/* Photo Upload */}
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('photo')?.click()}
                    >
                        Select New Photo
                    </Button>
                    <input
                        type="file"
                        id="photo"
                        className="hidden"
                        onChange={handlePhotoChange}
                        accept="image/*"
                    />
                </div>

                {progress && (
                    <progress value={progress.percentage} max="100">
                        {progress.percentage}%
                    </progress>
                )}

                {data.photo && (
                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            Save Photo
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => {
                                reset('photo');
                                setPhotoPreview(null);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                )}
            </div>
        </form>
    );
} 