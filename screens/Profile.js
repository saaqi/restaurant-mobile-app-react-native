import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Pressable,
} from 'react-native'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageRenderAllItems from '../validators/AsyncStorageRenderAllItems';


const Profile = () => {

  const [isLoading, setLoading] = useState(false)

  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')

  const getUserData = async () => {
    try {
      setLoading(true);
      const userNameRecoded = await AsyncStorage.getItem('userName');
      const userEmailRecorded = await AsyncStorage.getItem('userEmail');
      userNameRecoded !== '' ? setUserName(userNameRecoded) : ''
      userEmailRecorded !== '' ? setUserEmail(userEmailRecorded) : ''
    } catch (error) {
      console.error('Error retrieving User Data:', error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const setLogout = async () => {
    try {
      setLoading(true);
      await AsyncStorage.setItem('userLoggedIn', 'false')
    } catch (error) {
      console.error('Error retrieving User Data:', error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.bodyText}>Welcome {userName} Profile Page</Text>

        <AsyncStorageRenderAllItems />
       <Pressable onPress={() =>
          setLogout()
        }>
          <Text>Logout</Text>
        </Pressable>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#F6FCDF"
  },

  innerContainer: {
    padding: 20,
  },

  bodyText: {
    fontSize: 16,
    color: "#1A1A19"
  }

});


export default Profile

