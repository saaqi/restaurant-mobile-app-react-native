import { KeyboardAvoidingView, StyleSheet, TextInput, Platform, View } from "react-native"
import { useEffect, useState, useContext } from 'react'
import { GlobalContext } from '../GlobalState'
import Ionicons from '@expo/vector-icons/Ionicons'

const SearchBox = () => {

  const [ input, setInput] = useState('')

  const {
    setSearchQuery
  } = useContext(GlobalContext)

  useEffect(() => {
    setSearchQuery(input)
  }, [input])

  return (
    <View>
      <KeyboardAvoidingView
        style={styles.searchContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Ionicons style={styles.icon} name="search-circle-outline" />
        <TextInput
          style={styles.inputField}
          onChangeText={setInput}
          placeholder='Search for dishes'
          secureTextEntry={false}
          keyboardType='default'
          value={input}
        />
      </KeyboardAvoidingView>
    </View>
  )
}

export default SearchBox


//Style Sheet
const styles = StyleSheet.create({

  searchContainer: {
    backgroundColor: "#31511E",
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0 -2px 4px rgba(0,0,0,0.3)'
  },

  icon: {
    fontSize: 24,
    color: "#F6FCDF",
    borderRightColor: '#F6FCDF',
    borderRightWidth: 1,
    marginRight: 10,
    paddingRight: 10
  },

  inputField: {
    fontSize: 18,
    fontFamily: 'Markazi Text Regular',
    color: '#F6FCDF',
    outlineStyle: 'none',
    height: '100%',
    width: "100%",
  },

})