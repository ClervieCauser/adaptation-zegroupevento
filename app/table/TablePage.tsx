import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TablePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TablePage</Text>
    </View>
  )
}

export default TablePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F7FA',
  },
  text: {
    fontSize: 24,
    fontFamily: 'Jua',
  }
})