import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IngredientRowProps {
  ingredient: string;
  quantity: number | string;
  unit: string;
  nameStyle?: object;
  quantityStyle?: object;
  containerStyle?: object;
}

const IngredientRow: React.FC<IngredientRowProps> = ({ ingredient, quantity, unit, nameStyle, quantityStyle, containerStyle }) => {
  return (
    <View style={[styles.ingredientRow, containerStyle]}>
      <Text style={[styles.ingredientName, nameStyle]}>{ingredient}</Text>
      <Text style={[styles.ingredientQuantity, quantityStyle]}>{quantity} {unit}</Text>
    </View>
  );
};

export default IngredientRow;

const styles = StyleSheet.create({
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: "#FFEFDF",
    borderRadius: 11,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    height: 60,
  },
  ingredientName: {
    fontSize: 16,
    width: '50%',
    fontFamily:'Jua'
  },
  ingredientQuantity: {
    fontSize: 16,
    color: '#666',
    width: '50%',
    textAlign: 'right',
    fontFamily:'Jua'
  },
});