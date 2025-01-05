// types/order.ts
export type OrderItem = {
    name: string;
    quantity: number;
};

// types/order.ts
export type Order = {
    id: string;
    time: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    items: OrderItem[];
    groupId?: string;
    isOrderReady?: (orderId: string) => boolean;
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
            { name: 'Quiche Lorraine', quantity: 1 },
            { name: 'Risotto aux champignons', quantity: 1 },
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
    },
    {
        id: '1297',
        time: '16:45',
        status: 'PENDING',
        items: [
            { name: 'Tartiflette Savoyarde', quantity: 1 },
            { name: 'Quiche Lorraine', quantity: 1 },
        ],
    },
    {
        id: '1298',
        time: '17:02',
        status: 'PENDING',
        items: [
            { name: 'Poulet citron', quantity: 1 },
            { name: 'Risotto aux champignons', quantity: 1 },
            { name: 'Tartiflette Savoyarde', quantity: 1 },
            { name: 'Quiche Lorraine', quantity: 1 },
        ],
    },
    {
        id: '1299',
        time: '17:15',
        status: 'PENDING',
        items: [
            { name: 'Poulet citron', quantity: 3 },
            { name: 'Risotto aux champignons', quantity: 4 },
        ],
    },
    {
        id: '1300',
        time: '17:20',
        status: 'PENDING',
        items: [
            { name: 'Risotto aux champignons', quantity: 1 },
            { name: 'Poulet citron', quantity: 2 },
        ],
    },
    {
        id: '1301',
        time: '17:30',
        status: 'PENDING',
        items: [
            { name: 'Tartiflette Savoyarde', quantity: 1 },
            { name: 'Quiche Lorraine', quantity: 2 },
        ],
    },
    {
        id: '1302',
        time: '17:35',
        status: 'PENDING',
        items: [
            { name: 'Risotto aux champignons', quantity: 1 },
            { name: 'Tartiflette Savoyarde', quantity: 1 },
            { name: 'Quiche Lorraine', quantity: 1 },
            { name: 'Poulet citron', quantity: 1 },
        ],
    },
    {
        id: '1303',
        time: '17:40',
        status: 'PENDING',
        items: Array(3).fill({ name: 'Risotto aux champignons', quantity: 1 }),
    },
    {
        id: '1304',
        time: '17:45',
        status: 'PENDING',
        items: [
            { name: 'Poulet citron', quantity: 2 },
            { name: 'Tartiflette Savoyarde', quantity: 1 },
            { name: 'Quiche Lorraine', quantity: 1 },
        ],
    },
    {
        id: '1305',
        time: '17:50',
        status: 'PENDING',
        items: Array(10).fill({ name: 'Risotto aux champignons', quantity: 1 }),
    },
    {
        id: '1306',
        time: '18:00',
        status: 'PENDING',
        items: [
            { name: 'Poulet citron', quantity: 1 },
            { name: 'Tartiflette Savoyarde', quantity: 1 },
            { name: 'Risotto aux champignons', quantity: 1 },
            { name: 'Quiche Lorraine', quantity: 1 },
        ],
    },
    {
        id: '1307',
        time: '18:05',
        status: 'PENDING',
        items: [
            { name: 'Poulet citron', quantity: 3 },
            { name: 'Risotto aux champignons', quantity: 1 },
        ],
    },
];

