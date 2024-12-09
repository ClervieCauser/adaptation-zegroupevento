import { StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name="sign-in"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="sign-up"
          options={{
            headerShown: false
          }}
        />

        <StatusBar backgroundColor="#F9F7FA" style="dark" />
      </Stack>
    </>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})