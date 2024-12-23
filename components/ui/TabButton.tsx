import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

interface TabButtonProps {
  text: string;
  isActive: boolean;
}

const TabButton: React.FC<TabButtonProps> = ({ text, isActive }) => {
  return (
    <View>
        <TouchableOpacity 
          style={[
            styles.tabButton,
            isActive && styles.tabButtonActive
          ]}
        >
          <Text style={[
            styles.tabButtonText,
            isActive && styles.tabButtonTextActive
          ]}>
            {text}
          </Text>
        </TouchableOpacity>
    </View>
  )
}

export default TabButton

const styles = StyleSheet.create({
    tabButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E9A23B',
      },
      tabButtonActive: {
        backgroundColor: '#E9A23B',
      },
      tabButtonText: {
        color: '#E9A23B',
      },
      tabButtonTextActive: {
        color: '#fff',
      },
})