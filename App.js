import { SafeAreaView } from 'react-native';
import StackNav from './navigation/StackNav';
import { NavigationContainer } from '@react-navigation/native'

/*
App Colors ----
Primary: #31511E
Secondary: #859F3D
Dark: #1A1A19
Light: #F6FCDF
*/

export default function App() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </SafeAreaView>

  );
}

