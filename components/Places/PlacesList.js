import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import PlaceItem from './PlaceItem'
import { Colors } from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'

const PlacesList = ({places}) => {

    const navigation=useNavigation()

    const selectPlaceHandler=(id)=>{
        navigation.navigate("PlaceDetails",{
            placeId: id
        })
    }
    
    if(!places || places.length === 0)
    {
        return <View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>No places added here</Text>
        </View>
    }

  return (
    <FlatList
    style={styles.list}
    data={places}
    keyExtractor={(item)=> item.id}
    renderItem={({item})=>{
        return <PlaceItem place={item} 
        onSelect={selectPlaceHandler} />
    }}
    />
  )
}

export default PlacesList

const styles = StyleSheet.create({
    list:{
        margin:24
    },
    fallbackContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    fallbackText:{
        fontSize:16,
        color:Colors.primary200
    }
})