import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface UtensilRowProps {
    utensil: string;
}

const UtensilRow: React.FC<UtensilRowProps> = ({ utensil }) => {
  return (
    <View style={styles.utensilRow}>
      <Text style={styles.utensilName}>{utensil}</Text>
    </View>
  );
};

export default UtensilRow;

const styles = StyleSheet.create({
    utensilRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: "#FFEFDF",
    borderRadius: 11,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    height: 60,
  },
  utensilName: {
    fontSize: 16,
    fontFamily:'Jua'
  },
});