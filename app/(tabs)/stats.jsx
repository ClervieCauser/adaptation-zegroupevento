import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { MOCK_ORDERS } from '../../types/order';
import CustomHeader from '../../components/ui/CustomHeader';

const OrderStatistics = () => {
  const stats = useMemo(() => {
    const totalOrders = MOCK_ORDERS.length;

    const totalItems = MOCK_ORDERS.reduce((acc, order) => 
      acc + order.items.reduce((sum, item) => sum + item.quantity, 0), 0);

    const itemPopularity = MOCK_ORDERS.reduce((acc, order) => {
      order.items.forEach(item => {
        acc[item.name] = (acc[item.name] || 0) + item.quantity;
      });
      return acc;
    }, {});

    const popularItems = Object.entries(itemPopularity)
      .sort(([,a], [,b]) => b - a)
      .map(([name, quantity]) => ({ name, quantity }));

    const ordersByHour = MOCK_ORDERS.reduce((acc, order) => {
      const hour = order.time.split(':')[0];
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {});

    return {
      totalOrders,
      totalItems,
      popularItems,
      ordersByHour,
      averageItemsPerOrder: totalItems / totalOrders
    };
  }, []);

  return (
    <View style={styles.content}>
        <CustomHeader title="Statistiques" />
        <ScrollView style={styles.container}>
          <View style={styles.cardsContainer}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Commandes Totales</Text>
              <Text style={styles.cardValue}>{stats.totalOrders}</Text>
            </View>
            
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Articles Totaux</Text>
              <Text style={styles.cardValue}>{stats.totalItems}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Moyenne Articles/Commande</Text>
              <Text style={styles.cardValue}>{stats.averageItemsPerOrder.toFixed(1)}</Text>
            </View>
          </View>

          <ScrollView style={styles.section}>
            <Text style={styles.sectionTitle}>Articles Populaires</Text>
            {stats.popularItems.map((item, index) => (
              <View key={item.name} style={styles.itemBox}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>x{item.quantity}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Distribution Horaire</Text>
            <LineChart
              data={{
                labels: Object.keys(stats.ordersByHour),
                datasets: [{
                  data: Object.values(stats.ordersByHour)
                }]
              }}
              width={Dimensions.get('window').width - 32}
              height={220}
              chartConfig={{
                backgroundColor: '#DEEEFA',
                backgroundGradientFrom: '#DEEEFA',
                backgroundGradientTo: '#FFFFFF',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(232, 168, 95, ${opacity})`,
                style: {
                  borderRadius: 16,
                }
              }}
              style={styles.chart}
              bezier
            />
          </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#F9F7FA',
    paddingTop: 24,
  },
  container: {
    backgroundColor: '#F5F8FA',
    padding: 16,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#DEEEFA',
    borderRadius: 16,
    padding: 16,
    width: '30%',
    minWidth: 100,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    color: '#1C0D45',
    opacity: 0.6,
    marginBottom: 8,
    textAlign: 'center',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C0D45',
  },
  section: {
    backgroundColor: '#DEEEFA',
    borderRadius: 16,
    padding: 16,
    maxHeight: 300,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#1C0D45',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  itemBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    color: '#1C0D45',
    fontFamily: 'Jua',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#1C0D45',
    opacity: 0.6,
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  }
});

export default OrderStatistics;