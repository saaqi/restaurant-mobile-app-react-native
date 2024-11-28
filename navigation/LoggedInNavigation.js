import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Image } from 'react-native'
import Profile from '../screens/Profile'

const LoggedInNavigation = () => {

  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: { backgroundColor: '#859F3D' },
        headerTintColor: '#F6FCDF',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Profile" options={{ title: 'Your Profile Page' }} component={Profile} />
    </Stack.Navigator>
  )
}

export default LoggedInNavigation
