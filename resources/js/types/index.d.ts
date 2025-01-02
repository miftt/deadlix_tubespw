export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    is_premium: boolean;
    premium_until: string;
    premium_type: string;
    product_id: number;
    starts_at: string;
    expires_at: string;
    status: string;
    role: string;
    subscription: {
        id: number;
        product_id: number;
        user_id: number;
        name: string;
        status: string;
        price: number;
        created_at: string;
        updated_at: string;
    }
    
}


export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

export type Midtrans = {
    clientKey: string
};
