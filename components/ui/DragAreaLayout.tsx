import React, {useRef} from 'react';
import { View, StyleSheet } from 'react-native';
import DragZone from './DragZone';
import { DisplayMode } from '@/types/display';

interface DragAreaLayoutProps {
    mode: DisplayMode;
    onMeasure: (zoneId: string, layout: { x: number; y: number; width: number; height: number }) => void;
}
const DragAreaLayout = ({ mode, onMeasure }: DragAreaLayoutProps) => {
    const containerRef = useRef<View>(null);

    const handleZoneMeasure = (zoneId: string, layout: any) => {
        containerRef.current?.measure((x, y, width, height, pageX, pageY) => {
            // Adjust coordinates relative to the container
            const zoneLayout = {
                x: pageX + layout.x,
                y: pageY + layout.y,
                width: layout.width,
                height: layout.height
            };
            onMeasure(zoneId, zoneLayout);
        });
    };
    const renderLayout = () => {
        switch (mode) {
            case '1':
                return <DragZone zoneId="zone1" onMeasure={handleZoneMeasure} />;
            case '2':
                return (
                    <View style={styles.twoContainer}>
                        <DragZone zoneId="zone1" onMeasure={handleZoneMeasure} />
                        <DragZone zoneId="zone2" onMeasure={handleZoneMeasure} />
                    </View>
                );
            case '3':
                return (
                    <View style={styles.threeContainer}>
                        <View style={styles.topRow}>
                            <DragZone zoneId="zone1" onMeasure={handleZoneMeasure} />
                            <DragZone zoneId="zone2" onMeasure={handleZoneMeasure} />
                        </View>
                        <DragZone zoneId="zone3" onMeasure={handleZoneMeasure} />
                    </View>
                );
            case '4':
                return (
                    <View style={styles.fourContainer}>
                        <View style={styles.row}>
                            <DragZone zoneId="zone1" onMeasure={handleZoneMeasure} />
                            <DragZone zoneId="zone2" onMeasure={handleZoneMeasure} />
                        </View>
                        <View style={styles.row}>
                            <DragZone zoneId="zone3" onMeasure={handleZoneMeasure} />
                            <DragZone zoneId="zone4" onMeasure={handleZoneMeasure} />
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View ref={containerRef} style={styles.container}>
            {renderLayout()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        position: 'relative',
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
