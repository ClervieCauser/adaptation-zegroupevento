import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Feather } from '@expo/vector-icons';

type SearchBarProps = {
    value: string;
    onChangeText: (text: string) => void;
};

const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
    return (
        <ThemedView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Search by order name"
                    value={value}
                    onChangeText={onChangeText}
                    placeholderTextColor="#1C0D45"
                />
                <Feather name="search" size={24} color="#1C0D45" style={styles.icon} />
                </View>
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 48,
        fontSize: 16,
        color: '#1C0D45',
        fontFamily: 'Jua',
    },
    icon: {
        marginLeft: 8,
    },
});

export default SearchBar;