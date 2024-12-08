import { User } from '@/types';

export const users: User[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        status: "active",
        avatar: "https://ui-avatars.com/api/?name=John+Doe",
        created_at: "2024-03-15T10:00:00.000Z"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "user",
        status: "active",
        avatar: "https://ui-avatars.com/api/?name=Jane+Smith",
        created_at: "2024-03-14T08:30:00.000Z"
    },
    // ... tambahkan data dummy lainnya
]; 