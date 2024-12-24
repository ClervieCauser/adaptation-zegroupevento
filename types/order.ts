// types/order.ts
export type OrderItem = {
    name: string;
    quantity: number;
};

export type Order = {
    id: string;
    time: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    items: OrderItem[];
};

export type OrderSelectionState = {
    isSelectMode: boolean;
    selectedIds: string[];
};
// Sample data
export const MOCK_ORDERS: Order[] = [
    {
        id: '1293',
        time: '16:58',
        status: 'PENDING',
        items: [
            { name: 'Poulet citron', quantity: 1 },
            { name: 'Boeuf bourguignon', quantity: 1 },
            { name: 'Pâtes carbonara', quantity: 1 },
        ],
    },
    {
        id: '1294',
        time: '16:34',
        status: 'PENDING',
        items: Array(12).fill({ name: 'Poulet citron', quantity: 2 }),
    },
    {
        id: '1295',
        time: '16:30',
        status: 'PENDING',
        items: Array(8).fill({ name: 'Poulet citron', quantity: 2 }),
    },
    {
        id: '1296',
        time: '16:28',
        status: 'PENDING',
        items: Array(6).fill({ name: 'Poulet citron', quantity: 2 }),
    }
];
