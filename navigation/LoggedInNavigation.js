import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Image, View } from 'react-native'
import Profile from '../screens/Profile'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

const LoggedInNavigation = () => {

  const Stack = createNativeStackNavigator()
  const [userAvatar, setUserAvatar] = useState('')

  const getUserData = async () => {
    try {
      const userAvatarRecorded = await AsyncStorage.getItem('userAvatar')
      userAvatarRecorded && userAvatarRecorded !== '' && setUserAvatar(userAvatarRecorded)
    } catch (error) {
      console.error('Error retrieving User Data:', error);
    }
  }

  useEffect(() => {
    getUserData();
  }, [userAvatar])

  const HeaderLogo = () => {
    return (
      <Image
        source={require('../assets/littleLemonLogo.png')}
        style={{
          height: 40,
          width: 147,
          alignSelf: 'center',
        }}
        resizeMode={'contain'}
        accessible={true}
        accessibilityLabel={"Little Lemon's Logo"}
      />
    )
  }

  const HeaderUser = () => {
    return (
      <View>
        {userAvatar ? <Image
          source={{ uri: userAvatar }
          }
          style={{
            height: 40,
            width: 40,
            marginRight: 11
          }}
          resizeMode={'contain'}
          accessible={true}
          accessibilityLabel={"User Avatar"}
        /> : <Ionicons style={{ fontSize: 40, marginRight: 11 }} name="person-circle" />
        }</View>
    )
  }
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: { backgroundColor: '#F6FCDF' },
        headerTintColor: '#F6FCDF',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitle: () => <HeaderLogo />,
      }}
    >
      <Stack.Screen
        name="Profile"
        options={{
          title: 'Your Profile Page',
          headerRight: () => <HeaderUser />
        }}
        component={Profile}
      />
    </Stack.Navigator>
  )
}

export default LoggedInNavigation
