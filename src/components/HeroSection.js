import {
  View,
  StyleSheet,
  Text,
  Image,
  KeyboardAvoidingView,
  TextInput
} from 'react-native'
import { GlobalContext } from '../GlobalState'
import { useContext, useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function HeroSection() {

  const [inputQuery, setInputQuery] = useState('')

  const {
    setSearchQuery
  } = useContext(GlobalContext)

  useEffect(() => {
    setSearchQuery(inputQuery)
  }, [inputQuery])

  return (
    <View style={styles.container}>
      <View style={styles.heroSection}>
        <Text style={styles.headingText}>Little Lemon</Text>
        <Text style={styles.subHeadingText}>Chicago</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.heroBodyText, { flexBasis: '50%' }]}>
            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
          </Text>
          <View style={{ borderRadius: 20, flexBasis: '50%' }}>
            <Image
              source={require('../../assets/hero.png')}
              style={{
                alignSelf: 'flex-end',
                height: 250,
                width: 165,
                borderRadius: 10,

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
            onChangeText={setInputQuery}
            placeholder='Search for dishes'
            secureTextEntry={false}
            keyboardType='default'
            value={inputQuery}
          />
        </KeyboardAvoidingView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FCDF",
    fontFamiy: "Karla",
    marginBottom: 20
  },

  heroSection: {
    backgroundColor: "#31511E",
    paddingVertical: 40,
    paddingHorizontal: 20
  },

  headingText: {
    fontSize: 60,
    fontFamily: "Markazi Text Medium",
    fontWeight: 500,
    color: "#ffff00",
    marginBottom: 20
  },

  subHeadingText: {
    fontSize: 36,
    fontFamily: "Karla Medium",
    fontWeight: 500,
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
    width: "100%",
  },

  heroBodyText: {
    fontSize: 24,
    color: "#F6FCDF",
    marginBottom: 10,
    fontFamiy: "Karla"
  },

})