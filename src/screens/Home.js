import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  TextInput
} from 'react-native'
import { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'


export default function Home() {

  const windowWidth = Dimensions.get('window').width
  const [ searchQuery, setSearchQuery ] = useState('')

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroSection}>
        <Text style={styles.headingText}>Little Lemon</Text>
        <Text style={styles.subHeadingText}>Chicago</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <Text style={styles.heroBodyText}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
          <View style={{ borderRadius: 20 }}>
            <Image
              source={require('../images/hero.png')}
              style={{
                alignSelf: 'flex-end',
                height: 250,
                width: windowWidth * 0.3,
                // maxWidth: 165,
                borderRadius: 10

              }}
              resizeMode={'cover'}
              accessible={true}
              accessibilityLabel={"Hero Section Image"}
            />
          </View>
        </View>
        <KeyboardAvoidingView style={styles.searchContainer}>
          <Ionicons style={styles.icon} name="search-circle-outline" />
          <TextInput
            style={styles.inputField}
            onChangeText={setSearchQuery}
            placeholder='Search for dishes'
            secureTextEntry={false}
            keyboardType='default'
            value={searchQuery}
          />
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FCDF"
  },

  heroSection: {
    backgroundColor: "#31511E",
    paddingVertical: 40,
    paddingHorizontal: 20
  },

  headingText: {
    fontSize: 48,
    fontFamily: 'Courier-BoldOblique',
    fontWeight: 700,
    color: "#ffff00",
    marginBottom: 20
  },

  subHeadingText: {
    fontSize: 36,
    fontFamily: 'Courier-BoldOblique',
    fontWeight: 700,
    color: "#E1E9C8",
    marginBottom: 40
  },

  searchContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },

  icon: {
    fontSize: 24,
    color: "#31511E",
    borderRightColor: '#333',
    borderRightWidth: 1,
    marginRight: 5,
    paddingRight: 5
  },

  inputField: {
    outlineStyle: 'none',
    height: '100%',
    width: "100%"
  },

  heroBodyText: {
    fontSize: 24,
    color: "#F6FCDF",
    marginBottom: 10
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



})