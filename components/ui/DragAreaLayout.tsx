import React from 'react';
import { View, StyleSheet } from 'react-native';
import DragZone from './DragZone';
import { DisplayMode } from '@/types/display';

interface DragAreaLayoutProps {
    mode: DisplayMode;
}

const DragAreaLayout = ({ mode, onMeasure }) => {
    const renderLayout = () => {
        switch (mode) {
            case '1':
                return <DragZone zoneId="zone1" onMeasure={onMeasure} />;
            case '2':
                return (
                    <View style={styles.twoContainer}>
                        <DragZone zoneId="zone1" onMeasure={onMeasure} />
                        <DragZone zoneId="zone2" onMeasure={onMeasure} />
                    </View>
                );
            case '3':
                return (
                    <View style={styles.threeContainer}>
                        <View style={styles.topRow}>
                            <DragZone zoneId="zone1" onMeasure={onMeasure} />
                            <DragZone zoneId="zone2" onMeasure={onMeasure} />
                        </View>
                        <DragZone zoneId="zone3" onMeasure={onMeasure} />
                    </View>
                );
            case '4':
                return (
                    <View style={styles.fourContainer}>
                        <View style={styles.row}>
                            <DragZone zoneId="zone1" onMeasure={onMeasure} />
                            <DragZone zoneId="zone2" onMeasure={onMeasure} />
                        </View>
                        <View style={styles.row}>
                            <DragZone zoneId="zone3" onMeasure={onMeasure} />
                            <DragZone zoneId="zone4" onMeasure={onMeasure} />
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    return <View style={styles.container}>{renderLayout()}</View>;
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
