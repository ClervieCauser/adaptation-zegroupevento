import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Counter = () => {
  return (
    <View style={styles.counterContainer}>
      <TouchableOpacity style={styles.minusButton}>
        <Feather name="minus" size={20} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.counterText}>4</Text>
      <TouchableOpacity style={styles.plusButton}>
        <Feather name="plus" size={20} color="#ED9405" />
      </TouchableOpacity>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  minusButton: {
    backgroundColor: '#ED9405',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ED9405',
  },
  counterText: {
    fontSize: 34,
    fontWeight: 'bold',
    marginHorizontal: 20,
    fontFamily: 'Jua'
  },
});