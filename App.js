import { SafeAreaView, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import OnBoardingNavigation from './navigation/OnBoardingNavigation';
import LoggedInNavigation from './navigation/LoggedInNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react'

/*
App Colors ----
Primary: #31511E
Secondary: #859F3D
Dark: #1A1A19
Light: #F6FCDF
*/

export default function App() {

  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [isLoading, setLoading] = useState(true)

  const getUserLoggedIn = async () => {
    try {
      const value = await AsyncStorage.getItem('userLoggedIn');
      if (!value) {
        setUserLoggedIn(true);
      }
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
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <NavigationContainer>
        {isLoading ? (<ActivityIndicator />) : (
          userLoggedIn ? (<OnBoardingNavigation />) : (<OnBoardingNavigation />)
        )}
      </NavigationContainer>
    </SafeAreaView>

  );
}

