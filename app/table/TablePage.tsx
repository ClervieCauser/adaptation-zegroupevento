import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { OrderSelectionProvider, useOrderSelection } from '@/context/OrderContext';
import { OrderProcessingProvider, useOrderProcessing } from '@/context/OrderProcessingContext';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import DraggableOrderCircle from '@/components/ui/DraggableOrderCircle';
import DragAreaLayout from '@/components/ui/DragAreaLayout';
import DisplaySettings from '@/components/ui/DisplaySettings';
import { ThemedText } from '@/components/ThemedText';
import { DisplayMode } from '@/types/display';

interface RecipeColumnProps {
  recipeName: string;
  orders: Array<{ id: string; items: Array<{ name: string; quantity: number }>; time: string; status: string }>;
  onDragEnd: (orderId: string, position: { x: number; y: number }) => void;
  getCompletedOrderIds: () => string[];
}

const RecipeColumn: React.FC<RecipeColumnProps> = ({ recipeName, orders, onDragEnd, getCompletedOrderIds }) => {
  const relevantOrders = orders.filter(order => {
    const quantities = new Map();
    order.items.forEach(item => {
      quantities.set(item.name, (quantities.get(item.name) || 0) + item.quantity);
    });
    const maxEntry = Array.from(quantities.entries())
      .reduce((max, current) => current[1] > max[1] ? current : max);
    return maxEntry[0] === recipeName;
  }).map(order => ({
    ...order,
    time: order.time || '',
    status: order.status as "PENDING" | "IN_PROGRESS" | "COMPLETED"
  }));

  return (
    <View style={styles.column}>
      <Text style={styles.columnTitle}>{recipeName}</Text>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.ordersList}>
          {relevantOrders.map(order => (
            <DraggableOrderCircle 
              key={order.id}
              order={order}
              onDragEnd={onDragEnd}
              isCompleted={getCompletedOrderIds().includes(order.id)}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottomTitleContainer}>
        <View style={styles.invertedTitleWrapper}>
          <Text style={styles.columnTitleInverted}>{recipeName}</Text>
        </View>
      </View>
    </View>
  );
};

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
  const [showSettings, setShowSettings] = useState(false);
  const [zoneMeasures, setZoneMeasures] = useState<Record<string, { x: number; y: number; width: number; height: number }>>({});

  const uniqueRecipes = useMemo(() => {
    const recipeNames = new Set<string>();
    pendingOrders?.forEach(order => {
      order.items.forEach(item => {
        recipeNames.add(item.name);
      });
    });
    return Array.from(recipeNames).sort();
  }, [pendingOrders]);

  const handleDragEnd = useCallback((orderId: string, position: { x: number; y: number }) => {
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
        if (existingOrder) return;

        const groupId = `group_${Date.now()}`;
        addOrderToProcessing(order, groupId);
        addOrderToZone(orderId, zoneId);
        markOrdersAsInProgress([orderId]);
        return;
      }
    }
  }, [pendingOrders, processingOrders, zoneMeasures, addOrderToProcessing, addOrderToZone, markOrdersAsInProgress]);

  const handleReadyAll = useCallback((orderId: string) => {
    setAllItemsReady(orderId);
  }, [setAllItemsReady]);

  const handleValidate = useCallback(() => {
    setShowSettings(false);
  }, []);

  if (!isTable) return null;

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={styles.emptySpace}>
          <ThemedText>Top Left Space</ThemedText>
        </View>
        <View style={styles.emptySpace}>
          <ThemedText>Top Right Space</ThemedText>
        </View>
      </View>

      {/* Middle Section - Recipe Columns */}
      <View style={styles.middleSection}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.columnsContainer}
        >
          {uniqueRecipes.map(recipeName => (
            <RecipeColumn 
              key={recipeName}
              recipeName={recipeName}
              orders={pendingOrders || []}
              onDragEnd={handleDragEnd}
              getCompletedOrderIds={getCompletedOrderIds}
            />
          ))}
        </ScrollView>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.dragAreaContainer}>
          <View style={styles.dragAreaHeader}>
            <ThemedText style={styles.dragAreaTitle}>Zones de préparation</ThemedText>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => setShowSettings(true)}
            >
              <ThemedText style={styles.buttonText}>Settings</ThemedText>
            </TouchableOpacity>
          </View>
          {showSettings ? (
            <DisplaySettings
              selectedMode={displayMode}
              onModeChange={setDisplayMode}
              onValidate={handleValidate}
            />
          ) : (
            <DragAreaLayout 
              mode={displayMode}
              onMeasure={(zoneId, layout) => {
                setZoneMeasures(prev => ({
                  ...prev,
                  [zoneId]: layout
                }));
              }}
              onReadyAll={handleReadyAll}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7FA',
    padding: 16,
  },
  topSection: {
    height: '38%',
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  middleSection: {
    flex: 1,
    height: '24%',
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  bottomSection: {
    height: '38%',
    flexDirection: 'row',
    gap: 16,
  },
  emptySpace: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  columnsContainer: {
    height: '100%',
    flexDirection: 'row',
  },
  column: {
    width: 340,
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: '#E8A85F',
    position: 'relative',
    marginHorizontal: 8,
  },
  columnTitle: {
    fontSize: 18,
    fontFamily: 'Jua',
    color: '#1C0D45',
    textAlign: 'center',
  },
  scrollViewContent: {
    height: '85%',
  },
  ordersList: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 4,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    margin: 8,
    flex: 1,
  },
  bottomTitleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  invertedTitleWrapper: {
    transform: [{ rotate: '180deg' }],
  },
  columnTitleInverted: {
    fontSize: 18,
    fontFamily: 'Jua',
    color: '#1C0D45',
    textAlign: 'center',
  },
  dragAreaContainer: {
    width: '50%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dragAreaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dragAreaTitle: {
    fontSize: 18,
    fontFamily: 'Jua',
    color: '#1C0D45',
  },
  settingsButton: {
    backgroundColor: '#E8A85F',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Jua',
    fontSize: 14,
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