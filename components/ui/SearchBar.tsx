// components/ui/SearchBar.tsx
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

type SearchBarProps = {
    value: string;
    onChangeText: (text: string) => void;
};

const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
    return (
        <ThemedView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search by order name"
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#1C0D45"
            />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    input: {
        height: 48,
        fontSize: 16,
        color: '#1C0D45',
        fontFamily: 'Jua',
    },
});

export default SearchBar;
