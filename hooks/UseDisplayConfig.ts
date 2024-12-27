
// hooks/useDisplayConfig.ts
import {useState} from "react";
import {DisplayConfig, DisplayMode} from "@/types/display";
import {MOCK_ORDERS} from "@/types/order";

export const useDisplayConfig = (selectedOrderIds: string[]) => {
    const [config, setConfig] = useState<DisplayConfig>({
        mode: '4',
        selectedOrders: selectedOrderIds,
        displayedOrders: {}
    });

    const updateDisplayMode = (mode: DisplayMode) => setConfig(prev => ({...prev, mode}));
    const handleOrderDrop = (orderId: string, position: number) => {
        setConfig(prev => ({
            ...prev,
            displayedOrders: {...prev.displayedOrders, [position]: MOCK_ORDERS.find(o => o.id === orderId)}
        }));
    };

    return { config, updateDisplayMode, handleOrderDrop };
};
