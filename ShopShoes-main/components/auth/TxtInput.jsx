import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, {useState} from 'react'
import { COLORS, SIZES } from '../../constants';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'

const TxtInput = ({
    label,
    icon,
    error,
    password, 
    onFocus = () => {},
    ...props
}) => {
    const [obsecurePassword, setObsecurePassword] = useState(password);
    const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper(error?COLORS.red : isFocused? COLORS.secondary : COLORS.lightWhite)}>

                    {label === "Location" ? (
                        <Ionicons name={icon} size={20} color='gray' style={styles.iconStyle}/>
                    ): (
                        <MaterialCommunityIcons name={icon} size={20} color='gray' style={styles.iconStyle}/>
                    )}


                    <TextInput 
                        secureTextEntry={obsecurePassword}
                        autoCapitalize='none'
                        autoCorrect={false}
                        onFocus={()=> {onFocus();
                        setIsFocused(true)}}
                        onBlur={()=> {setIsFocused(false)}}
                        style={{flex: 1}}
                        {...props}
                    />

                    {label === "Password" && (<Ionicons onPress={()=> setObsecurePassword(!obsecurePassword)}
                        name={obsecurePassword ? 'eye-outline' : 'eye-off-outline'}
                        size={24}
                        color={COLORS.black}
                    />)}
      </View>
      {error && (<Text style={styles.errorMsg}>{error}</Text>)}
    </View>
  )
}

export default TxtInput

const styles = StyleSheet.create({
    iconStyle: {
        marginRight: 10,
    },
    container: {
        marginBottom: 20
    },
    label: {
        fontFamily: "regular",
        fontSize: SIZES.xSmall,
        marginBottom: 5, 
        marginEnd: 5,
        textAlign: "right"
    },
    inputWrapper:(borderColor) => ({
        backgroundColor: COLORS.white,
        height: 55,
        borderColor: borderColor,
        borderRadius: 12,
        flexDirection: "row",
        paddingHorizontal: 15,
        alignItems: "center",
        borderWidth: 0.5
    }) ,
    errorMsg: {
        color: COLORS.red,
        marginTop: 6, 
        marginLeft: 5,
        fontFamily: "regular",
        fontSize: SIZES.xSmall
    }
})