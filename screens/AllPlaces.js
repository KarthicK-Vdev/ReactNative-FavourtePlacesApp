import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import PlacesList from '../components/Places/PlacesList'
import { useIsFocused } from '@react-navigation/native'

const AllPlaces = ({route}) => {
  const [loadedPlaces, setLoadedPlaces]=useState([])
  const isFocused = useIsFocused()
  useEffect(()=>{
    if(isFocused && route.params)
    {
        // console.log(route.params.place)
        setLoadedPlaces(curPlaces=> [...curPlaces, route.params.place])
      }
    },[isFocused, route])
    // console.log(loadedPlaces)
  return (
    <PlacesList places={loadedPlaces} />
  )
}

export default AllPlaces