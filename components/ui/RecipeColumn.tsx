import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DraggableOrderCircle from './DraggableOrderCircle';

interface Order {
    id: string;
    items: Array<{ name: string; quantity: number }>;
    time: string;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    zoneId?: string;
  }

interface RecipeColumnProps {
  recipeName: string;
  orders: Order[];
  onDragEnd: (orderId: string, position: { x: number; y: number }) => void;
  getCompletedOrderIds: () => string[];
  onAddToWaitingZone: (order: Order) => void;
  autoSelectedOrders: string[];
}

const RecipeColumn: React.FC<RecipeColumnProps> = ({ 
  recipeName, 
  orders, 
  onDragEnd, 
  getCompletedOrderIds, 
  onAddToWaitingZone,
  autoSelectedOrders 
}) => {
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
                  (greyedOutOrders.includes(order.id) || autoSelectedOrders.includes(order.id)) && styles.greyedOut
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
export default RecipeColumn

const styles = StyleSheet.create({
    column: {
        width: 350,
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
      greyedOut: {
        opacity: 0.5,
      },
})