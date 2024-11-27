import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Image, AppState } from 'react-native'
import SplashScreen from '../screens/SplashScreen'
import Onboarding from '../screens/Onboarding'
import Profile from '../screens/Profile'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react'

const StackNav = () => {

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const Stack = createNativeStackNavigator()

  const getUserLoggedIn = async () => {
    try {
      const value = await AsyncStorage.getItem('userLoggedIn');
      if (value !== null) {
        setUserLoggedIn(value === 'true');
      }
    } catch (error) {
      console.error('Error retrieving userLoggedIn:', error);
    }
  };

  useEffect(() => {
    getUserLoggedIn();
  }, []);

  // const HeaderLogo = () => {
  //   return (
  //     <Image
  //       source={require('../assets/littleLemonLogo.png')}
  //       style={{
  //         height: 546,
  //         width: 2000,
  //         alignSelf: 'center',
  //         flex: 1,
  //         marginVertical: 10
  //       }}
  //       resizeMode={'contain'}
  //       accessible={true}
  //       accessibilityLabel={"Little Lemon's Logo"}
  //     />
  //   )
  // }


  // AppState.currentState

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: { backgroundColor: '#859F3D' },
        headerTintColor: '#F6FCDF',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: 'bold' },
        // headerTitle: () => <HeaderLogo />,
      }}
    >
      <Stack.Screen name="Welcome" options={{ title: 'Welcome to Little Lemon' }} component={Onboarding} />
      <Stack.Screen name="Profile" options={{ title: 'YourProfile Page' }} component={Profile} />
    </Stack.Navigator>
  )
}

export default StackNav
