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
import PreperationSectionTable from '@/components/ui/PreperationSectionTable';

interface Order {
  id: string;
  items: Array<{ name: string; quantity: number }>;
  time: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  zoneId?: string;
}

interface WaitingZoneProps {
  orders: Order[];
  onDragEnd: (orderId: string, position: { x: number; y: number }) => void;
  getCompletedOrderIds: () => string[];
}

interface RecipeColumnProps {
  recipeName: string;
  orders: Order[];
  onDragEnd: (orderId: string, position: { x: number; y: number }) => void;
  getCompletedOrderIds: () => string[];
  onAddToWaitingZone: (order: Order) => void;
}
const RecipeColumn: React.FC<RecipeColumnProps> = ({ recipeName, orders, onDragEnd, getCompletedOrderIds, onAddToWaitingZone }) => {
  const [greyedOutOrders, setGreyedOutOrders] = useState<string[]>([]);

  const handleDragStart = (order: Order) => {
    setGreyedOutOrders(prev => [...prev, order.id]);
    onAddToWaitingZone(order);
  };

  return (
    <View style={styles.column}>
      <Text style={styles.columnTitle}>{recipeName}</Text>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.ordersList}>
          {orders
            .filter(order => {
              const quantities = new Map<string, number>();
              order.items.forEach(item => {
                quantities.set(item.name, (quantities.get(item.name) || 0) + item.quantity);
              });
              const maxEntry = Array.from(quantities.entries())
                .reduce((max, current) => current[1] > max[1] ? current : max);
              return maxEntry[0] === recipeName;
            })
            .map(order => (
              <View 
                key={order.id} 
                style={[
                  greyedOutOrders.includes(order.id) && styles.greyedOut
                ]}
              >
                <DraggableOrderCircle 
                  order={order}
                  onDragEnd={onDragEnd}
                  onDragStart={() => handleDragStart(order)}
                  isCompleted={getCompletedOrderIds().includes(order.id)}
                />
              </View>
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

const WaitingZone: React.FC<WaitingZoneProps> = ({ orders, onDragEnd, getCompletedOrderIds }) => {
  return (
    <View style={styles.waitingZone}>
      <ThemedText style={styles.waitingZoneTitle}>Zone d'attente</ThemedText>
      <ScrollView contentContainerStyle={styles.waitingZoneContent}>
        {orders.map(order => (
          <DraggableOrderCircle 
            key={order.id}
            order={order}
            onDragEnd={onDragEnd}
            isCompleted={getCompletedOrderIds().includes(order.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const TableContent = () => {
  const { isTable } = useResponsiveLayout();
  const { pendingOrders, markOrdersAsInProgress } = useOrderSelection();
  const { addOrderToProcessing, addOrderToZone, processingOrders, setAllItemsReady, getCompletedOrderIds } = useOrderProcessing();
  const [displayMode, setDisplayMode] = useState<DisplayMode>('4');
  const [showSettings, setShowSettings] = useState(false);
  const [zoneMeasures, setZoneMeasures] = useState<Record<string, { x: number; y: number; width: number; height: number }>>({});
  const [waitingZoneOrders, setWaitingZoneOrders] = useState<Order[]>([]);

  const uniqueRecipes = useMemo(() => {
    const recipes = new Set<string>();
    pendingOrders?.forEach(order => {
      order.items.forEach(item => {
        recipes.add(item.name);
      });
    });
    return Array.from(recipes);
  }, [pendingOrders]);

  const handleAddToWaitingZone = useCallback((order: Order) => {
    setWaitingZoneOrders(prev => {
      if (!prev.find(o => o.id === order.id)) {
        return [...prev, order];
      }
      return prev;
    });
  }, []);

  const handleDragEnd = useCallback((orderId: string, position: { x: number; y: number }) => {
    const order = waitingZoneOrders.find(o => o.id === orderId) || pendingOrders?.find(o => o.id === orderId);
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
        setWaitingZoneOrders(prev => prev.filter(o => o.id !== orderId));
        return;
      }
    }
  }, [waitingZoneOrders, pendingOrders, processingOrders, zoneMeasures, addOrderToProcessing, addOrderToZone, markOrdersAsInProgress]);

  const handleReadyAll = useCallback((orderId: string) => {
    setAllItemsReady(orderId);
  }, [setAllItemsReady]);

  const handleValidate = useCallback(() => {
    setShowSettings(false);
  }, []);

  if (!isTable) return null;

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.emptySpace}>
          <PreperationSectionTable />
        </View>
        <View style={styles.separatorLine} />
        <View style={styles.emptySpace}>
          <PreperationSectionTable settings={true}/>
        </View>
      </View>

      <View style={styles.middleSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.columnsContainer}>
          {uniqueRecipes.map(recipeName => (
            <RecipeColumn 
              key={recipeName}
              recipeName={recipeName}
              orders={pendingOrders || []}
              onDragEnd={handleDragEnd}
              getCompletedOrderIds={getCompletedOrderIds}
              onAddToWaitingZone={handleAddToWaitingZone}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.splitSection}>
          <WaitingZone 
            orders={waitingZoneOrders}
            onDragEnd={handleDragEnd}
            getCompletedOrderIds={getCompletedOrderIds}
          />
          <View style={styles.dragAreaContainer}>
            <View style={styles.dragAreaHeader}>
              <ThemedText style={styles.dragAreaTitle}>Zones de préparation</ThemedText>
              <TouchableOpacity style={styles.settingsButton} onPress={() => setShowSettings(true)}>
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
        <View style={styles.splitSection}>
          <View style={styles.separatorLine} />
          <View style={styles.flip}>
            <PreperationSectionTable/>
          </View>
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
  separatorLine: {
    width: 1,
    height: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#E8A85F',
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
    flexDirection: 'row',
    gap: 16,
    height: '38%',
  },
  splitSection: {
    width: '49%',
    gap: 16,
    flexDirection: 'row',
  },
  flip: {
    transform: [{ rotate: '180deg' }],
    width: '100%',
  },
  dragAreaContainer: {
    flex: 3,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  emptySpace: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  columnsContainer: {
    height: '100%',
    flexDirection: 'row',
  },
  column: {
    width: 345,
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: '#E8A85F',
    position: 'relative',
    marginHorizontal: 4,
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
    gap: 5,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    margin: 4,
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
  dragAreaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
  waitingZone: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  waitingZoneTitle: {
    fontSize: 18,
    fontFamily: 'Jua',
    color: '#1C0D45',
    marginBottom: 8,
  },
  waitingZoneContent: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  greyedOut: {
    display: 'none',
  }
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