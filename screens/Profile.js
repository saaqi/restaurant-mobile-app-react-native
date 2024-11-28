import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Image,
  Dimensions
} from 'react-native'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons'

// import AsyncStorageRenderAllItems from '../validators/AsyncStorageRenderAllItems';


const Profile = () => {

  const windowWidth = Dimensions.get('window').width

  const [isLoading, setLoading] = useState(false)

  const [userName, setUserName] = useState('')
  // const [userEmail, setUserEmail] = useState('')

  const getUserData = async () => {
    try {
      setLoading(true);
      const userNameRecoded = await AsyncStorage.getItem('userName');
      // const userEmailRecorded = await AsyncStorage.getItem('userEmail');
      userNameRecoded !== '' ? setUserName(userNameRecoded) : ''
      // userEmailRecorded !== '' ? setUserEmail(userEmailRecorded) : ''
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
      {isLoading ? (<ActivityIndicator />) : (
        <ScrollView>

          <Text style={styles.headingText}>Welcome {userName}!</Text>
          <View style={{ flexDirection: 'row', gap: 20}}>
            <Image
              source={require('../assets/user.png')}
              style={{
                maxHeight: 100,
                width: windowWidth / 4,
                alignSelf: 'start'
              }}
              resizeMode={'contain'}
              accessible={true}
              accessibilityLabel={"Little Lemon's Logo"}
            />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              <Pressable style={[styles.darkButton,
              {
                alignSelf: 'center',
              }
              ]}>
                <View style={styles.iconStyle}>
                  <Ionicons style={styles.darkButtonText} name="log-in-outline" />
                  <Text style={styles.darkButtonText}>Login!</Text>
                </View>
              </Pressable>
              <Pressable style={[styles.darkButton,
              {
                alignSelf: 'center',
              }
              ]}>
                <View style={styles.iconStyle}>
                  <Ionicons style={styles.darkButtonText} name="log-in-outline" />
                  <Text style={styles.darkButtonText}>Login!</Text>
                </View>
              </Pressable>
            </View>
          </View>
          <Pressable onPress={() =>
            setLogout()
          }>
            <Text>Logout</Text>
          </Pressable>
          {/* <AsyncStorageRenderAllItems /> */}
        </ScrollView>
      )}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F6FCDF"
  },

  headingText: {
    fontSize: 20,
    fontWeight: 500,
    color: "#1A1A19",
    marginBottom: 20
  },

  bodyText: {
    fontSize: 16,
    color: "#1A1A19",
    marginBottom: 10
  },

  darkButton: {
    backgroundColor: '#31511E',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },

  darkButtonText: {
    color: 'white',
    fontWeight: 500,
    fontSize: 16
  },

  iconStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },

});


export default Profile

