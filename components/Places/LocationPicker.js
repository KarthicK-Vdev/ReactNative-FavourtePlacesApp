import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import OutlinedButton from '../UI/OutlinedButton'
import { Colors } from '../../constants/colors'
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from 'expo-location'
import MapView, { Marker, UrlTile } from 'react-native-maps'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { getAddress } from '../../util/location'

const LocationPicker = ({onPickLocation}) => {

    const navigation = useNavigation()
    const route=useRoute()

    const isFocused= useIsFocused()

    const [pickedLocation, setPickedLocation]=useState()
    const[locationPermissionInformation, requestPermission]= useForegroundPermissions();

    
    useEffect(()=>{
        if(isFocused && route.params)
        {
            const mapPickedLocation = route.params ? {lat:route.params.pickedLat, lng:route.params.pickedLng} : null;
            console.log(mapPickedLocation)
            setPickedLocation(mapPickedLocation)

        }
    },[route, isFocused])

    useEffect(()=>{
        async function handleLocation(){
            if(pickedLocation)
            {
                const address = await getAddress(pickedLocation.lat, pickedLocation.lng)
                onPickLocation({...pickedLocation, address: address || "Address Not Found"})
            }
        }

        handleLocation();
    },[pickedLocation, onPickLocation])

    const verifyPermissions =async()=>{
        if(locationPermissionInformation.status===PermissionStatus.UNDETERMINED)
            {
               const permissionResponse = await requestPermission()
    
               return permissionResponse.granted
            }
            if(locationPermissionInformation.status===PermissionStatus.DENIED)
            {
                Alert.alert("Insufficient Permissions!","you need to grant location permissions to use this app")
                return false
            }
            return true
    }

    const getLocationHandler=async()=>{
        const hasPermission = await verifyPermissions()
        if(!hasPermission)
        {
            return;
        }
        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat:location.coords.latitude,
            lng:location.coords.longitude
        })
        
    }
    const pickOnMapHandler=()=>{
        navigation.navigate("Map")
    }
    let locationPreview = <Text>No location picked</Text>
    if(pickedLocation)
    {
        locationPreview = <MapView
        style={styles.map}
        initialRegion={{
        latitude: pickedLocation.lat,
        longitude: pickedLocation.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        }}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
    >
        <UrlTile
        urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maximumZ={19}
        tileSize={256}
        />
        <Marker coordinate={{ 
            latitude: pickedLocation.lat , 
            longitude: pickedLocation.lng }} />
    </MapView>
    }
  return (
    <View>
      <View style={styles.mapPreview}>
        {locationPreview}
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" 
        onPress={getLocationHandler}>Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" 
        onPress={pickOnMapHandler}>
            Pick on Map
        </OutlinedButton>
      </View>
    </View>
  )
}

export default LocationPicker

const styles = StyleSheet.create({
    mapPreview:{
        width:"100%",
        height:200,
        marginVertical:8,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:Colors.primary100,
        borderRadius:4,
    },
    actions:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    map:{
        width:"100%",
        height:"100%",
        borderRadius:4,
    }
})