import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { Image, View, Pressable } from 'react-native'
import Welcome from './screens/Welcome'
import Login from './screens/Login'
import SingUp from './screens/SingUp'
import Profile from './screens/Profile'
import { useContext } from 'react'
import { GlobalContext } from './GlobalState'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Navigation() {

  const Stack = createNativeStackNavigator()
  const {
    userAvatar, userLoggedIn
  } = useContext(GlobalContext)

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

    const navigation = useNavigation();

    return (
      <Pressable onPress={() => navigation.navigate('Profile')}>
        <View>
          {userAvatar && userLoggedIn ? <Image
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
          }
        </View>
      </Pressable>
    )
  }
  const firstScreen = !userLoggedIn ? 'Welcome' : 'Profile'
  return (
    <Stack.Navigator
      initialRouteName={firstScreen}
      screenOptions={{
        headerStyle: { backgroundColor: '#F6FCDF' },
        headerTintColor: '#1A1A19',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitle: () => <HeaderLogo />,
      }}
    >
      {!userLoggedIn ? (
        <>
          <Stack.Screen name="Welcome"
            options={{
              title: 'Welcome to Little Lemon',
              headerRight: () => <HeaderUser />
            }}
            component={Welcome}
          />
          <Stack.Screen name="Login"
            options={{
              title: 'Log in to your account',
              headerRight: () => <HeaderUser />
            }}
            component={Login}
          />
          <Stack.Screen name="Signup"
            options={{
              title: 'Sign up for a new account',
              headerRight: () => <HeaderUser />
            }}
            component={SingUp}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Profile"
            options={{
              title: 'Your Profile Page',
              headerRight: () => <HeaderUser />
            }}
            component={Profile}
          />
        </>
      ) }
    </Stack.Navigator>
  )
}