// context/OrderProcessingContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import {MOCK_ORDERS, Order, OrderItem} from '@/types/order';

type ProcessingOrder = {
    orderId: string;
    zoneId: string | null;
    items: (OrderItem & { isReady: boolean })[];
    isCompleted: boolean;
};

type OrderProcessingContextType = {
    processingOrders: ProcessingOrder[];
    addOrderToZone: (orderId: string, zoneId: string) => void;
    removeOrderFromZone: (orderId: string) => void;
    toggleItemReady: (orderId: string, itemIndex: number) => void;
    isOrderInZone: (orderId: string) => boolean;
    getOrderByZone: (zoneId: string) => ProcessingOrder | null;
    clearCompletedOrders: () => string[]; // Returns completed order IDs
};

const OrderProcessingContext = createContext<OrderProcessingContextType | undefined>(undefined);

export const OrderProcessingProvider = ({ children }: { children: React.ReactNode }) => {
    const [processingOrders, setProcessingOrders] = useState<ProcessingOrder[]>([]);

    const addOrderToZone = useCallback((orderId: string, zoneId: string) => {
        const orderData = MOCK_ORDERS.find(o => o.id === orderId);
        if (!orderData) return;

        setProcessingOrders(prev => [
            ...prev,
            {
                orderId,
                zoneId,
                items: orderData.items.map(item => ({ ...item, isReady: false })),
                isCompleted: false
            }
        ]);
    }, []);

    const toggleItemReady = useCallback((orderId: string, itemIndex: number) => {
        setProcessingOrders(prev => {
            return prev.map(order => {
                if (order.orderId !== orderId) return order;
                const newItems = [...order.items];
                newItems[itemIndex] = { ...newItems[itemIndex], isReady: !newItems[itemIndex].isReady };
                const isCompleted = newItems.every(item => item.isReady);
                return { ...order, items: newItems, isCompleted };
            });
        });
    }, []);

    const removeOrderFromZone = useCallback((orderId: string) => {
        setProcessingOrders(prev => prev.filter(order => order.orderId !== orderId));
    }, []);

    const isOrderInZone = useCallback((orderId: string) => {
        return processingOrders.some(order => order.orderId === orderId);
    }, [processingOrders]);

    const getOrderByZone = useCallback((zoneId: string) => {
        return processingOrders.find(order => order.zoneId === zoneId) || null;
    }, [processingOrders]);

    const clearCompletedOrders = useCallback(() => {
        const completedOrderIds: string[] = [];
        setProcessingOrders(prev => {
            const incomplete = prev.filter(order => {
                if (order.isCompleted) {
                    completedOrderIds.push(order.orderId);
                    return false;
                }
                return true;
            });
            return incomplete;
        });
        return completedOrderIds;
    }, []);

    return (
        <OrderProcessingContext.Provider value={{
            processingOrders,
            addOrderToZone,
            removeOrderFromZone,
            toggleItemReady,
            isOrderInZone,
            getOrderByZone,
            clearCompletedOrders
        }}>
            {children}
        </OrderProcessingContext.Provider>
    );
};

export const useOrderProcessing = () => {
    const context = useContext(OrderProcessingContext);
    if (!context) {
        throw new Error('useOrderProcessing must be used within OrderProcessingProvider');
    }
    return context;
};
