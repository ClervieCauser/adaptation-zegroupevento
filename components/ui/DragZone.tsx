// components/ui/DragZone.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

const DragZone = () => (
    <View style={styles.dragZone}>
        <View style={styles.plusIcon}>
            <ThemedText style={styles.plusText}>+</ThemedText>
        </View>
        <ThemedText style={styles.dragText}>DRAG AN ORDER</ThemedText>
    </View>
);

const styles = StyleSheet.create({
    dragZone: {
        flex: 1,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#E8A85F',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        gap: 8,
    },
    plusIcon: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    plusText: {
        fontSize: 24,
        color: '#E8A85F',
    },
    dragText: {
        color: '#1C0D45',
        fontFamily: 'Jua',
    }
});

export default DragZone;
