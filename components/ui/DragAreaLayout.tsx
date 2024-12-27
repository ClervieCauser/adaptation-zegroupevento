import React from 'react';
import { View, StyleSheet } from 'react-native';
import DragZone from './DragZone';
import { DisplayMode } from '@/types/display';

interface DragAreaLayoutProps {
    mode: DisplayMode;
}

const DragAreaLayout: React.FC<DragAreaLayoutProps> = ({ mode }) => {
    const renderLayout = () => {
        switch (mode) {
            case '1':
                return <DragZone />;
            case '2':
                return (
                    <View style={styles.twoContainer}>
                        <DragZone />
                        <DragZone />
                    </View>
                );
            case '3':
                return (
                    <View style={styles.threeContainer}>
                        <View style={styles.topRow}>
                            <DragZone />
                            <DragZone />
                        </View>
                        <DragZone />
                    </View>
                );
            case '4':
                return (
                    <View style={styles.fourContainer}>
                        <View style={styles.row}>
                            <DragZone />
                            <DragZone />
                        </View>
                        <View style={styles.row}>
                            <DragZone />
                            <DragZone />
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {renderLayout()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    twoContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 16,
    },
    threeContainer: {
        flex: 1,
        gap: 16,
    },
    topRow: {
        flex: 1,
        flexDirection: 'row',
        gap: 16,
    },
    fourContainer: {
        flex: 1,
        gap: 16,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        gap: 16,
    },
});

export default DragAreaLayout;
