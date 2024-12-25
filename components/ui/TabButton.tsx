// TabButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface TabButtonProps {
  text: string;
  isActive: boolean;
  onPress: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ text, isActive, onPress }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button,
        isActive ? styles.activeButton : styles.inactiveButton
      ]}
      onPress={onPress}
    >
      <Text 
        style={[
          styles.text,
          isActive ? styles.activeText : styles.inactiveText
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 2,
    minWidth: 100,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#FFF',
    borderColor: '#E9A23B',
  },
  inactiveButton: {
    backgroundColor: '#FFF',
    borderColor: '#E5E5E5',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Jua',
  },
  activeText: {
    color: '#000',
  },
  inactiveText: {
    color: '#666',
  },
});

export default TabButton;