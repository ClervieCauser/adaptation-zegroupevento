// types/user.ts
export type UserLevel = 'NOVICE' | 'EXPERT';

// write a method to change MOCK_USER level
export const changeUserLevel = (level: UserLevel) => {
    MOCK_USER.level = level;
    console.log(MOCK_USER.level);
};

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
