import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Image } from 'react-native'
import Profile from '../screens/Profile'

const LoggedInNavigation = () => {

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

  const HeaderUser = () => {
    return (
      <Image
        source={require('../assets/user.png')}
        style={{
          height: 40,
          width: 40,
          marginRight: 11
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
