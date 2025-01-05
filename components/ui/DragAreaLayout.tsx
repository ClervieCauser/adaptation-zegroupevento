import React, {useRef} from 'react';
import { View, StyleSheet } from 'react-native';
import DragZone from './DragZone';
import { DisplayMode } from '@/types/display';

interface DragAreaLayoutProps {
    mode: DisplayMode;
    onMeasure: (zoneId: string, layout: any) => void;
    onReadyAll: (orderId: string) => void;
}
const DragAreaLayout = ({ mode, onMeasure, onReadyAll }: DragAreaLayoutProps) => {
    const containerRef = useRef<View>(null);

    const handleZoneMeasure = (zoneId: string, layout: any) => {
        containerRef.current?.measure((x, y, width, height, pageX, pageY) => {
            const screenY = height - pageY;
            const zoneLayout = {
                x: pageX + layout.x,
                y: pageY + layout.y + (zoneId === 'zone3' ? screenY/3 : 0),
                width: layout.width,
                height: layout.height
            };
            onMeasure(zoneId, zoneLayout);
        });
    };
    const renderLayout = () => {
        switch (mode) {
            case '1':
                return <DragZone zoneId="zone1" onMeasure={handleZoneMeasure} onReadyAll={onReadyAll} />
            case '2':
                return (
                    <View style={styles.twoContainer}>
                        <DragZone zoneId="zone1" onMeasure={handleZoneMeasure} onReadyAll={onReadyAll} />
                        <DragZone zoneId="zone2" onMeasure={handleZoneMeasure} onReadyAll={onReadyAll} />
                    </View>
                );
            case '3':
                return (
                    <View style={styles.threeContainer}>
                        <View style={styles.topRow}>
                            <DragZone zoneId="zone1" onMeasure={handleZoneMeasure} onReadyAll={onReadyAll} />
                            <DragZone zoneId="zone2" onMeasure={handleZoneMeasure} onReadyAll={onReadyAll} />
                        </View>
                        <DragZone zoneId="zone3" onMeasure={handleZoneMeasure} onReadyAll={onReadyAll} />
                    </View>
                );
            case '4':
                return (
                    <View style={styles.fourContainer}>
                        <View style={styles.row}>
                            <DragZone zoneId="zone1" onMeasure={handleZoneMeasure} onReadyAll={onReadyAll} />
                            <DragZone zoneId="zone2" onMeasure={handleZoneMeasure} onReadyAll={onReadyAll} />
                        </View>
                        <View style={styles.row}>
                            <DragZone zoneId="zone3" onMeasure={handleZoneMeasure} onReadyAll={onReadyAll} />
                            <DragZone zoneId="zone4" onMeasure={handleZoneMeasure} onReadyAll={onReadyAll} />
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
