import { StyleSheet, View, Image, ScrollView, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Link, router} from 'expo-router';

import {icons} from '../../constants/icons';
import FormField from '../../components/FormField';
import CustomButton from '../../components/ui/CustomButton';

const SignIn = () => {
  const [form, setForm] = useState({
    email:'',
    password:'',
  })

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
    setisSubmitting(true);
    try {
      // Ici vous devrez appeler votre API d'authentification
      // Exemple :
      // await loginUser(form.email, form.password);
      router.replace('/home'); // Redirection après succès
    } catch (error) {
      console.error(error);
      // Gérer l'erreur
    } finally {
      setisSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.view}>
        <Image
            source={icons.logo}
            resizeMode='contain'
            style={styles.logo}/>
            <Text style={styles.text}>Log in to PolyRecipe</Text>
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({...form, email: e})}
              otherStyles={{marginTop: 20}}
              keybaordType="email-address"
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({...form, password: e})}
              otherStyles={{marginTop: 20}}
            />
            <CustomButton
              title="Sign in"
              onPress={submit}
              containerStyles={{width: '100%', marginTop: 20}}
              isLoading={isSubmitting}
            />

            <View style={styles.comment}>
              <Text style={styles.account}>Don't have an account?</Text>
              <Link style={styles.link} href="/sign-up">Sign up</Link>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container : {
    backgroundColor: '#F9F7FA',
    height: '100%',
  },
  view: {
    width: '100%',
    minHeight: '85vh',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: 130,
    height: 130,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Jua',
    color: '#1C0D45',
  },
  comment:{
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    gap: 10,
  },
  account: {
    fontFamily: 'Jua',
    color: '#1C0D45',
  },
  link:{
    fontFamily: 'Jua',
    color: '#E8A85F',
  }
})
