import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Image } from 'react-native'
import Onboarding from '../screens/Onboarding'

const StackNav = () => {

  const Stack = createNativeStackNavigator()

  // const HeaderLogo = () => {
  //   return (
  //     <Image
  //       source={require('../assets/littleLemonLogo.png')}
  //       style={{
  //         height: 546,
  //         width: 2000,
  //         alignSelf: 'center',
  //         flex: 1,
  //         marginVertical: 10
  //       }}
  //       resizeMode={'contain'}
  //       accessible={true}
  //       accessibilityLabel={"Little Lemon's Logo"}
  //     />
  //   )
  // }

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: { backgroundColor: '#859F3D' },
        headerTintColor: '#F6FCDF',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: 'bold' },
        // headerTitle: () => <HeaderLogo />,
      }}
    >
      <Stack.Screen name="Welcome" options={{ title: 'Welcome to Little Lemon' }} component={Onboarding} />
      {/* <Stack.Screen options={{ title: 'Main Application' }} name="BottomTabNav" component={BottomTabNav} /> */}
    </Stack.Navigator>
  )
}

export default StackNav
