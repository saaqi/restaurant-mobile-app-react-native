import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import Navigation from './Navigation'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect } from 'react'
import { GlobalContext } from './GlobalState'
import * as SQLite from 'expo-sqlite'
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
    dbName,
  } = useContext(GlobalContext)

  // Open the SQLite database
  const initDatabase = async () => {
    const db = await SQLite.openDatabaseAsync(dbName)
    // Create table if not exists
    try {
      await db.execAsync(
        `PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS menu (
            id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            description TEXT NOT NULL,
            image TEXT NOT NULL,
            category TEXT NOT NULL
          );
          CREATE TABLE IF NOT EXISTS users (
            userPassword TEXT NOT NULL CHECK (length(userPassword) = 32 AND userPassword GLOB '[0-9A-Fa-f]*'),
            userName TEXT NOT NULL,
            userEmail TEXT PRIMARY KEY NOT NULL,
            userPhone INTEGER,
            userAvatar TEXT,
            deliveryStatus BOOLEAN,
            passwordChanges BOOLEAN,
            specialOffers BOOLEAN,
            newsLetter BOOLEAN
          );`
      )
    } catch (error) {
      console.error('Creating table:', error)
    }
  }
  useEffect(() => {
    initDatabase()
  }, [])


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
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      {/* <AsyncStorageRenderAllItems /> */}
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#F6FCDF"
        translucent={true}
      />
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </SafeAreaView>
  );
}

