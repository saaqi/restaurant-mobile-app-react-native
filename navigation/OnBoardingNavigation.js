import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Image, View } from 'react-native'
import OnboardingWelcome from '../screens/OnboardingWelcome'
import OnboardingLogin from '../screens/OnboardingLogin'
import OnboardingSingUp from '../screens/OnboardingSingUp'
import Profile from '../screens/Profile'
import { useState, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';


const OnBoardingNavigation = () => {

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
          marginVertical: 10,
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
            marginRight: 10
          }}
          resizeMode={'contain'}
          accessible={true}
          accessibilityLabel={"User Avatar"}
        /> : <Ionicons style={{ fontSize: 40, marginRight: 20 }} name="person-circle" />
        }</View>
    )
  }

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: { backgroundColor: '#F6FCDF' },
        headerTintColor: '#1A1A19',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitle: () => <HeaderLogo />,
      }}
    >
      <Stack.Screen name="Welcome"
        options={{
          title: 'Welcome to Little Lemon',
          headerRight: () => <HeaderUser />
        }}
        component={OnboardingWelcome}
      />
      <Stack.Screen name="Login"
        options={{
          title: 'Log in to your account',
          headerRight: () => <HeaderUser />
        }}
        component={OnboardingLogin}
      />
      <Stack.Screen name="Signup"
        options={{
          title: 'Sign up for a new account',
          headerRight: () => <HeaderUser />
        }}
        component={OnboardingSingUp}
      />
      <Stack.Screen name="Profile"
        options={{
          title: 'Your Profile Page',
          headerRight: () => <HeaderUser />
        }}
        component={Profile}
      />
    </Stack.Navigator>
  )
}

export default OnBoardingNavigation
