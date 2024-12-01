import { View, Text } from 'react-native'
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
    <View>
      <Text>
        Welcome Home
      </Text>
    </View>
  )
}