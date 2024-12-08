import {StatusBar} from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Link} from 'expo-router';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Ze Group evento </Text>
      <StatusBar style="auto" />
      <Link href="/home" style={{color: 'blue'}}>Go To home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Jua',
    },
});