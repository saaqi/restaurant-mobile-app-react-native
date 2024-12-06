import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { Image, View, Pressable } from 'react-native'
import Welcome from './screens/Welcome'
import Login from './screens/Login'
import SingUp from './screens/SingUp'
import Profile from './screens/Profile'
import Home from './screens/Home'
import { useContext } from 'react'
import { GlobalContext } from './GlobalState'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Navigation() {

  const Stack = createNativeStackNavigator()
  const {
    userAvatar, userLoggedIn, userName
  } = useContext(GlobalContext)

  const navigation = useNavigation();

  return (
    <Stack.Navigator
      // initialRouteName={'Home'}
      screenOptions={{
        headerRight: () =>
          <Pressable onPress={() => userLoggedIn && navigation.navigate('Profile')}>
            <View>
              {userAvatar && userLoggedIn ? <Image
                source={{ uri: userAvatar }
                }
                style={{
                  height: 40,
                  width: 40,
                  // marginRight: 11,
                  borderRadius: 100,
                }}
                resizeMode={'contain'}
                accessible={true}
                accessibilityLabel={"User Avatar"}
              /> : <Ionicons style={{
                fontSize: 40,
                // marginRight: 11
              }} name="person-circle" />
              }
            </View>
          </Pressable>,
        headerStyle: { backgroundColor: '#F6FCDF' },
        headerTintColor: '#1A1A19',
        headerTitleAlign: 'center',
        // headerTitleStyle: { fontWeight: 'bold' },
        headerTitle: () => <Image
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
      }}
    >
      {userLoggedIn ? (
        <>
          <Stack.Screen name="Home"
            options={{
              title: 'Home - Little Lemon'
            }}
            component={Home}
          />
          <Stack.Screen name="Profile"
            options={{
              title: userName ? userName + '\'s Profile Page' : 'Profile - Little Lemon'
            }}
            component={Profile}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome"
            options={{
              title: 'Welcome to Little Lemon'
            }}
            component={Welcome}
          />
          <Stack.Screen name="Login"
            options={{
              title: 'Login - Little Lemon'
            }}
            component={Login}
          />
          <Stack.Screen name="Signup"
            options={{
              title: 'Signup - Little Lemon'
            }}
            component={SingUp}
          />
        </>
      )}
    </Stack.Navigator>
  )
}
