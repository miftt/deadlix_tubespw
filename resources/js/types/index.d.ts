export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    avatar?: string;
    created_at: string;
    is_admin: boolean;
    updated_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
