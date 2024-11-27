import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Image } from 'react-native'
import Onboarding from '../screens/Onboarding'

const StackNav = () => {

  const Stack = createNativeStackNavigator()

  const HeaderLogo = () => {
    return (
      <Image
        source={require('../assets/littleLemonLogo.png')}
        style={{
          height: 546,
          width: 2000,
          alignSelf: 'center',
          flex: 1,
          marginVertical: 10
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
        headerTintColor: '#31511E',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitle: () => <HeaderLogo />,
      }}
    >
      <Stack.Screen name="Welcome" component={Onboarding} />
      {/* <Stack.Screen options={{ title: 'Main Application' }} name="BottomTabNav" component={BottomTabNav} /> */}
    </Stack.Navigator>
  )
}

export default StackNav
