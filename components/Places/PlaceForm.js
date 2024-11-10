import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Colors } from '../../constants/colors'
import ImagePicker from './ImagePicker'
import LocationPicker from './LocationPicker'
import Button from '../UI/Button'
import { Place } from '../../models/place'

const PlaceForm = ({onCreatePlace}) => {

  const [enteredTitle, setEnteredTitle]=useState('')
  const[pickedLocation, setPickedLocation]=useState();
  const[selectedImage, setSelectedImage]=useState()

  function changeTitleHandler(enteredText){
    setEnteredTitle(enteredText)
  }

  const takeImageHandler=useCallback((imageUri)=>{
    setSelectedImage(imageUri)
  },[])

  const pickLocationHanlder=(location)=>{
    setPickedLocation(location)
    
  }

  const savePlaceHandler = () =>{
    const placeData=new Place(enteredTitle, selectedImage, pickedLocation)
    onCreatePlace(placeData)
    // console.log(placeData)
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput 
        style={styles.input}
        onChangeText={changeTitleHandler} 
        value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker 
      onPickLocation={pickLocationHanlder} />
      <Button onPress={savePlaceHandler} >Add Place</Button>
    </ScrollView>
  )
}

export default PlaceForm

const styles=StyleSheet.create({
  form:{
    flex:1,
    padding:24,
  },
  label:{
    fontWeight:"bold",
    marginBottom:4,
    color:Colors.primary500,
  },
  input:{
    marginVertical:8,
    paddingVertical:8,
    paddingHorizontal:4,
    fontSize:16,
    borderBottomColor :Colors.primary700,
    borderBottomWidth:2,
    backgroundColor:Colors.primary100,
  }
})