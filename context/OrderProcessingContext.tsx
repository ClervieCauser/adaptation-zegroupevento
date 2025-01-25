// OrderProcessingContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Order, OrderItem } from '@/types/order';

type ProcessingOrder = {
    id: string;
    orderId: string;
    groupId: string;
    zoneId: string | null;
    items: (OrderItem & { isReady: boolean })[];
    isCompleted: boolean;
};

type OrderProcessingContextType = {
    processingOrders: ProcessingOrder[];
    completedOrders: ProcessingOrder[];
    addOrderToZone: (orderId: string, zoneId: string) => void;
    removeOrderFromZone: (orderId: string) => void;
    toggleItemReady: (orderId: string, itemIndex: number) => void;
    isOrderInZone: (orderId: string) => boolean;
    getOrderByZone: (zoneId: string) => ProcessingOrder | null;
    getCompletedOrderIds: () => string[];
    addOrderToProcessing: (order: Order, groupId: string) => void;
    resetZonesAndItems: () => void;
    setAllItemsReady: (orderId: string) => void;
};

const OrderProcessingContext = createContext<OrderProcessingContextType | undefined>(undefined);

export const OrderProcessingProvider = ({ children }: { children: React.ReactNode }) => {
    const [processingOrders, setProcessingOrders] = useState<ProcessingOrder[]>([]);
    const [completedOrders, setCompletedOrders] = useState<ProcessingOrder[]>([]); // Nouveau state

    const addOrderToProcessing = useCallback((order: Order, groupId: string) => {
        setProcessingOrders(prev => {
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

    const handleOrderCompletion = useCallback((order: ProcessingOrder) => {
        // Ajouter aux commandes terminées
        setCompletedOrders(prev => {
            if (!prev.some(po => po.orderId === order.orderId)) {
                return [...prev, order];
            }
            return prev;
        });
        
        // Retirer des commandes en cours
        setProcessingOrders(prev => 
            prev.filter(po => po.orderId !== order.orderId)
        );
    }, []);

    const toggleItemReady = useCallback((orderId: string, itemIndex: number) => {
        setProcessingOrders(prev => {
            const newOrders = prev.map(order => {
                if (order.orderId !== orderId) return order;
                const newItems = [...order.items];
                newItems[itemIndex] = { ...newItems[itemIndex], isReady: !newItems[itemIndex].isReady };
                const isCompleted = newItems.every(item => item.isReady);
                const updatedOrder = { ...order, items: newItems, isCompleted };
                
                if (isCompleted) {
                    // Appeler handleOrderCompletion de manière asynchrone
                    setTimeout(() => handleOrderCompletion(updatedOrder), 0);
                }
                
                return updatedOrder;
            });

            return newOrders.filter(order => !order.isCompleted);
        });
    }, [handleOrderCompletion]);


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

    // Dans OrderProcessingContext.tsx
    // Dans OrderProcessingContext.tsx
    const resetZonesAndItems = useCallback(() => {
        setProcessingOrders(prev => {
            const groups = prev.reduce((acc, order) => {
                if (!acc[order.groupId]) {
                    acc[order.groupId] = [];
                }
                acc[order.groupId].push(order);
                return acc;
            }, {});

            return prev.filter(order => {
                const group = groups[order.groupId];
                return !group.every(o => o.isCompleted);
            }).map(order => ({
                ...order,
                zoneId: null,
                // Garder l'état prêt si déjà prêt
                items: order.items.map(item => ({
                    ...item,
                    isReady: item.isReady || false
                })),
                isCompleted: order.isCompleted
            }));
        });
    }, []);

    const setAllItemsReady = useCallback((orderId: string) => {
        console.log('Setting all items ready for order:', orderId);
        
        setProcessingOrders(prev => {
            const orderToComplete = prev.find(o => o.orderId === orderId);
            if (orderToComplete) {
                const completedOrder = {
                    ...orderToComplete,
                    items: orderToComplete.items.map(item => ({ ...item, isReady: true })),
                    isCompleted: true
                };
                
                // Appeler handleOrderCompletion de manière asynchrone
                setTimeout(() => handleOrderCompletion(completedOrder), 0);
                
                return prev.filter(o => o.orderId !== orderId);
            }
            return prev;
        });
    }, [handleOrderCompletion]);

    const getCompletedOrder = useCallback(() => {
        return completedOrders.map(order => order.orderId);
    }, [completedOrders]);

    return (
        <OrderProcessingContext.Provider value={{
            processingOrders,
            completedOrders,
            addOrderToZone,
            removeOrderFromZone,
            toggleItemReady,
            isOrderInZone,
            getOrderByZone,
            getCompletedOrderIds,
            addOrderToProcessing,
            resetZonesAndItems,
            setAllItemsReady,
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
