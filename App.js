import { SafeAreaView, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import OnBoardingNavigation from './navigation/OnBoardingNavigation';
import LoggedInNavigation from './navigation/LoggedInNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react'
import { GlobalStateProvider } from './GlobalState';
import { GlobalContext } from './GlobalState'


/*
App Colors ----
Primary: #31511E
Secondary: #859F3D
Dark: #1A1A19
Light: #F6FCDF
*/

export default function App() {

  // const [userLoggedIn, setUserLoggedIn] = useState(false)
  // const [isLoading, setLoading] = useState(false)

  const {
    isLoading, setLoading,
    userLoggedIn, setUserLoggedIn,
  } = useContext(GlobalContext);

  const getUserLoggedIn = async () => {
    try {
      setLoading(true);
      const userLoggedInRecorded = await AsyncStorage.getItem('userLoggedIn');
      userLoggedInRecorded === 'true' && setUserLoggedIn(true)
    } catch (error) {
      console.error('Error retrieving userLoggedIn:', error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getUserLoggedIn();
  }, []);

  return (
    <GlobalStateProvider>
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
        <NavigationContainer>
          {isLoading ? <ActivityIndicator /> :
            userLoggedIn ? <LoggedInNavigation /> : <OnBoardingNavigation />
          }
        </NavigationContainer>
      </SafeAreaView>
    </GlobalStateProvider>

  );
}

