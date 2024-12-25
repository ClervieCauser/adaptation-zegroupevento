import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface TagProps {
  text: string;
}

const Tags: React.FC<TagProps> = ({ text }) => {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{text}</Text>
    </View>
  )
}

export default Tags
const styles = StyleSheet.create({
    tag: {
        backgroundColor: '#E9A23B',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
      },
      tagText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Jua',
      },
  
})