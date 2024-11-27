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

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.bodyText}>Profile Page</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#F6FCDF"
  },

  innerContainer: {
    padding: 20,
  },

  bodyText: {
    fontSize: 16,
    color: "#1A1A19"
  }

});


export default Profile

