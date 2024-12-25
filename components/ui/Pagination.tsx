import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface PaginationProps {
  current: number;
  total: number;
  onDotClick: (index: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ current, total, onDotClick }) => {
  return (
    <View style={styles.pagination}>
      {Array.from({ length: total }, (_, i) =>(
        <Text
          key={i}
          style={{ fontSize: 24, color: i === current ? 'black' : 'gray' }}
          onPress={() => onDotClick(i)}
        >
          ●
        </Text>
    ))}
    </View>
  )
}

export default Pagination

const styles = StyleSheet.create({
    pagination:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    }
})