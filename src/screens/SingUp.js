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
import { GlobalContext } from '../GlobalState'
import { ValidateEmailField } from '../validators/ValidateEmailField'
import { ValidatePasswordField } from '../validators/ValidatePasswordField'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as SQLite from 'expo-sqlite'
import md5 from 'md5'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SingUp({navigation}) {

  const deviceWidth = Dimensions.get('window').width

  const {
    userEmail, setUserEmail,
    userName, setUserName,
    userToken, setUserToken,
    setUserLoggedIn,
    dbName
  } = useContext(GlobalContext);

  const [userPassword, setUserPassword] = useState('')
  const [userPasswordConfirm, setUserPasswordConfirm] = useState('')

  const handleSignUp = async () => {
    try {
      const db = await SQLite.openDatabaseAsync(dbName)
      const checkEmailResult = await db.getFirstAsync(
        `SELECT * FROM users WHERE userEmail = ?`,
        [userEmail]
      )
      if (!checkEmailResult) {
        await db.runAsync(
          `INSERT INTO users (userEmail, userPassword, userName) VALUES (?, ?, ?)`,
          [userEmail, md5(userPassword), userName]
        )
        await AsyncStorage.multiSet([
          ['userLoggedIn', 'true'],
          ['userEmail', userEmail],
          ['userToken', userToken],
        ])
        setUserToken(md5(userEmail))
        setUserLoggedIn(true)
      } else {
        Alert.alert('User already exists', 'Please login instead.')
      }
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  }

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
              onChangeText={setUserName}
              placeholder='Your Name'
              secureTextEntry={false}
              keyboardType='default'
              value={userName}
            />
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
            <TextInput
              style={styles.inputField}
              onChangeText={setUserPasswordConfirm}
              placeholder='Re-enter Password'
              secureTextEntry={true}
              keyboardType='default'
              value={userPasswordConfirm}
            />
            {
              (!ValidateEmailField(userEmail) || !ValidatePasswordField(userPassword) || userName === '' || userPassword !== userPasswordConfirm) && (
                <Text style={styles.alert}>
                  {
                    userName === '' ? 'Please Enter your full name to contiue.' :
                      !ValidateEmailField(userEmail) ? 'Please Enter your Email to continue' :
                        !ValidatePasswordField(userPassword) ? 'Please enter a password with at least 8 characters, including one uppercase letter, one lowercase letter, and one number.' :
                          userPassword !== userPasswordConfirm ? 'Passwords do not match' : ''
                  }
                </Text>
              )
            }
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Pressable
                onPress={() => {
                  handleSignUp()
                }}
                disabled={
                  userName === '' || !ValidateEmailField(userEmail) || !ValidatePasswordField(userPassword) || userPassword !== userPasswordConfirm
                }
                style={[
                  userName === '' || !ValidateEmailField(userEmail) || !ValidatePasswordField(userPassword) || userPassword !== userPasswordConfirm ?
                    styles.subButtonDisabled : styles.subButton,
                  { flex: 1, alignSelf: 'end' }
                ]}
              >
                <View style={styles.iconStyle}>
                  <Ionicons style={styles.buttonText} name="person-add" />
                  <Text style={styles.buttonText}>Sign Up</Text>
                </View>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <Text style={styles.bodyText}>Already have an account? Login instead! </Text>
        <Pressable
          onPress={() => {
            navigation.navigate('Login')
          }}
          style={styles.singUpButton}
        >
          <View style={styles.iconStyle}>
            <Ionicons style={styles.signUpbuttonText} name="log-in-outline" />
            <Text style={styles.signUpbuttonText}>Login!</Text>
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
    justifyContent: 'center',
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
    fontWeight: '400',
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
    fontWeight: 500,
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
