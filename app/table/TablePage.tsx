import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { OrderSelectionProvider, useOrderSelection } from '@/context/OrderContext';
import { OrderProcessingProvider, useOrderProcessing } from '@/context/OrderProcessingContext';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import DraggableOrderCircle from '@/components/ui/DraggableOrderCircle';
import DragAreaLayout from '@/components/ui/DragAreaLayout';
import { DisplayMode } from '@/types/display';

const TableContent = () => {
  const { isTable } = useResponsiveLayout();
  const { pendingOrders, markOrdersAsInProgress } = useOrderSelection();
  const { 
    addOrderToProcessing, 
    addOrderToZone, 
    processingOrders,
    setAllItemsReady,
    getCompletedOrderIds 
  } = useOrderProcessing();
  const [displayMode, setDisplayMode] = useState<DisplayMode>('4');
  const [zoneMeasures, setZoneMeasures] = useState<{ [key: string]: { x: number; y: number; width: number; height: number } }>({});

  const handleDragEnd = (orderId: string, position: { x: number; y: number }) => {
    const order = pendingOrders.find(o => o.id === orderId);
    if (!order) return;

    for (const [zoneId, measure] of Object.entries(zoneMeasures)) {
      const isInZone = 
        position.x >= measure.x &&
        position.x <= measure.x + measure.width &&
        position.y >= measure.y &&
        position.y <= measure.y + measure.height;

      if (isInZone) {
        const existingOrder = processingOrders.find(o => o.zoneId === zoneId);
        if (existingOrder) {
          return; // Zone already occupied
        }

        const groupId = `group_${Date.now()}`;
        addOrderToProcessing(order, groupId);
        addOrderToZone(orderId, zoneId);
        markOrdersAsInProgress([orderId]);
        return;
      }
    }
  };

  const handleReadyAll = useCallback((orderId: string) => {
    setAllItemsReady(orderId);
    // Optionally: Add animation or visual feedback here
  }, [setAllItemsReady]);

  useEffect(() => {
    // Check for completed orders and handle them
    const completedIds = getCompletedOrderIds();
    for (const orderId of completedIds) {
      const order = processingOrders.find(o => o.orderId === orderId);
      if (order?.isCompleted) {
        // Handle completed order (e.g., animation, notification)
      }
    }
  }, [processingOrders, getCompletedOrderIds]);

  if (!isTable) return null;

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={[styles.quarterSection, { position: 'relative' }]}>
          <View className="grid grid-cols-3 gap-4 p-4 bg-white rounded-lg shadow">
            {pendingOrders.map((order) => (
              <DraggableOrderCircle 
                key={order.id} 
                order={order}
                onDragEnd={handleDragEnd}
                isCompleted={getCompletedOrderIds().includes(order.id)}
              />
            ))}
          </View>
        </View>
        <View style={[styles.quarterSection, styles.borderLeft]}>
          <DragAreaLayout 
            mode={displayMode}
            onMeasure={(zoneId, layout) => {
              setZoneMeasures(prev => ({
                ...prev,
                [zoneId]: layout
              }));
            } }
            onReadyAll={handleReadyAll} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7FA',
    height: '100%',
    position: 'relative',
  },
  topSection: {
    height: '100%',
    flexDirection: 'row',
    position: 'relative',
  },
  quarterSection: {
    flex: 1,
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
  },
  borderLeft: {
    borderLeftWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#E0E0E0',
  },
});

const TablePage = () => {
  return (
    <OrderProcessingProvider>
      <OrderSelectionProvider>
        <TableContent />
      </OrderSelectionProvider>
    </OrderProcessingProvider>
  );
};


export default TablePage;