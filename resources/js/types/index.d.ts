export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Organization {
    subscription_plan: 'starter' | 'pro' | 'enterprise';
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
        organization: Organization | null;
    };
};
