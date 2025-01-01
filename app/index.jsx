import {StatusBar} from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, View, Image } from 'react-native';
import {Link, Redirect, router} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';

import {icons} from '../constants/icons';
import CustomButton from '../components/ui/CustomButton';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{height:'100%'}}>
        <View style={styles.containerView}>
          <Image 
            source={icons.logo}
            resizeMode='contain'
            style={styles.logo}/>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>Découvrir de nouvelles recette chez {' '}
              <Text style={styles.nomViolet}>Poly</Text>
              <Text style={styles.nom}>Recipe</Text>
            </Text>
          </View>

          <CustomButton
            title="Continue with email"
            onPress={() => router.push('/sign-in')}
            containerStyles={{width: '100%', marginTop: 20}}
          />
          <Link href="/home">Go to home</Link>
        </View>
      </ScrollView>
      <StatusBar style='dark' backgroundColor='#F9F7FA'/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9F7FA',
      fontFamily: 'Jua',
      height: '100%',
    },
    containerView: {
      width: '100%',
      height: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 4,
    },
    logo: {
      width: 200,
      height: 200,
    },
    containerTitle: {
      position: 'relative',
      marginTop: '5px',
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      color: '#1C0D45',
      fontFamily: 'Jua',
    },
    nomViolet: {
      color: '#3A1994',
    },
    nom: {
      color: '#E8A85F',
    },
});