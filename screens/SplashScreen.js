import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native'

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={require('../assets/littleLemonLogo.png')}
          style={{
            height: 546,
            width: 2000,
            alignSelf: 'center',
            flex: 1,
            marginVertical: 10
          }}
          resizeMode={'contain'}
          accessible={true}
          accessibilityLabel={"Little Lemon's Logo"}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FCDF",
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerContainer: {
    padding: 20,
  },

});

export default SplashScreen