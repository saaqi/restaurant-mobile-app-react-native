import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Switch,
  Pressable,
  Image,
  Alert
} from 'react-native'
import { useContext, useEffect } from 'react'
import { GlobalContext } from '../GlobalState'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker'
import * as SQLite from 'expo-sqlite'

export default function Profile({ navigation }) {

  const {
    userAvatar, setUserAvatar,
    userName, setUserName,
    userEmail, setUserEmail,
    userPhone, setUserPhone,
    deliveryStatus, setDeliveryStatus,
    passwordChanges, setPasswordChanges,
    specialOffers, setSpecialOffers,
    newsLetter, setNewsLetter,
    setUserLoggedIn,
    dbName
  } = useContext(GlobalContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
    !result.canceled && setUserAvatar(result.assets[0].uri)
  }

  const getStoredItemFromDatabase = async () => {
    try {
      const db = await SQLite.openDatabaseAsync(dbName)
      const dbDetails = await db.getFirstAsync(`SELECT * FROM users WHERE userEmail = ?`, [userEmail])

      setUserName(dbDetails.userName || '')
      setUserPhone(dbDetails.userPhone || '')
      setDeliveryStatus(!dbDetails.deliveryStatus ? false : true)
      setPasswordChanges(!dbDetails.passwordChanges ? false : true)
      setSpecialOffers(!dbDetails.specialOffers ? false : true)
      setNewsLetter(!dbDetails.newsLetter ? false : true)
    } catch (error) {
      console.error(`Error retrieving from SQLite database:`, error);
    }
  }

  useEffect(() => {
    getStoredItemFromDatabase()
  }, [])

  const handleUserDetails = async () => {
    try {
      const db = await SQLite.openDatabaseAsync(dbName);
      // Insert Data Into Database
      await db.runAsync(
        `UPDATE users SET
            userName = ?,
            userAvatar = ?,
            userPhone = ?,
            deliveryStatus = ?,
            passwordChanges = ?,
            specialOffers = ?,
            newsLetter = ?
            WHERE userEmail = ?`,
        [
          userName,
          userAvatar,
          userPhone,
          deliveryStatus ? 1 : 0,
          passwordChanges ? 1 : 0,
          specialOffers ? 1 : 0,
          newsLetter ? 1 : 0,
          userEmail
        ]
      )
      navigation.navigate('Home')
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  }

  const handleCheckboxChange = (isChecked, setIsChecked) => {
    setIsChecked(!isChecked);
  }

  const removeUserData = async () => {
    // Show confirmation alert
    Alert.alert(
      'Confirm',
      'Are you sure you want to remove your account?',
      [
        {
          text: 'Cancel', // Button to cancel the operation
          style: 'cancel',
        },
        {
          text: 'OK', // Button to proceed with removing data
          onPress: async () => {
            try {
              const db = await SQLite.openDatabaseAsync(dbName);
              // Delete from the database
              await db.runAsync(`DELETE FROM users WHERE userEmail = ?`, [userEmail]);

              // Clear user data from AsyncStorage
              await AsyncStorage.multiSet([
                ['userEmail', ''],
                ['userLoggedIn', 'false'],
              ]);

              // Reset state variables
              setUserAvatar('');
              setUserName('');
              setUserEmail('');
              setUserPhone('');
              setDeliveryStatus(true);
              setPasswordChanges(true);
              setSpecialOffers(false);
              setNewsLetter(false);
              setUserLoggedIn(false);

              console.log('User data removed successfully.');
            } catch (error) {
              console.error('Error retrieving User Data:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const setLogout = async () => {
    try {
      setUserLoggedIn(false)
      await AsyncStorage.multiSet([
        ['userLoggedIn', 'false']
      ]);
    } catch (error) {
      console.error('Error retrieving User Data:', error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headingText}>
        Welcome {userName.split(' ')[0]}, It is nice to have you.
      </Text>
      <View style={{
        flexDirection: 'row',
        gap: 20,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Pressable onPress={pickImage}>
          {userAvatar ? <Image
            source={{ uri: userAvatar }}
            style={{
              height: 100,
              width: 100,
              alignSelf: 'start',
              borderRadius: 100
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
          keyboardDismissMode={'on-drag'}
        >
          <TextInput
            style={styles.inputFieldDisabled}
            // onChangeText={setUserEmail}
            editable={false}
            placeholder='Your Email'
            secureTextEntry={false}
            keyboardType='email-address'
            value={userEmail}
          />
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
            onChangeText={setUserPhone}
            placeholder='Your Phone Number'
            secureTextEntry={false}
            keyboardType='number-pad'
            value={userPhone}
          />
          {(userName === '') && (
            <Text style={styles.alert}>
              {userName === '' ? 'Please Enter your full name to contiue.' : ''}
            </Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={{ marginBottom: 30 }}>
        <Text style={styles.headingText}>Select notifications</Text>

        <View style={styles.switchList}>
          <Text style={styles.bodyText}>Order Delivery Status</Text>
          <Switch
            value={deliveryStatus}
            onValueChange={(value) => handleCheckboxChange(deliveryStatus, setDeliveryStatus)}
          />
        </View>
        <View style={styles.switchList}>
          <Text style={styles.bodyText}>Passwrod Changes</Text>
          <Switch
            value={passwordChanges}
            onValueChange={(value) => handleCheckboxChange(passwordChanges, setPasswordChanges)}
          />
        </View>
        <View style={styles.switchList}>
          <Text style={styles.bodyText}>Special Offers</Text>
          <Switch
            value={specialOffers}
            onValueChange={(value) => handleCheckboxChange(specialOffers, setSpecialOffers)}
          />
        </View>
        <View style={styles.switchList}>
          <Text style={styles.bodyText}>Newsletter</Text>
          <Switch
            value={newsLetter}
            onValueChange={(value) => handleCheckboxChange(newsLetter, setNewsLetter)}
          />
        </View>
      </View>

      <View style={{
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
        rowGap: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40
      }}>
        <Pressable
          onPress={() => handleUserDetails()}
          disabled={userName === ''}
          style={[
            userName === '' ? styles.subButtonDisabled : styles.primaryButton,
            { flexBasis: '100%' }
          ]}
        >
          <View style={styles.iconStyle}>
            <Ionicons style={styles.darkButtonText} name="save-outline" />
            <Text style={styles.darkButtonText}>Save & Continue</Text>
          </View>
        </Pressable>
        <Pressable
          style={[styles.darkButton, { flex: .5 }]}
          onPress={() => setLogout()}
        >
          <View style={styles.iconStyle}>
            <Ionicons style={styles.darkButtonText} name="log-out-outline" />
            <Text style={styles.darkButtonText}>Logout</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => removeUserData()}
          style={[styles.dangerButton, { flex: .5 }]}
        >
          <View style={styles.iconStyle}>
            <Ionicons style={styles.dangerButtonText} name="trash-outline" />
            <Text style={styles.dangerButtonText}>Delete Account!</Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  headingText: {
    fontFamily: 'Markazi-Medium',
    fontSize: 26,
    color: "#1A1A19",
    marginBottom: 10,
    textAlign: 'center'
  },

  inputField: {
    fontFamily: 'Karla-Medium',
    fontSize: 16,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

  inputFieldDisabled: {
    fontFamily: 'Karla-Medium',
    fontSize: 16,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#cecece',
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

  bodyText: {
    fontFamily: 'Karla-Medium',
    fontSize: 18,
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
  },

  dangerButton: {
    backgroundColor: '#842029',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },

  darkButtonText: {
    fontFamily: 'Karla-Medium',
    fontSize: 16,
    color: 'white',
  },

  dangerButtonText: {
    fontFamily: 'Karla-Medium',
    fontSize: 16,
    color: '#F8D7DA',
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

  switchList: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap-reverse',
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    borderStyle: 'dashed',
  }

})
