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
    },
    {
        id: '1297',
        time: '16:45',
        status: 'PENDING',
        items: [
            { name: 'Soupe de lentilles', quantity: 1 },
            { name: 'Salade César', quantity: 1 },
        ],
    },
    {
        id: '1298',
        time: '17:02',
        status: 'PENDING',
        items: [
            { name: 'Pizza Margherita', quantity: 1 },
            { name: 'Lasagne', quantity: 1 },
            { name: 'Tiramisu', quantity: 1 },
            { name: 'Soupe de lentilles', quantity: 1 },
        ],
    },
    {
        id: '1299',
        time: '17:15',
        status: 'PENDING',
        items: [
            { name: 'Sushi', quantity: 3 },
            { name: 'Maki', quantity: 4 },
            { name: 'Ramen', quantity: 1 },
        ],
    },
    {
        id: '1300',
        time: '17:20',
        status: 'PENDING',
        items: [
            { name: 'Gratin dauphinois', quantity: 1 },
            { name: 'Poulet rôti', quantity: 2 },
        ],
    },
    {
        id: '1301',
        time: '17:30',
        status: 'PENDING',
        items: [
            { name: 'Burger classique', quantity: 1 },
            { name: 'Frites', quantity: 2 },
        ],
    },
    {
        id: '1302',
        time: '17:35',
        status: 'PENDING',
        items: [
            { name: 'Steak tartare', quantity: 1 },
            { name: 'Tagliatelles Alfredo', quantity: 1 },
            { name: 'Crème brûlée', quantity: 1 },
            { name: 'Gâteau au chocolat', quantity: 1 },
        ],
    },
    {
        id: '1303',
        time: '17:40',
        status: 'PENDING',
        items: Array(3).fill({ name: 'Salade verte', quantity: 1 }),
    },
    {
        id: '1304',
        time: '17:45',
        status: 'PENDING',
        items: [
            { name: 'Tacos', quantity: 2 },
            { name: 'Nachos', quantity: 1 },
            { name: 'Guacamole', quantity: 1 },
        ],
    },
    {
        id: '1305',
        time: '17:50',
        status: 'PENDING',
        items: Array(10).fill({ name: 'Spaghetti bolognaise', quantity: 1 }),
    },
    {
        id: '1306',
        time: '18:00',
        status: 'PENDING',
        items: [
            { name: 'Foie gras', quantity: 1 },
            { name: 'Ratatouille', quantity: 1 },
            { name: 'Macarons', quantity: 1 },
            { name: 'Éclair au chocolat', quantity: 1 },
            { name: 'Profiteroles', quantity: 1 },
        ],
    },
    {
        id: '1307',
        time: '18:05',
        status: 'PENDING',
        items: [
            { name: 'Raviolis', quantity: 3 },
            { name: 'Burrata', quantity: 1 },
        ],
    },
];

