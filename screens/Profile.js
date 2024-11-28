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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Image
              source={require('../assets/user.png')}
              style={{
                maxHeight: 100,
                width: windowWidth / 3,
               alignSelf: 'start'
              }}
              resizeMode={'contain'}
              accessible={true}
              accessibilityLabel={"Little Lemon's Logo"}
            />
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
  }

});


export default Profile

