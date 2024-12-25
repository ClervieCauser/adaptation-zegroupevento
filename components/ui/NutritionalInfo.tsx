import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useResponsiveLayout } from "../../hooks/useResponsiveLayout";


interface NutritionalInfoProps {
  quantity: string;
  text: string;
}

const NutritionalInfo: React.FC<NutritionalInfoProps> = ({ quantity, text }) => {
  const { isTablet } = useResponsiveLayout();

  if(isTablet) {
    return (
      <View style={styles.nutritionalInfo}>
        <Text style={styles.nutritionalInfoQuantity}>{quantity}</Text>
        <Text style={styles.nutritionalInfoText}>{text}</Text>
      </View>
    );
  }

  return (
    <View style={styles.nutritionalInfoPhone}>
      <Text style={styles.nutritionalInfoQuantityPhone}>{quantity}</Text>
      <Text style={styles.nutritionalInfoTextPhone}>{text}</Text>
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
  nutritionalInfoPhone: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: '#ED9405',
    borderRadius: 11,
    padding: 5,
    width: 60,
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
  nutritionalInfoQuantityPhone:{
    fontSize: 12,
    fontFamily: 'Jua',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    width: 40,
    height: 40,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  nutritionalInfoText: {
    fontSize: 14,
    fontFamily: 'Jua',
    color: '#fff',
  },
  nutritionalInfoTextPhone: {
    fontSize: 10,
    fontFamily: 'Jua',
    color: '#fff',
  },
})