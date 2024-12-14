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
    setUserToken,
    setUserEmail,
    setUserLoggedIn,
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
          userPhone TEXT,
          userAvatar TEXT,
          deliveryStatus INTEGER,
          passwordChanges INTEGER,
          specialOffers INTEGER,
          newsLetter INTEGER
        );`
      )
    } catch (error) {
      console.error('Creating table:', error)
    }
  }
  useEffect(() => {
    initDatabase()
  }, [])



  const setInitialUserDataAsync = async () => {
    try {
      const asUserStatus = await AsyncStorage.getItem('userLoggedIn')
      const asUserEmail = await AsyncStorage.getItem('userEmail')
      const asUserToken = await AsyncStorage.getItem('userToken')
      setUserLoggedIn(asUserStatus === 'true' ? true : false)
      setUserEmail(asUserEmail ? asUserEmail : '')
      setUserToken(asUserToken ? asUserToken : '')
    } catch (error) {
      console.error(`Error retrieving from AsyncStorage:`, error)
    }
  }

  useEffect(() => {
    setInitialUserDataAsync()
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

