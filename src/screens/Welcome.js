import {
  Text,
  StyleSheet,
  View,
  Pressable,
  Image,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Welcome({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.heroSection}>
        <Text style={styles.headingText}>Little Lemon</Text>
        <Text style={styles.subHeadingText}>Chicago</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.heroBodyText, { flex: .5 }]}>
            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
          </Text>
          <View style={{ borderRadius: 20, flex: .5 }}>
            <Image
              source={require('../../assets/hero.png')}
              style={{
                alignSelf: 'flex-end',
                height: 200,
                width: 132,
                borderRadius: 10,

              }}
              resizeMode={'cover'}
              accessible={true}
              accessibilityLabel={"Hero Section Image"}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => { navigation.navigate('Login') }}
          style={styles.loginButton}
        >
          <View style={styles.iconStyle}>
            <Text style={styles.loginButtonText}>Login</Text>
            <Ionicons style={styles.loginButtonText} name="log-in-outline" />
          </View>
        </Pressable>
        <Pressable
          onPress={() => { navigation.navigate('Signup') }}
          style={styles.signupButton}
        >
          <View style={styles.iconStyle}>
            <Text style={styles.singupButtonText}>Signup</Text>
            <Ionicons style={styles.singupButtonText} name="person-add" />
          </View>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#31511E",
    justifyContent: 'space-around',
  },

  heroSection: {
    paddingVertical: 30,
    paddingHorizontal: 20
  },

  headingText: {
    fontSize: 70,
    fontFamily: "Markazi-Medium",
    color: "#ffff00",
    textAlign: 'center'
  },

  subHeadingText: {
    fontSize: 40,
    fontFamily: "Markazi-Medium",
    color: "#E1E9C8",
    textAlign: 'center',
    marginBottom: 20,
    marginTop: -10
  },

  heroBodyText: {
    fontFamily: 'Karla-Medium',
    fontSize: 20,
    color: "#F6FCDF",
  },

  buttonContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    gap: 10
  },

  loginButton: {
    backgroundColor: '#F6FCDF',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#859F3D'
  },

  loginButtonText: {
    color: '#31511E',
    fontWeight: 500,
    fontSize: 18,
  },

  signupButton: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
  },

  singupButtonText: {
    color: '#fff',
    fontWeight: 500,
    fontSize: 18,
  },

  iconStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  }
})
