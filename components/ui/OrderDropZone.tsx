import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export const OrderDropZone = ({ onDrop, position }) => (
    <View style={styles.dropZone}>
        <ThemedText>DRAG AN ORDER</ThemedText>
    </View>
);
