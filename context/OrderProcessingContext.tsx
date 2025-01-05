// OrderProcessingContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Order, OrderItem } from '@/types/order';

type ProcessingOrder = {
    orderId: string;
    groupId: string;
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
    getCompletedOrderIds: () => string[];
    addOrderToProcessing: (order: Order, groupId: string) => void;
    resetZonesAndItems: () => void;
};

const OrderProcessingContext = createContext<OrderProcessingContextType | undefined>(undefined);

export const OrderProcessingProvider = ({ children }: { children: React.ReactNode }) => {
    const [processingOrders, setProcessingOrders] = useState<ProcessingOrder[]>([]);

    const addOrderToProcessing = useCallback((order: Order, groupId: string) => {
        setProcessingOrders(prev => {
            // Vérifie si l'ordre existe déjà
            if (prev.some(po => po.orderId === order.id)) {
                return prev;
            }

            return [...prev, {
                orderId: order.id,
                groupId,
                zoneId: null,
                items: order.items.map(item => ({ ...item, isReady: false })),
                isCompleted: false
            }];
        });
    }, []);

    const addOrderToZone = useCallback((orderId: string, zoneId: string) => {
        setProcessingOrders(prev => {
            const orderToUpdate = prev.find(o => o.orderId === orderId);
            if (!orderToUpdate) return prev;

            // Maintenir le groupe lors du déplacement vers une zone
            return prev.map(order => {
                if (order.orderId === orderId) {
                    return { ...order, zoneId };
                }
                if (order.zoneId === zoneId) {
                    return { ...order, zoneId: null };
                }
                return order;
            });
        });
    }, []);

    const removeOrderFromZone = useCallback((orderId: string) => {
        setProcessingOrders(prev =>
            prev.map(order =>
                order.orderId === orderId
                    ? { ...order, zoneId: null }
                    : order
            )
        );
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

    const isOrderInZone = useCallback((orderId: string) => {
        return processingOrders.some(order =>
            order.orderId === orderId && order.zoneId !== null
        );
    }, [processingOrders]);

    const getOrderByZone = useCallback((zoneId: string) => {
        return processingOrders.find(order => order.zoneId === zoneId) || null;
    }, [processingOrders]);

    const getCompletedOrderIds = useCallback(() => {
        return processingOrders
            .filter(order => order.isCompleted)
            .map(order => order.orderId);
    }, [processingOrders]);

    const resetZonesAndItems = useCallback(() => {
        setProcessingOrders(prev => prev.map(order => ({
            ...order,
            zoneId: null,
            items: order.items.map(item => ({
                ...item,
                isReady: false
            })),
            isCompleted: false
        })));
    }, []);

    return (
        <OrderProcessingContext.Provider value={{
            processingOrders,
            addOrderToZone,
            removeOrderFromZone,
            toggleItemReady,
            isOrderInZone,
            getOrderByZone,
            getCompletedOrderIds,
            addOrderToProcessing,
            resetZonesAndItems,
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
