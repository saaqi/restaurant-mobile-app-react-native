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
} from 'react-native'
import { useState } from 'react'
import { ValidateEmailField } from '../validators/ValidateEmailField'
import Ionicons from '@expo/vector-icons/Ionicons'


export default function Onboarding({ navigation }) {

  const [userName, onchangeUserName] = useState('')
  const [userEmail, onchangeUesrEmail] = useState('')

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>

        <View style={{ flex: .2, paddingBottom: 30}}>
          <Image
            source={require('../assets/littleLemonLogo.png')}
            style={{
              alignSelf: 'center',
              width: 546,
              flex: 1,
              paddingBottom: 30
            }}
            resizeMode={'contain'}
            accessible={true}
            accessibilityLabel={"Saaqi's Logo"}
          />
        </View>

        <View style={{ flex: .2, paddingBottom: 30, alignSelf: 'center', }}>
          <Text style={styles.bodyText}>Let us get to know you!</Text>
        </View>

        <View style={{ flex: .6 }}>
          <KeyboardAvoidingView
            style={styles.innerContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView
              horizontal={false}
              // indicatorStyle={'#333'}
              keyboardDismissMode="on-drag"
            >
              <TextInput
                style={styles.inputField}
                onChangeText={onchangeUserName}
                placeholder='Your Name'
                keyboardType='default'
                value={userName}
                clearButtonMode='always'
              />
              <TextInput
                style={styles.inputField}
                onChangeText={onchangeUesrEmail}
                placeholder='Your Email'
                secureTextEntry={false}
                keyboardType='email-address'
                value={userEmail}
              />
              <Text style={{ color: 'red', marginVertical: 10 }}>
                {
                  userName === '' ? 'Please Enter your Name' :
                    !ValidateEmailField(userEmail) ? 'Please Enter your Email to continue' : ''
                }
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Pressable
                  onPress={() => navigation.navigate('Profile')}
                  disabled={userName === '' || !ValidateEmailField(userEmail)}
                  style={[
                    userName === '' || !ValidateEmailField(userEmail) ?
                      styles.subButtonDisabled : styles.subButton,
                    { flex: 1, alignSelf: 'end' }
                  ]}
                >
                  <View style={styles.iconStyle}>
                    <Text style={styles.buttonText}>Next</Text>
                    <Ionicons style={styles.buttonText} name="log-in-outline" />
                  </View>
                </Pressable>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>

        <StatusBar style="auto" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FCDF"
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  innerContainer: {
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
    fontSize: 18,
    fontWeight: '500',
  },

  subButton: {
    backgroundColor: '#31511E',
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
  iconStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },
});