import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { Order } from '@/types/order';
import OrderCircle from './OrderCircle';

interface RecipeColumnProps {
  recipeName: string;
  orders: Order[];
}

const RecipeColumn = ({ recipeName, orders }: RecipeColumnProps) => {
  const relevantOrders = orders.filter(order => {
    const quantities = new Map<string, number>();
    order.items.forEach(item => {
      quantities.set(item.name, (quantities.get(item.name) || 0) + item.quantity);
    });
    const maxEntry = Array.from(quantities.entries())
      .reduce((max, current) => current[1] > max[1] ? current : max);
    return maxEntry[0] === recipeName;
  });

  return (
    <View style={styles.column}>
      <Text style={styles.columnTitle}>{recipeName}</Text>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.ordersList}>
          {relevantOrders.map(order => (
            <OrderCircle key={order.id} order={order} />
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

const styles = StyleSheet.create({
  column: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#E8A85F',
    position: 'relative',
    marginHorizontal: 8,
  },
  columnTitle: {
    fontSize: 20,
    fontFamily: 'Jua',
    color: '#1C0D45',
    textAlign: 'center',
  },
  
  ordersList: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    marginBottom: 20,
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
    fontSize: 20,
    fontFamily: 'Jua',
    color: '#1C0D45',
    textAlign: 'center',
  },
});

export default RecipeColumn;