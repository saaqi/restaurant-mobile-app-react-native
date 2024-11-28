import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { Image } from 'react-native'
import OnboardingWelcome from '../screens/OnboardingWelcome'
import OnboardingLogin from '../screens/OnboardingLogin'
import OnboardingSingUp from '../screens/OnboardingSingUp'
import Profile from '../screens/Profile'

const OnBoardingNavigation = () => {

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
      <Stack.Screen name="Welcome" options={{ title: 'Welcome to Little Lemon' }} component={OnboardingWelcome} />
      <Stack.Screen name="Login" options={{ title: 'Log in to your account' }} component={OnboardingLogin} />
      <Stack.Screen name="Signup" options={{ title: 'Sign up for a new account' }} component={OnboardingSingUp} />
      <Stack.Screen name="Profile" options={{ title: 'Your Profile Page' }} component={Profile} />
    </Stack.Navigator>
  )
}

export default OnBoardingNavigation
