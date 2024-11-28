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
  Image,
  Dimensions,
  CheckBox
} from 'react-native'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons'
import { ValidateEmailField } from '../validators/ValidateEmailField'
import { ValidatePhoneNumberField } from '../validators/ValidatePhoneNumberField'


// import AsyncStorageRenderAllItems from '../validators/AsyncStorageRenderAllItems';


const Profile = () => {

  const windowWidth = Dimensions.get('window').width

  const [isLoading, setLoading] = useState(false)

  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPhone, setUserPhone] = useState('')

  const [orderStatus, setOrderStatus] = useState(true)
  const [passwordChanges, setPasswordChanges] = useState(true)
  const [specialOffers, setSpecialOffers] = useState(true)
  const [newsLetter, setNewsLetter] = useState(true)

  const handleUserDetails = async () => {
    try {
      await AsyncStorage.multiSet([
        ['userName', userName],
        ['userEmail', userEmail],
        ['userPhone', userPhone],
        ['orderStatus', orderStatus ? 'true' : 'false'],
        ['passwordChanges', passwordChanges ? 'true' : 'false'],
        ['specialOffers', specialOffers ? 'true' : 'false'],
        ['newsLetter', newsLetter ? 'true' : 'false'],
      ]);
      setLoading(true);
    } catch (error) {
      console.error('Error storing user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (isChecked, setIsChecked) => {
    setIsChecked(!isChecked);
  };

  const getUserData = async () => {
    try {
      setLoading(true);
      const userNameRecoded = await AsyncStorage.getItem('userName');
      const userEmailRecorded = await AsyncStorage.getItem('userEmail');
      const userPhoneRecorded = await AsyncStorage.getItem('userPhone');
      userNameRecoded && userNameRecoded !== '' ? setUserName(userNameRecoded) : ''
      userEmailRecorded && userEmailRecorded !== '' ? setUserEmail(userEmailRecorded) : ''
      userPhoneRecorded && userPhoneRecorded !== '' ? setUserPhone(userPhoneRecorded) : ''

      const orderStatusRecorded = await AsyncStorage.getItem('orderStatus');
      const passwordChangesRecorded = await AsyncStorage.getItem('passwordChanges');
      const specialOffersRecorded = await AsyncStorage.getItem('specialOffers');
      const newsLetterRecorded = await AsyncStorage.getItem('newsLetter');
      orderStatusRecorded && orderStatusRecorded === 'flase' ? setOrderStatus(false) : ''
      passwordChangesRecorded && passwordChangesRecorded === 'false' ? setPasswordChanges(false) : ''
      specialOffersRecorded && specialOffersRecorded === 'false' ? setSpecialOffers(false) : ''
      newsLetterRecorded && newsLetterRecorded === 'false' ? setNewsLetter(false) : ''

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
          <View style={{ flexDirection: 'row', gap: 20, marginBottom: 20 }}>
            <Image
              source={require('../assets/user.png')}
              style={{
                maxHeight: 100,
                width: windowWidth / 4,
                alignSelf: 'start'
              }}
              resizeMode={'contain'}
              accessible={true}
              accessibilityLabel={"User Avatar"}
            />
            <Pressable style={[styles.primaryButton,
            {
              alignSelf: 'center',
            }
            ]}>
              <View style={styles.iconStyle}>
                <Ionicons style={styles.darkButtonText} name="person-add-outline" />
                <Text style={styles.darkButtonText}>Change Avatar</Text>
              </View>
            </Pressable>
            <Pressable style={[styles.darkButton,
            {
              alignSelf: 'center',
            }
            ]}>
              <View style={styles.iconStyle}>
                <Ionicons style={styles.darkButtonText} name="person-remove-outline" />
                <Text style={styles.darkButtonText}>Remove Avatar</Text>
              </View>
            </Pressable>
          </View>
          <KeyboardAvoidingView
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
                            ""
                    }
                  </Text>
                )}
            </ScrollView>
          </KeyboardAvoidingView>


          <Text style={styles.headingText}>E-Mail Notifications</Text>

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <CheckBox
              value={orderStatus}
              onValueChange={(value) => handleCheckboxChange(orderStatus, setOrderStatus)}
            />
            <Text style={styles.bodyText}>Order Statuses</Text>
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

          <Pressable
            onPress={() => {
              handleUserDetails();
            }}
            disabled={
              userName === '' || !ValidateEmailField(userEmail) || !ValidatePhoneNumberField(userPhone)
            }
            style={[
              userName === '' || !ValidateEmailField(userEmail) || !ValidatePhoneNumberField(userPhone) ?
                styles.subButtonDisabled : styles.primaryButton,
              { flex: 1 }
            ]}
          >
            <View style={styles.iconStyle}>
              <Ionicons style={styles.darkButtonText} name="save" />
              <Text style={styles.darkButtonText}>Save Changes</Text>
            </View>
          </Pressable>



          <Pressable
            style={[
              styles.darkButton,
              { alignSelf: 'center', backgroundColor: '#842029' }
            ]} onPress={() =>
              setLogout()
            }>
            <View style={styles.iconStyle}>
              <Ionicons style={{ color: "#F8D7DA", fontSize: 16, fontWeight: 500 }} name="log-out" />
              <Text style={{ color: "#F8D7DA", fontSize: 16, fontWeight: 500 }}>Logout</Text>
            </View>
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

  darkButtonText: {
    color: 'white',
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

