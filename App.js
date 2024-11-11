import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { useEffect, useState } from 'react';
import { init } from './util/database';
import * as SplashScreen from 'expo-splash-screen';
import PlaceDetails from './screens/PlaceDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync(); // Keep splash screen visible
        await init(); // Initialize the database
        setDbInitialized(true);
      } catch (error) {
        console.log(error);
      } finally {
        await SplashScreen.hideAsync(); // Hide the splash screen
      }
    }

    prepare();
  }, []);

  if (!dbInitialized) {
    return null; // Return null while the app is initializing
  }

  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Favourite Places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{ title: "Add a New Place" }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="PlaceDetails" 
          component={PlaceDetails} 
          options={{
            title:"Loading Place..."
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
