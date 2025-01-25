import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DraggableOrderCircle from './DraggableOrderCircle';
import { ThemedText } from '../ThemedText';
import Switch from './Switch';

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
    autoSuggestEnabled: boolean;
    onAutoSuggestChange: (enabled: boolean) => void;
    onRemoveOrder: (orderId: string) => void;
  }
  
  const WaitingZone: React.FC<WaitingZoneProps> = ({ 
    orders, 
    onDragEnd, 
    getCompletedOrderIds,
    autoSuggestEnabled,
    onAutoSuggestChange,
    onRemoveOrder
  }) => {
    return (
      <View style={styles.waitingZone}>
        <View style={styles.waitingZoneHeader}>
          <ThemedText style={styles.waitingZoneTitle}>Zone d'attente</ThemedText>
          <View style={styles.autoSuggestContainer}>
            <ThemedText style={styles.autoSuggestLabel}>Suggestions auto</ThemedText>
            <Switch
              checked={autoSuggestEnabled}
              onCheckedChange={onAutoSuggestChange}
            />
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.waitingZoneContent}>
          {orders.map(order => (
            <DraggableOrderCircle 
              key={order.id}
              order={order}
              onDragEnd={onDragEnd}
              isCompleted={getCompletedOrderIds().includes(order.id)}
              showMinus={true}
              onRemove={onRemoveOrder}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

export default WaitingZone

const styles = StyleSheet.create({
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
      waitingZoneHeader: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
      },
       autoSuggestContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        },
        autoSuggestLabel: {
          fontSize: 14,
          fontFamily: 'Jua',
          color: '#1C0D45',
        },
})