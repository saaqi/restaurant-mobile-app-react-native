import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Onboarding from './screens/Onboarding'
import Profile from './screens/Profile'

/*
App Colors ----
Primary: #31511E
Secondary: #859F3D
Dark: #1A1A19
Light: #F6FCDF
*/

export default function App() {

  const Stack = createNativeStackNavigator()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
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
          <Stack.Screen name="Profile" options={{ title: 'YourProfile Page' }} component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>

  );
}

