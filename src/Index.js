import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import Navigation from './Navigation'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect } from 'react'
import { GlobalContext } from './GlobalState'
import { StatusBar } from 'expo-status-bar'


export const Index = () => {

  const {
    setUserName,
    setUserEmail,
    setUserPhone,
    setUserAvatar,
    setNewsLetter,
    setUserLoggedIn,
    setSpecialOffers,
    setUserOnBoarded,
    setDeliveryStatus,
    setPasswordChanges,
  } = useContext(GlobalContext);

  const setInitialUserData = async () => {
    try {
      const userNameRecorded = await AsyncStorage.getItem('userName')
      userNameRecorded && userNameRecorded !== '' && setUserName(userNameRecorded)
      const userEmailRecorded = await AsyncStorage.getItem('userEmail')
      userEmailRecorded && userEmailRecorded !== '' && setUserEmail(userEmailRecorded)
      const userPhoneRecorded = await AsyncStorage.getItem('userPhone')
      userPhoneRecorded && userPhoneRecorded !== '' && setUserPhone(userPhoneRecorded)
      const userAvatarRecorded = await AsyncStorage.getItem('userAvatar')
      userAvatarRecorded && userAvatarRecorded !== '' && setUserAvatar(userAvatarRecorded)

      const userLoggedInRecorded = await AsyncStorage.getItem('userLoggedIn')
      userLoggedInRecorded && userLoggedInRecorded === 'true' ?
        setUserLoggedIn(true) : setUserLoggedIn(false)
      const userOnBoardRecorded = await AsyncStorage.getItem('userAvatar')
      userOnBoardRecorded && userOnBoardRecorded === 'true' ?
        setUserOnBoarded(true) : setUserOnBoarded(false)

      const deliveryStatusRecorded = await AsyncStorage.getItem('deliveryStatus')
      deliveryStatusRecorded && deliveryStatusRecorded === 'false' ?
        setDeliveryStatus(false) : setDeliveryStatus(true)
      const passwordChangesRecorded = await AsyncStorage.getItem('passwordChanges')
      passwordChangesRecorded && passwordChangesRecorded === 'false' ?
        setPasswordChanges(false) : setPasswordChanges(true)
      const specialOffersRecorded = await AsyncStorage.getItem('specialOffers')
      specialOffersRecorded && specialOffersRecorded === 'false' ?
        setSpecialOffers(false) : setSpecialOffers(true)
      const newsLetterRecorded = await AsyncStorage.getItem('newsLetter')
      newsLetterRecorded && newsLetterRecorded === 'false' ?
        setNewsLetter(false) : setNewsLetter(true)

    } catch (error) {
      console.error('Error retrieving User Data:', error);
    }
  }

  useEffect(() => {
    setInitialUserData()
  }, [
    // userName,
    // userEmail,
    // userPhone,
    // userAvatar,
    // newsLetter,
    // userLoggedIn,
    // userOnBoarded,
    // specialOffers,
    // deliveryStatus,
    // passwordChanges
  ])

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

