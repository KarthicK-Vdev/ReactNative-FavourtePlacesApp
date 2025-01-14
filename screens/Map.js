import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import MapView, { Marker, UrlTile } from 'react-native-maps'
import IconButton from '../components/UI/IconButton'

const Map = ({navigation, route}) => {

    const initialLocation= route.params && {
        lat: route.params.initialLat,
        lng: route.params.initialLng
    } 
    const [selectedLocation, setSelectedLocation]=useState(initialLocation)
    function selectLocationHandler(event){
        if(initialLocation)
        {
            return;
        }
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
        if(initialLocation)
        {
            return;
        }
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
        latitude: initialLocation ? initialLocation.lat : 11.1271,
        longitude: initialLocation ? initialLocation.lng : 78.6569,
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