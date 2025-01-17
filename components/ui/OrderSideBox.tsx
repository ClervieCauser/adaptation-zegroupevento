import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { Order } from '@/types/order';

const OrderSideBox = () => {
  return (
    <View style={styles.orderWrapper}>
        <Text style={styles.ordersTitle}>Commandes :</Text>
        <View style={styles.orderContent}>
            {/* Contenu des commandes */}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    ordersTitle: {
        fontSize: 18,
        color: '#1C0D45',
        fontFamily: 'Jua',
    },
    orderWrapper: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
      },
      orderContent: {
        marginTop: 16,
      },
});

export default OrderSideBox;