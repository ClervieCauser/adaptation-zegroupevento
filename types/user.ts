// types/user.ts
export type UserLevel = 'NOVICE' | 'EXPERT';

export type User = {
    id: string;
    name: string;
    level: UserLevel;
    micEnabled: boolean;
};

export const MOCK_USER: User = {
    id: '1',
    name: 'John Doe',
    level: 'EXPERT',
    micEnabled: false
};
