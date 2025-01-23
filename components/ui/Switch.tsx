import React from 'react';
import { TouchableOpacity, View, StyleSheet, Animated } from 'react-native';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({ 
  checked, 
  onCheckedChange, 
  disabled = false 
}) => {
  // Animation pour le déplacement du "thumb"
  const translateX = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(translateX, {
      toValue: checked ? 20 : 0,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  }, [checked]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => !disabled && onCheckedChange(!checked)}
      style={[
        styles.switchContainer,
        checked ? styles.switchActive : styles.switchInactive,
        disabled && styles.switchDisabled,
      ]}
    >
      <Animated.View
        style={[
          styles.thumb,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  switchActive: {
    backgroundColor: '#E8A85F', // Orange theme color
  },
  switchInactive: {
    backgroundColor: '#E0E0E0', // Gray color for inactive state
  },
  switchDisabled: {
    opacity: 0.5,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Switch;