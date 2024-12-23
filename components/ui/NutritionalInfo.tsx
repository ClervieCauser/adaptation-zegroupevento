import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface NutritionalInfoProps {
  calories: number;
  proteins: number;
  carbs: number;
  sugar: number;
  fiber: number;
}

const NutritionalInfo: React.FC<NutritionalInfoProps> = ({ calories, proteins, carbs, sugar, fiber }) => {
    return (
    <View style={styles.nutritionalContainer}>
      <View style={styles.nutritionalItem}>
        <Text style={styles.nutritionalValue}>{calories}</Text>
        <Text style={styles.nutritionalLabel}>kcal</Text>
      </View>
      <View style={styles.nutritionalItem}>
        <Text style={styles.nutritionalValue}>{proteins}g</Text>
        <Text style={styles.nutritionalLabel}>protéines</Text>
      </View>
      <View style={styles.nutritionalItem}>
        <Text style={styles.nutritionalValue}>{carbs}g</Text>
        <Text style={styles.nutritionalLabel}>glucides</Text>
      </View>
      <View style={styles.nutritionalItem}>
        <Text style={styles.nutritionalValue}>{sugar}g</Text>
        <Text style={styles.nutritionalLabel}>sucres</Text>
      </View>
      <View style={styles.nutritionalItem}>
        <Text style={styles.nutritionalValue}>{fiber}g</Text>
        <Text style={styles.nutritionalLabel}>fibres</Text>
      </View>
    </View>
  );
} 

export default NutritionalInfo

const styles = StyleSheet.create({
    nutritionalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        backgroundColor: '#f8f8f8',
      },
      nutritionalItem: {
        alignItems: 'center',
      },
      nutritionalValue: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      nutritionalLabel: {
        fontSize: 12,
        color: '#666',
      },
})