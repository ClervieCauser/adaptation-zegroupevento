import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface NutritionalInfoProps {
  quantity: string;
  text: string;
}

const NutritionalInfo: React.FC<NutritionalInfoProps> = ({ quantity, text }) => {
    return (
    <View style={styles.nutritionalInfo}>
      <Text style={styles.nutritionalInfoQuantity}>{quantity}</Text>
      <Text style={styles.nutritionalInfoText}>{text}</Text>
    </View>
  );
} 

export default NutritionalInfo

const styles = StyleSheet.create({
  nutritionalInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: '#ED9405',
    borderRadius: 11,
    padding: 10,
    width: 70,
  },
  nutritionalInfoQuantity: {
    fontSize: 16,
    fontFamily: 'Jua',
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 20,
    width: 60,
    height: 60,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  nutritionalInfoText: {
    fontSize: 14,
    fontFamily: 'Jua',
    color: '#fff',
  },
})