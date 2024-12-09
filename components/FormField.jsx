import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'

import {icons} from '../constants/icons';

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
    const [showPassword, setShowPassword] = useState(false)
  
    return (
    <View style={[styles.view, otherStyles]}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.viewInput}>
        <TextInput
            style={styles.textIput}
            value={value}
            placeholder={placeholder}
            placeholderTextColor='#E8A85F'
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
        />

        {title === 'Password' && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image source={!showPassword ? icons.eyeHide : icons.eye} style={styles.eye} resizeMode='contain'/>
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField

const styles = StyleSheet.create({
    view:{
        space: 10,
    },
    text:{
        fontFamily: 'Jua',
    },
    viewInput:{
        flexDirection: 'row',
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E8A85F',
        marginTop: 10,
        alignItems: 'center',
    },
    textIput:{
        flex: 1,
        fontFamily: 'Jua',
        textAlign: 'base',
    },
    eye:{
        width: 20,
        height: 20,
    },
})