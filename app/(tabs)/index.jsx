// app/(tabs)/index.jsx
import { View } from 'react-native';
import { ThemedText } from '../../components/ThemedText';

export default function Home() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText>Home Page</ThemedText>
        </View>
    );
}
