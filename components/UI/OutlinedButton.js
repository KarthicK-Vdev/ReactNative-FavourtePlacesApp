import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/colors'

const OutlinedButton = ({onPress, icon, children}) => {
  return (
    <Pressable 
    style={({pressed})=>[styles.button,pressed && styles.pressed]} 
    onPress={onPress}>
        <Ionicons style={styles.icon} name={icon} size={18} color={Colors.primary500} />
        <Text style={styles.text} >{children}</Text>
    </Pressable>
  )
}

export default OutlinedButton

const styles = StyleSheet.create({
    button:{
        paddingVertical:6,
        paddingHorizontal:12,
        margin:4,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        borderColor:Colors.primary500,
        flexDirection:"row"
    },
    pressed:{
        opacity:0.7
    },
    icon:{
        marginRight:6,
    },
    text:{
        color:Colors.primary500
    },
})