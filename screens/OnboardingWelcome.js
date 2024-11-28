import { StatusBar } from 'expo-status-bar'
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  Image,
  Dimensions
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'


export default function OnboardingWelcome({ navigation }) {

  const deviceWidth = Dimensions.get('window').width


  return (
    <View style={styles.container}>
      <View style={{ flex: .8 }}>
        <Image
          source={require('../assets/littleLemonLogo.png')}
          style={{
            alignSelf: 'center',
            height: 546,
            width: deviceWidth / 1.5,
            flex: .5,
          }}
          resizeMode={'contain'}
          accessible={true}
          accessibilityLabel={"Saaqi's Logo"}
        />
        <Text style={styles.bodyText}>Let us get to know you!</Text>
      </View>

      <View style={{ flex: .2, flexDirection: 'column' }}>
        <Pressable
          onPress={() => {
            navigation.navigate('Login')
          }}
          style={ styles.loginButton }
        >
          <View style={styles.iconStyle}>
            <Text style={styles.loginButtonText}>Login</Text>
            <Ionicons style={styles.loginButtonText} name="log-in-outline" />
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Signup')
          }}
          style={ styles.signupButton }
        >
          <View style={styles.iconStyle}>
            <Text style={styles.singupButtonText}>Signup</Text>
            <Ionicons style={styles.singupButtonText} name="person-add" />
          </View>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FCDF",
    padding: 20,
    justifyContent: 'center',
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
    textAlign: 'center',
    flex: .5,
  },

  loginButton: {
    backgroundColor: '#31511E',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginBottom: 10,
  },

  signupButton: {
    borderWidth: 1,
    borderColor: '#31511E',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
  },

  loginButtonText: {
    color: 'white',
    fontWeight: 500,
    fontSize: 18,
  },
  singupButtonText: {
    color: '#31511E',
    fontWeight: 500,
    fontSize: 18,
  },
  iconStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },
});