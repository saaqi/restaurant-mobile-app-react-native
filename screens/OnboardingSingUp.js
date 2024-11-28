import { StatusBar } from 'expo-status-bar'
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
  ActivityIndicator,
} from 'react-native'
import { useState, useEffect } from 'react'
import { ValidateEmailField } from '../validators/ValidateEmailField'
import { ValidatePasswordField } from '../validators/ValidatePasswordField'
import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function OnboardingSingUp({ navigation }) {

  const deviceWidth = Dimensions.get('window').width

  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userPasswordConfirm, setUserPasswordConfirm] = useState('')
  const [isLoading, setLoading] = useState(false)

  const handleLogin = async () => {
    try {
      await AsyncStorage.multiSet([
        ['userLoggedIn', 'true'],
        ['userName', userName],
        ['userEmail', userEmail]
      ]);
      setLoading(true);
    } catch (error) {
      console.error('Error storing user data:', error);
    } finally {
      setLoading(false);
    }
  };

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


  return (
    <View style={styles.container}>
      {isLoading ? (<ActivityIndicator />) : (
        <ScrollView>
          <View style={{ flex: .4 }}>
            <Image
              source={require('../assets/littleLemonLogo.png')}
              style={{
                alignSelf: 'center',
                height: 546,
                width: deviceWidth - 40,
                flex: .5,
              }}
              resizeMode={'contain'}
              accessible={true}
              accessibilityLabel={"Saaqi's Logo"}
            />
          </View>

          <View style={{ flex: .8 }}>
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
                            !ValidatePasswordField(userPassword) ? 'Please enter a password with at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.' :
                              userPassword !== userPasswordConfirm ? 'Passwords do not match' : ''
                      }
                    </Text>
                  )
                }
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Pressable
                    onPress={() => {
                      handleLogin();
                      navigation.navigate('Profile');
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
                      <Text style={styles.buttonText}>Sign Up</Text>
                      <Ionicons style={styles.buttonText} name="person-add" />
                    </View>
                  </Pressable>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
            <Pressable
              onPress={() => {
                navigation.navigate('Login')
              }}
              style={styles.singUpButton}
            >
              <View>
                <Text style={styles.bodyText}>Already have an account? Login up instead! </Text>
              </View>
              <View style={styles.iconStyle}>
                <Text style={styles.signUpbuttonText}>Login!</Text>
                <Ionicons style={styles.signUpbuttonText} name="log-in-outline" />
              </View>
            </Pressable>
          </View>
        </ScrollView>
      )}

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FCDF",
    // justifyContent: 'center',
    padding: 20,
  },

  inputField: {
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

  bodyText: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    paddingBottom: 20
  },

  alert: {
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
    color: 'white',
    fontWeight: 500,
    fontSize: 18
  },
  signUpbuttonText: {
    color: '#31511E',
    fontWeight: 400,
    fontSize: 16
  },
  iconStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },
});