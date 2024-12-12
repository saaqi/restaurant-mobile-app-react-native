import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import Navigation from './Navigation'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect } from 'react'
import { GlobalContext } from './GlobalState'
// import AsyncStorageRenderAllItems from './validators/AsyncStorageRenderAllItems'

export const Index = () => {

  const {
    setUserName,
    setUserEmail,
    setUserPhone,
    setUserAvatar,
    setNewsLetter,
    setUserLoggedIn,
    setSpecialOffers,
    setDeliveryStatus,
    setPasswordChanges,
  } = useContext(GlobalContext);


  // Set initial user data from AsyncStorage
  const getStoredItem = async (key, defaultValue, setState) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null && value !== '') {
        setState(value === 'true' ? true : value === 'false' ? false : value);
      } else if (defaultValue !== undefined) {
        setState(defaultValue)
      }
    } catch (error) {
      console.error(`Error retrieving ${key}:`, error);
    }
  }
  const setInitialUserData = async () => {
    try {
      const stateMappings = [
        { key: 'userName', setState: setUserName, defaultValue: '' },
        { key: 'userEmail', setState: setUserEmail, defaultValue: '' },
        { key: 'userPhone', setState: setUserPhone, defaultValue: '' },
        { key: 'userAvatar', setState: setUserAvatar, defaultValue: '' },
        { key: 'userLoggedIn', setState: setUserLoggedIn, defaultValue: false },
        { key: 'deliveryStatus', setState: setDeliveryStatus, defaultValue: true },
        { key: 'passwordChanges', setState: setPasswordChanges, defaultValue: true },
        { key: 'specialOffers', setState: setSpecialOffers, defaultValue: false },
        { key: 'newsLetter', setState: setNewsLetter, defaultValue: false },
      ]
      await Promise.all(
        stateMappings.map(({ key, setState, defaultValue }) =>
          getStoredItem(key, defaultValue, setState)
        )
      )
    } catch (error) {
      console.error('Error retrieving User Data:', error);
    }
  }


  useEffect(() => {
    setInitialUserData()
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {/* <AsyncStorageRenderAllItems /> */}
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </View>
  );
}

