import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import MapView, { Marker, UrlTile } from 'react-native-maps'
import IconButton from '../components/UI/IconButton'

const Map = ({navigation}) => {
    const [selectedLocation, setSelectedLocation]=useState()
    function selectLocationHandler(event){

        const lat = event.nativeEvent.coordinate.latitude
        const lng = event.nativeEvent.coordinate.longitude

        setSelectedLocation({
            lat:lat,
            lng:lng
        })
    }

    const savePickedLocationHandler= useCallback(()=>{
        if(!selectedLocation)
        {
            Alert.alert("No Location picked",
                "You have to pick a location (by tapping the map) first"
            )
            return;
        }
        navigation.navigate("AddPlace",{
            pickedLat:selectedLocation.lat,
            pickedLng:selectedLocation.lng
        })
    }, [navigation, selectedLocation])

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: ({tintColor})=><IconButton 
            icon="save" size={24} color={tintColor}
            onPress={savePickedLocationHandler}
            />
        })
    },[navigation, savePickedLocationHandler])

  return (
    <MapView
        style={styles.mapContainer}
        initialRegion={{
        latitude: 11.1271,
        longitude: 78.6569,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        }}
        onPress={selectLocationHandler}
        
    >
        <UrlTile
        urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maximumZ={19}
        tileSize={256}
        />
        {
            selectedLocation && (
                <Marker 
        title="Picked Location"
        coordinate={{ 
            latitude: selectedLocation.lat , 
            longitude: selectedLocation.lng }} />
            )
        }
        
    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({
    mapContainer:{
        flex:1,
    }
})