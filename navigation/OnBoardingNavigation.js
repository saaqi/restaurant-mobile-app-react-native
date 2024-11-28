import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Image } from 'react-native'
import OnboardingWelcome from '../screens/OnboardingWelcome'
import OnboardingLogin from '../screens/OnboardingLogin'
import OnboardingSingUp from '../screens/OnboardingSingUp'
import Profile from '../screens/Profile'

const OnBoardingNavigation = () => {

  const Stack = createNativeStackNavigator()

  const HeaderLogo = () => {
    return (
      <Image
        source={require('../assets/littleLemonLogo.png')}
        style={{
          height: 40,
          alignSelf: 'center',
          marginVertical: 10,
        }}
        resizeMode={'contain'}
        accessible={true}
        accessibilityLabel={"Little Lemon's Logo"}
      />
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
      <Stack.Screen name="Welcome" options={{ title: 'Welcome to Little Lemon' }} component={OnboardingWelcome} />
      <Stack.Screen name="Login" options={{ title: 'Log in to your account' }} component={OnboardingLogin} />
      <Stack.Screen name="Signup" options={{ title: 'Sign up for a new account' }} component={OnboardingSingUp} />
      <Stack.Screen name="Profile" options={{ title: 'Your Profile Page' }} component={Profile} />
    </Stack.Navigator>
  )
}

export default OnBoardingNavigation
