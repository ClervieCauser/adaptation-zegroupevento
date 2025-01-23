import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PreperationSectionTable from './PreperationSectionTable';
import DragAreaLayout from './DragAreaLayout';
import DisplaySettings from './DisplaySettings';
import { ThemedText } from '../ThemedText';
import WaitingZone from './WaitingZone';
import RecipeColumn from './RecipeColumn';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { useOrderSelection } from '@/context/OrderContext';
import { DisplayMode } from '@/types/display';
import { useOrderProcessing } from '@/context/OrderProcessingContext';



interface Order {
    id: string;
    items: Array<{ name: string; quantity: number }>;
    time: string;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    zoneId?: string;
  }
  
  const TableContent = () => {
    const { isTable } = useResponsiveLayout();
    const { pendingOrders, markOrdersAsInProgress } = useOrderSelection();
    const { addOrderToProcessing, addOrderToZone, processingOrders, setAllItemsReady, getCompletedOrderIds } = useOrderProcessing();
    const [displayMode, setDisplayMode] = useState<DisplayMode>('4');
    const [showSettings, setShowSettings] = useState(false);
    const [zoneMeasures, setZoneMeasures] = useState<{ [key: string]: { x: number; y: number; width: number; height: number } }>({});
    const [waitingZoneOrders, setWaitingZoneOrders] = useState<Order[]>([]);
    const [autoSuggestEnabled, setAutoSuggestEnabled] = useState(false);
    const [manualOrderCount, setManualOrderCount] = useState(0);
    const [autoSelectedOrderIds, setAutoSelectedOrderIds] = useState<string[]>([]);
    
      // Fonction pour obtenir les items d'une commande
      const getOrderItems = (order: Order): string[] => {
        return order.items.map(item => item.name);
      };
    
      // Fonction pour compter les items communs entre deux commandes
      const countCommonItems = (order1: Order, order2: Order): number => {
        const items1 = getOrderItems(order1);
        const items2 = getOrderItems(order2);
        return items1.filter(item => items2.includes(item)).length;
      };
    
      const handleAutoSuggest = useCallback(() => {
        if (!autoSuggestEnabled || !pendingOrders) {
          return;
        }
    
        const maxAdditionalOrders = 2;
        const currentAutoOrders = waitingZoneOrders.length - manualOrderCount;
    
        if (currentAutoOrders >= maxAdditionalOrders) {
          return;
        }
    
        const remainingSlots = maxAdditionalOrders - currentAutoOrders;
    
        let suggestedOrders: Order[] = [];
    
        if (waitingZoneOrders.length === 0) {
          suggestedOrders = pendingOrders
            .filter(order => !processingOrders.some(po => po.id === order.id))
            .slice(0, remainingSlots);
        } else {
          suggestedOrders = pendingOrders
            .filter(order => {
              if (waitingZoneOrders.some(wo => wo.id === order.id)) return false;
              if (processingOrders.some(po => po.id === order.id)) return false;
              
              const ordersWithCommonItems = waitingZoneOrders.filter(wo => 
                countCommonItems(order, wo) >= 3
              );
    
              return ordersWithCommonItems.length > 0;
            })
            .slice(0, remainingSlots);
        }
    
        if (suggestedOrders.length > 0) {
          const newAutoSelectedIds = suggestedOrders.map(order => order.id);
          setAutoSelectedOrderIds(prev => [...prev, ...newAutoSelectedIds]);
          setWaitingZoneOrders(prev => [...prev, ...suggestedOrders]);
        }
      }, [autoSuggestEnabled, pendingOrders, waitingZoneOrders, processingOrders, manualOrderCount]);
    
      const handleDragEnd = useCallback((orderId: string, position: { x: number; y: number }) => {
        const order = waitingZoneOrders.find(o => o.id === orderId);
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
            // Si c'était une commande auto-sélectionnée, la retirer de la liste
            setAutoSelectedOrderIds(prev => prev.filter(id => id !== orderId));
            
            if (!autoSelectedOrderIds.includes(orderId)) {
              setManualOrderCount(count => Math.max(0, count - 1));
            }
            return;
          }
        }
      }, [waitingZoneOrders, processingOrders, zoneMeasures, addOrderToProcessing, addOrderToZone, markOrdersAsInProgress, autoSelectedOrderIds]);
    
      // Effet pour les suggestions automatiques
      useEffect(() => {
        let interval: NodeJS.Timeout;
        
        if (autoSuggestEnabled) {
          handleAutoSuggest(); // Appel immédiat
          interval = setInterval(handleAutoSuggest, 5000);
        }
    
        return () => {
          if (interval) {
            clearInterval(interval);
          }
        };
      }, [autoSuggestEnabled, handleAutoSuggest]);
    
      const handleAddToWaitingZone = useCallback((order: Order) => {
        setWaitingZoneOrders(prev => {
          if (!prev.find(o => o.id === order.id)) {
            setManualOrderCount(count => count + 1);
            return [...prev, order];
          }
          return prev;
        });
      }, []);
    
    const uniqueRecipes = useMemo(() => {
      const recipes = new Set<string>();
      pendingOrders?.forEach(order => {
        order.items.forEach(item => {
          recipes.add(item.name);
        });
      });
      return Array.from(recipes);
    }, [pendingOrders]);
  
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
                autoSelectedOrders={autoSelectedOrderIds}
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
              autoSuggestEnabled={autoSuggestEnabled}
              onAutoSuggestChange={setAutoSuggestEnabled}
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

export default TableContent

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
})