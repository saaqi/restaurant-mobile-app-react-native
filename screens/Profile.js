import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Pressable,
  Image
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect, useContext } from 'react'
import { ValidateEmailField } from '../validators/ValidateEmailField'
import { ValidatePhoneNumberField } from '../validators/ValidatePhoneNumberField'
import { GlobalContext } from '../GlobalState'
import CheckBox from 'expo-checkbox'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker'
// import AsyncStorageRenderAllItems from '../validators/AsyncStorageRenderAllItems'

const Profile = () => {

  const {
    globalUserAvatar, globalSetUserAvatar,
    userName, setUserName,
    userEmail, setUserEmail,
    userPhone, setUserPhone,
    isLoading, setLoading,
    deliveryStatus, setDeliveryStatus,
    passwordChanges, setPasswordChanges,
    specialOffers, setSpecialOffers,
    newsLetter, setNewsLetter,
  } = useContext(GlobalContext);

  const [userAvatar, setUserAvatar] = useState(globalUserAvatar)

  const navigation = useNavigation()

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
    !result.canceled &&
      setUserAvatar(result.assets[0].uri),
      globalSetUserAvatar(result.assets[0].uri)
  }

  const handleUserDetails = async () => {
    try {
      setLoading(true)
      await AsyncStorage.multiSet([
        ['userAvatar', userAvatar],
        ['userName', userName],
        ['userEmail', userEmail],
        ['userPhone', userPhone],
        ['deliveryStatus', deliveryStatus ? 'true' : 'false'],
        ['passwordChanges', passwordChanges ? 'true' : 'false'],
        ['specialOffers', specialOffers ? 'true' : 'false'],
        ['newsLetter', newsLetter ? 'true' : 'false'],
      ])
    } catch (error) {
      console.error('Error storing user data:', error);
    } finally {
      setLoading(false)
    }
  }

  const handleCheckboxChange = (isChecked, setIsChecked) => {
    setIsChecked(!isChecked);
  }

  const getUserData = async () => {
    try {
      setLoading(true);
      const userAvatarRecorded = await AsyncStorage.getItem('userAvatar')
      userAvatarRecorded && userAvatarRecorded !== '' && setUserAvatar(userAvatarRecorded)
      const userNameRecorded = await AsyncStorage.getItem('userName')
      userNameRecorded && userNameRecorded !== '' && setUserName(userNameRecorded)
      const userEmailRecorded = await AsyncStorage.getItem('userEmail')
      userEmailRecorded && userEmailRecorded !== '' && setUserEmail(userEmailRecorded)
      const userPhoneRecorded = await AsyncStorage.getItem('userPhone')
      userPhoneRecorded && userPhoneRecorded !== '' && setUserPhone(userPhoneRecorded)

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
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getUserData()
  }, [])

  const removeUserData = async () => {
    try {
      setLoading(true);
      await AsyncStorage.multiSet([
        ['userAvatar', ''],
        ['userName', ''],
        ['userEmail', ''],
        ['userPhone', ''],
        ['deliveryStatus', 'true'],
        ['passwordChanges', 'true'],
        ['specialOffers', 'false'],
        ['newsLetter', 'false'],
      ]);
      setUserAvatar('')
      setUserName('')
      setUserEmail('')
      setUserPhone('')

      setDeliveryStatus(true)
      setPasswordChanges(true)
      setSpecialOffers(false)
      setNewsLetter(false)

    } catch (error) {
      console.error('Error retrieving User Data:', error);
    } finally {
      setLoading(false)
    }
  }

  const setLogout = async () => {
    try {
      setLoading(true);
      removeUserData()
      await AsyncStorage.setItem('userLoggedIn', 'false')
    } catch (error) {
      console.error('Error retrieving User Data:', error);
    } finally {
      setLoading(false)
      navigation.navigate('Welcome')
    }
  }


  return (
    <View style={styles.container}>

      {/* <AsyncStorageRenderAllItems /> */}

      {isLoading ? (<ActivityIndicator />) : (
        <ScrollView style={{ paddingHorizontal: 10 }}>
          <Text style={[styles.headingText, { textAlign: 'center' }]}>
            Welcome {userName}, It is nice to have you.
          </Text>
          <View style={{ flexDirection: 'row', gap: 20, marginBottom: 20, justifyContent: 'center' }}>
            <Pressable onPress={pickImage}>
              {userAvatar ? <Image
                source={{ uri: userAvatar }}
                style={{
                  height: 100,
                  width: 100,
                  alignSelf: 'start'
                }}
                resizeMode={'contain'}
                accessible={true}
                accessibilityLabel={"User Avatar"}
              /> : <Ionicons style={{ fontSize: 100 }} name="person-circle" />}
            </Pressable>

            <View>
              <Pressable onPress={pickImage} style={styles.primaryButton}>
                <View style={styles.iconStyle}>
                  <Ionicons style={styles.darkButtonText} name="person-add-outline" />
                  <Text style={styles.darkButtonText}>{userAvatar ? 'Change Avatar' : 'Set Avatar'}</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => setUserAvatar('')} style={styles.darkButton}>
                <View style={styles.iconStyle}>
                  <Ionicons style={styles.darkButtonText} name="person-remove-outline" />
                  <Text style={styles.darkButtonText}>Remove Avatar</Text>
                </View>
              </Pressable>
            </View>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView
              style={{ marginBottom: 20 }}
              horizontal={false}
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
                onChangeText={setUserPhone}
                placeholder='Your Phone Number'
                secureTextEntry={false}
                keyboardType='number-pad'
                value={userPhone}
              />
              {(
                !ValidateEmailField(userEmail) ||
                !ValidatePhoneNumberField(userPhone) ||
                userName === ''
              ) && (
                  <Text style={styles.alert}>
                    {
                      userName === '' ? 'Please Enter your full name to contiue.' :
                        !ValidateEmailField(userEmail) ? 'Please Enter your Email to continue' :
                          !ValidatePhoneNumberField(userPhone) ? 'Please enter your phone number in the format: (123) 456-7890 or +1 (123) 456-7890.' :
                            ''
                    }
                  </Text>
                )}
            </ScrollView>
          </KeyboardAvoidingView>

          <View style={{ marginBottom: 30 }}>
            <Text style={styles.headingText}>Select the notifications you would like to receive:</Text>

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <CheckBox
                value={deliveryStatus}
                onValueChange={(value) => handleCheckboxChange(deliveryStatus, setDeliveryStatus)}
              />
              <Text style={styles.bodyText}>Order Delivery Status</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <CheckBox
                value={passwordChanges}
                onValueChange={(value) => handleCheckboxChange(passwordChanges, setPasswordChanges)}
              />
              <Text style={styles.bodyText}>Passwrod Changes</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <CheckBox
                value={specialOffers}
                onValueChange={(value) => handleCheckboxChange(specialOffers, setSpecialOffers)}
              />
              <Text style={styles.bodyText}>Special Offers</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <CheckBox
                value={newsLetter}
                onValueChange={(value) => handleCheckboxChange(newsLetter, setNewsLetter)}
              />
              <Text style={styles.bodyText}>Newsletter</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center' }}>

            <Pressable
              onPress={() => {
                handleUserDetails()
              }}
              disabled={
                userName === '' ||
                !ValidateEmailField(userEmail) ||
                !ValidatePhoneNumberField(userPhone)
              }
              style={[
                userName === '' ||
                  !ValidateEmailField(userEmail) ||
                  !ValidatePhoneNumberField(userPhone) ?
                  styles.subButtonDisabled : styles.primaryButton, { flex: .5 }
              ]}
            >
              <View style={styles.iconStyle}>
                <Ionicons style={styles.darkButtonText} name="save-outline" />
                <Text style={styles.darkButtonText}>Save Details</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                removeUserData();
              }}
              style={[styles.dangerButton, { flex: .5 }]}
            >
              <View style={styles.iconStyle}>
                <Ionicons style={styles.dangerButtonText} name="trash-outline" />
                <Text style={styles.dangerButtonText}>Discard Details</Text>
              </View>
            </Pressable>
          </View>
          <Pressable
            style={[styles.darkButton, { marginBottom: 30 }]} onPress={() =>
              setLogout()
            }>
            <View style={styles.iconStyle}>
              <Ionicons style={styles.darkButtonText} name="log-out-outline" />
              <Text style={styles.darkButtonText}>Logout</Text>
            </View>
          </Pressable>

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

  inputField: {
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
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

  bodyText: {
    fontSize: 16,
    color: "#1A1A19",
    marginBottom: 10
  },

  primaryButton: {
    backgroundColor: '#31511E',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },

  darkButton: {
    backgroundColor: '#1A1A19',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },

  dangerButton: {
    backgroundColor: '#842029',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },

  darkButton: {
    backgroundColor: '#1A1A19',
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

  dangerButtonText: {
    color: '#F8D7DA',
    fontWeight: 500,
    fontSize: 16
  },

  subButtonDisabled: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },

  iconStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },

});


export default Profile

