import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({ title, onPress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={onPress}  
      activeOpacity={0.7}
      style={[styles.button, containerStyles]}
      disabled={isLoading}>
      <Text style={[styles.text, textStyles]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#ED9405',
        padding: 10,
        marginTop: 20,
        borderRadius: 12,
        minHeight: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#FFF',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Jua',
    },
})
