import { View, Text } from 'react-native'
import React from 'react'
import PlaceForm from '../components/Places/PlaceForm'

const AddPlace = ({navigation}) => {
  const createPlaceHandler=(place)=>{
    // console.log("AddPlace")
    // console.log(place)
    navigation.navigate("AllPlaces", {place:place})
  }
  return (
    <PlaceForm onCreatePlace={createPlaceHandler} />
  )
}

export default AddPlace