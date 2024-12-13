import {
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
  Pressable,
  Image,
  Dimensions,
  Alert
} from 'react-native'
import { useState, useContext } from 'react'
import { ValidateEmailField } from '../validators/ValidateEmailField'
import { GlobalContext } from '../GlobalState'
import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite'
import md5 from 'md5'

export default function Login({ navigation }) {

  const deviceWidth = Dimensions.get('window').width

  const {
    setUserLoggedIn,
    setUserName,
    userEmail,
    setUserEmail,
    dbName
  } = useContext(GlobalContext);

  const [userPassword, setUserPassword] = useState('')

  const handleLogin = async () => {
    try {
      // Open the database
      const db = await SQLite.openDatabaseAsync(dbName)
      // Query to check if the username and password match
      const checkLoginResult = await db.getFirstAsync(
        `SELECT * FROM users WHERE userEmail = ? AND userPassword = ?`,
        // Hash the password before comparison
        [userEmail, md5(userPassword)]
      )

      if (checkLoginResult) {
        // If a match is found, set the user as logged in
        setUserLoggedIn(true)
        // Set Details of the user
        setUserName(checkLoginResult.userName)

        await AsyncStorage.multiSet([
          ['userLoggedIn', 'true'],
          ['userName', checkLoginResult.userName],
          ['userEmail', checkLoginResult.userEmail]
        ])
      } else {
        // If no match, show an alert
        Alert.alert('Login failed', 'Invalid username or password.')
      }
    } catch (error) {
      console.error('Error logging in:', error)
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={require('../../assets/littleLemonLogo.png')}
          style={{
            alignSelf: 'center',
            height: 100,
            maxWidth: deviceWidth - 40,
            marginBottom: 20
          }}
          resizeMode={'contain'}
          accessible={true}
          accessibilityLabel={"Saaqi's Logo"}
        />

        <KeyboardAvoidingView
          style={styles.innerContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            horizontal={false}
            indicatorStyle={'#333'}
            keyboardDismissMode="on-drag"
          >
            <TextInput
              style={styles.inputField}
              onChangeText={setUserEmail}
              placeholder='Your Email'
              secureTextEntry={false}
              keyboardType='email-address'
              value={userEmail}
            />
            <TextInput
              style={styles.inputField}
              onChangeText={setUserPassword}
              placeholder='Your Password'
              secureTextEntry={true}
              keyboardType='default'
              value={userPassword}
            />
            {
              (!ValidateEmailField(userEmail) || userPassword === '') && (
                <Text style={styles.alert}>
                  {!ValidateEmailField(userEmail) ? 'Please Enter your Email to continue' : 'Please enter your password to continue'}
                </Text>
              )
            }
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Pressable
                onPress={() => handleLogin()}
                disabled={userPassword === '' || !ValidateEmailField(userEmail)}
                style={[
                  userPassword === '' || !ValidateEmailField(userEmail) ?
                    styles.subButtonDisabled : styles.subButton,
                  { flex: 1, alignSelf: 'end' }
                ]}
              >
                <View style={styles.iconStyle}>
                  <Ionicons style={styles.buttonText} name="log-in-outline" />
                  <Text style={styles.buttonText}>Login</Text>
                </View>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <Text style={styles.bodyText}>Don't have an account yet? Sing up instead! </Text>
        <Pressable
          onPress={() => {
            navigation.navigate('Signup')
          }}
          style={styles.singUpButton}
        >
          <View style={styles.iconStyle}>
            <Ionicons style={styles.signUpbuttonText} name="person-add" />
            <Text style={styles.signUpbuttonText}>{"Sign Up!"}</Text>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  inputField: {
    fontFamily: 'Karla-Medium',
    fontSize: 16,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    outlineStyle: 'none',
  },

  bodyText: {
    fontFamily: 'Karla-Medium',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10
  },

  alert: {
    fontFamily: 'Karla-Medium',
    fontSize: 16,
    color: '#842029',
    backgroundColor: '#f8d7da',
    borderColor: '#f5c2c7',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    textAlign: 'center'
  },

  subButton: {
    backgroundColor: '#31511E',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },

  singUpButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },

  subButtonDisabled: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },

  buttonText: {
    fontFamily: 'Karla-Medium',
    fontSize: 18,
    color: 'white',
  },

  signUpbuttonText: {
    fontFamily: 'Markazi-Medium',
    fontSize: 25,
    color: '#31511E',
  },

  iconStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },
})
