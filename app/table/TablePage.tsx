import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { OrderSelectionProvider } from '@/context/OrderContext'
import { OrderProcessingProvider } from '@/context/OrderProcessingContext'
import MiddleTableContent from '@/components/ui/MiddleTableContent'
import OrdersTableDisplay from '@/components/ui/OrdersTableDisplay'
import CustomButton from '@/components/ui/CustomButton'

const TablePage = () => {
  return (
    <OrderProcessingProvider>
      <OrderSelectionProvider>
        <View style={styles.container}>
          {/* Section du haut */}
          <View style={styles.topSection}>
            {/* Zone haut gauche */}
            <View style={styles.quarterSection}>
              <OrdersTableDisplay />
            </View>


            {/* Zone haut droite */}
            <View style={[styles.quarterSection, styles.borderLeft]}>
              <View style={styles.orderWrapper}>
                <Text style={styles.orderTitle}>Commandes :</Text>
                <View style={styles.orderContent}>
                  {/* Contenu des commandes */}
                </View>
              </View>
            </View>
          </View>

          {/* Section centrale */}
          <View style={styles.middleSection}>
            <MiddleTableContent />
          </View>

          {/* Section du bas */}
          <View style={styles.bottomSection}>
            {/* Zone bas gauche */}
            <View style={styles.quarterSection}>
              <View style={styles.dropZone}>
                <Text style={styles.dropZoneText}>GLISSER UNE COMMANDE</Text>
              </View>
            </View>

            {/* Zone bas droite */}
            <View style={[styles.quarterSection, styles.borderLeft]}>
              <View style={styles.orderList}>
                <Text style={styles.orderTitle}>Commande #1293</Text>
                {/* Liste des plats */}
              </View>
              <View style={styles.dropZone}>
                <Text style={styles.dropZoneText}>GLISSER UNE COMMANDE</Text>
              </View>
            </View>
          </View>
        </View>
      </OrderSelectionProvider>
    </OrderProcessingProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7FA',
    height: '100%',
  },
  topSection: {
    height: '40%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#E0E0E0',
  },
  middleSection: {
    height: '20%',
    width: '98%',
    marginHorizontal: 'auto',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRadius: 10,
    borderColor: '#ED9405',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomSection: {
    height: '40%',
    flexDirection: 'row',
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
  orderList: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
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
  orderTitle: {
    fontSize: 18,
    fontFamily: 'Jua',
    color: '#1C0D45',
  },
  dropZone: {
    backgroundColor: '#E8A85F',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  dropZoneText: {
    color: 'white',
    fontFamily: 'Jua',
  },
})

export default TablePage;