import { ScrollView, View, StyleSheet, Text, Image } from 'react-native'
import { useEffect, useContext } from 'react'
import { GlobalContext } from '../GlobalState'


export default function Home({ navigation }) {

  const {
    userOnBoarded
  } = useContext(GlobalContext);

  useEffect(() => {
    !userOnBoarded && navigation.navigate('Profile')
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroSection}>
        <Text style={styles.headingText}>Little Lemon</Text>
        <Text style={styles.subHeadingText}>Chicago</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <Text style={[styles.heroBodyText, { flexBasis: '50%' }]}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
          <View style={{ flexBasis: '50%', borderRadius: 20 }}>
            <Image
              source={require('../../assets/hero.png')}
              style={{
                alignSelf: 'center',
                height: 250,
                width: 165,
                borderRadius: 10

              }}
              resizeMode={'contain'}
              accessible={true}
              accessibilityLabel={"Hero Section Image"}
            />
          </View>
        </View>
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

  inputField: {
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
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

  iconStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },

})