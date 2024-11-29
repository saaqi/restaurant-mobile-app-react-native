import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Image } from 'react-native'
import OnboardingWelcome from '../screens/OnboardingWelcome'
import OnboardingLogin from '../screens/OnboardingLogin'
import OnboardingSingUp from '../screens/OnboardingSingUp'
import Profile from '../screens/Profile'
import Ionicons from '@expo/vector-icons/Ionicons'


const OnBoardingNavigation = () => {

  const Stack = createNativeStackNavigator()

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
      <Ionicons style={{ fontSize: 40, marginRight: 11 }} name="person-circle" />
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
