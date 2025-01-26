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
    groupId?: string;
    isOrderReady?: (orderId: string) => boolean;
};

export type OrderSelectionState = {
    isSelectMode: boolean;
    selectedIds: string[];
};

export let MOCK_ORDERS: Order[] = [];

async function fetchTableNumbers(): Promise<number[]> {
    const url = "http://localhost:3012/tables";
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const tableNumbers: number[] = await response.json(); // Assuming the response is a list of numbers
        console.log("Table Numbers:", tableNumbers);

        return tableNumbers; // Return the list of table numbers
    } catch (error) {
        console.error("Failed to fetch table numbers:", error);
        return [];
    }
}

async function fetchPreparationsForTables(): Promise<Order[]> {
    const baseUrl = "http://localhost:3012/preparations";
    const tableNumbers = await fetchTableNumbers(); // Fetch table numbers

    const tableOrdersMap: Record<string, Order> = {}; // To store orders grouped by table number

    try {
        for (const tableNumber of tableNumbers) {
            const queryParams = new URLSearchParams({
                tableNumber: tableNumber.toString(),
                state: "preparationStarted",
            });

            const response = await fetch(`${baseUrl}?${queryParams.toString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                console.warn(`Failed to fetch preparations for table ${tableNumber}: ${response.status}`);
                continue;
            }

            const preparationData = await response.json();
            console.log(`Preparations for table ${tableNumber}:`, preparationData);

            // Loop over the preparations and consolidate them by table number
            preparationData.forEach((preparation: any) => {
                // Create or update an order for the tableNumber
                if (!tableOrdersMap[tableNumber]) {
                    tableOrdersMap[tableNumber] = {
                        id: `table-${tableNumber}`, // Use table number as part of the ID
                        time: preparation.time, // We'll use the same time for all orders of the same table
                        status: preparation.status, // Status from the first preparation (to keep it consistent)
                        items: [], // Initialize the items array
                    };
                }

                // Add the items from the current preparation to the table's order
                preparation.items.forEach((item: any) => {
                    const existingItem = tableOrdersMap[tableNumber].items.find((existingItem) => existingItem.name === item.name);
                    if (existingItem) {
                        existingItem.quantity += item.quantity; // Increment the quantity if the item already exists
                    } else {
                        tableOrdersMap[tableNumber].items.push({ name: item.name, quantity: item.quantity });
                    }
                });
            });
        }

        // Convert the map of orders into an array
        const orders = Object.values(tableOrdersMap);

        console.log("All consolidated orders:", orders);
        return orders;

    } catch (error) {
        console.error("Failed to fetch preparations:", error);
        return [];
    }
}

// Initialize MOCK_ORDERS with fetched data
fetchPreparationsForTables().then((orders) => {
    MOCK_ORDERS = orders; // Assign the fetched orders to MOCK_ORDERS
    console.log("MOCK_ORDERS initialized:", MOCK_ORDERS);
});
