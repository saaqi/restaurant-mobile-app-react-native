import {
  View,
  SectionList,
  Image,
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native'
import * as SQLite from 'expo-sqlite'
import { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../GlobalState'
import Ionicons from '@expo/vector-icons/Ionicons'
import NetInfo from '@react-native-community/netinfo'

const Home = () => {
  const [isLoading, setLoading] = useState(true)
  const [menuItems, setMenuItems] = useState([])
  const [inputQuery, setInputQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const { dbName, userEmail, setUserAvatar } = useContext(GlobalContext)

  const getStoredItemFromDatabase = async () => {
    try {
      const db = await SQLite.openDatabaseAsync(dbName)
      const dbDetails = await db.getFirstAsync(`SELECT userAvatar FROM users WHERE userEmail = ?`, [userEmail])
      setUserAvatar(dbDetails.userAvatar || '')
    } catch (error) {
      console.error(`Error retrieving from SQLite database:`, error);
    }
  }

  useEffect(() => {
    getStoredItemFromDatabase()
  }, [])

  // Debounce the search query input to avoid excessive updates
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setSearchQuery(inputQuery)
    }, 300)
    // Cleanup the timeout on component unmount or when inputQuery changes
    return () => {
      clearTimeout(debounceTimeout)
    }
  }, [inputQuery])

  // Fetch menu data from remote server
  const fetchMenuFromServer = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/saaqi/react-native-capstone-saaqi/refs/heads/main/src/menu.json'
      )
      const data = await response.json()
      return data.menu.map((item, index) => {
        return {
          ...item,
          id: `menu-${index + 1}`
        }
      })
    } catch (error) {
      console.error('Error fetching menu:', error)
      return []
    }
  }

  // Insert menu items into SQLite database
  const insertMenuItems = async (items) => {
    try {
      const db = await SQLite.openDatabaseAsync(dbName)
      const entryData = items.map(() => '(?, ?, ?, ?, ?)').join(', ')
      const values = items.flatMap(item => [
        item.name,
        item.price,
        item.description,
        item.image,
        item.category,
      ])
      await db.runAsync(
        `INSERT INTO menu (name, price, description, image, category) VALUES ${entryData};`,
        values
      )
    } catch (error) {
      console.error('Inserting menu items:', error)
    }
  }

  // Retrieve menu items from database
  const retrieveMenuItems = async () => {
    try {
      const db = await SQLite.openDatabaseAsync(dbName)
      const allRows = await db.getAllAsync('SELECT * FROM menu')
      // Map each row to an object with the desired structure
      return allRows.map(row => ({
        name: row.name,
        price: parseFloat(row.price),
        description: row.description,
        image: row.image,
        category: row.category
      }))
    } catch (error) {
      console.error('Retrieving menu items:', error)
      return []
    }
  }

  // Check if database is empty
  const isDatabaseEmpty = async () => {
    try {
      const db = await SQLite.openDatabaseAsync(dbName)
      const allRows = await db.getAllAsync('SELECT COUNT(*) as count FROM menu')
      // If the count is 0, it means the table is empty
      return allRows[0].count === 0
    } catch (error) {
      console.error('Checking database:', error)
      return false // Return false if there's an error (indicating the table is not empty)
    }
  }

  // Main data loading logic
  const loadMenuData = async () => {
    try {
      const db = await SQLite.openDatabaseAsync(dbName)
      const offlineMenu = await retrieveMenuItems()
      const onlineMenu = await fetchMenuFromServer()
      const isEmpty = await isDatabaseEmpty()
      const netInfo = await NetInfo.fetch()

      if (!isEmpty) {
        // Use locally stored items from the database
        setMenuItems(offlineMenu)

        // Fetch from server and store in database if server has more or less items
        if (netInfo.isConnected && netInfo.isInternetReachable) {
          if (offlineMenu.length !== onlineMenu.length) {
            await db.runAsync('DELETE FROM menu')
            await insertMenuItems(onlineMenu)
            setMenuItems(onlineMenu)
          }
        }
      } else {
        // Fetch from server and store in database
        await insertMenuItems(onlineMenu)
        setMenuItems(onlineMenu)
      }
    } catch (error) {
      console.error('Setting Menu List:', error)
    } finally {
      setLoading(false)
    }
  }

  // Effect to load menu data on component mount
  useEffect(() => {
    loadMenuData()
  }, [])

  const menuFooter = () => <Text style={styles.menuFooter}>All Rights Reserved &copy; 2024</Text>
  const Separator = () => <View style={styles.separator}></View>
  const Foods = ({ name, price, description, image }) => {
    return (
      <View style={{
        flex: 1,
        padding: 20,
        flexDirection: 'row',
        gap: 10
      }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.listHeading}>{name}</Text>
          <Text style={styles.listBody}>{description}</Text>
          <Text style={styles.listPrice}>{price}</Text>
        </View>
        <View style={{}}>
          <Image
            source={{ uri: `https://raw.githubusercontent.com/saaqi/react-native-capstone-saaqi/refs/heads/main/assets/menu/${image}?raw=true` }}
            style={{
              height: 150,
              width: 150,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#31511e',
              alignSelf: 'flex-end'
            }}
            resizeMode={'cover'}
            accessible={true}
            accessibilityLabel={name}
          />
        </View>
      </View>
    )
  }

  // Setup Sections
  const sections = [...new Set(menuItems.map((item) => item.category))].map((category) => ({
    title: category.charAt(0).toUpperCase() + category.slice(1), // Capitalize category name
    data: menuItems.filter((item) => item.category === category), // Filter items by category
  }))
  const filteredSectionMenu = sections.map((section) => {
    const filteredData = section.data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    if (filteredData.length > 0) {
      return { ...section, data: filteredData }
    }
    return null
  }).filter(Boolean)

  // Setup Hero Section
  const MenuHeader = () => {
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
      </View>
    )
  }

  return (
    <View style={styles.listContainer}>
      {isLoading ? (<ActivityIndicator style={{ flex: 1 }} />) : (
        <SectionList
          keyboardDismissMode={'on-drag'}
          sections={filteredSectionMenu}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({ item }) => (
            <Foods
              name={item.name}
              description={item.description}
              price={'$' + item.price}
              image={item.image}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>
              {title}
            </Text>
          )}
          ItemSeparatorComponent={Separator}
          ListHeaderComponent={
            <View>
              <MenuHeader />
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.searchContainer}
              >
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  borderRadius: 50,
                  paddingHorizontal: 10,
                }}>
                  <Ionicons style={styles.icon} name="search-circle-outline" />
                  <TextInput
                    style={styles.inputField}
                    onChangeText={setInputQuery}
                    placeholder='Search for dishes'
                    secureTextEntry={false}
                    keyboardType='default'
                    value={inputQuery}
                  />
                </View>
              </KeyboardAvoidingView>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                marginVertical: 20,
                paddingHorizontal: 20,
                marginTop: 20,
                gap: 10
              }}>
                <Pressable
                  style={[styles.menuSelector, searchQuery === '' && { backgroundColor: '#31511E' }]}
                  onPress={() => setSearchQuery('')}
                >
                  <Text style={[styles.menuSelectorText, searchQuery === '' && { color: '#F6FCDF' }]}>
                    All
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.menuSelector, searchQuery === 'starters' && { backgroundColor: '#31511E' }]}
                  onPress={() => setSearchQuery('starters')}
                >
                  <Text style={[styles.menuSelectorText, searchQuery === 'starters' && { color: '#F6FCDF' }]}>
                    Starters
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.menuSelector, searchQuery === 'mains' && { backgroundColor: '#31511E' }]}
                  onPress={() => setSearchQuery('mains')}
                >
                  <Text style={[styles.menuSelectorText, searchQuery === 'mains' && { color: '#F6FCDF' }]}>
                    Mains
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.menuSelector, searchQuery === 'desserts' && { backgroundColor: '#31511E' }]}
                  onPress={() => setSearchQuery('desserts')}
                >
                  <Text style={[styles.menuSelectorText, searchQuery === 'desserts' && { color: '#F6FCDF' }]}>
                    Desserts
                  </Text>
                </Pressable>
              </View>
            </View>
          }
          ListFooterComponent={menuFooter}
        />
      )}
    </View >
  )
}

//Style Sheet
const styles = StyleSheet.create({

  listContainer: {
    flex: 1,
  },

  sectionHeader: {
    fontWeight: 500,
    fontFamily: 'Markazi-Medium',
    fontSize: 40,
    textAlign: 'center',
    borderBottomColor: '#31511E',
    borderBottomWidth: 1,
  },

  menuSelector: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: '#333',
    borderWidth: 1,
    flex: .25,
    borderRadius: 40
  },

  menuSelectorText: {
    fontFamily: 'Karla-Medium',
    fontSize: 14,
    textAlign: 'center',
  },

  menuFooter: {
    fontFamily: 'Karla-Medium',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    marginTop: 10,
  },

  separator: {
    borderBottomWidth: 1,
    borderColor: '#31511E',
    borderStyle: 'dashed'
  },

  heroSection: {
    backgroundColor: "#31511E",
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


  searchContainer: {
    backgroundColor: "#31511E",
    paddingHorizontal: 20,
    paddingBottom: 20
  },

  icon: {
    fontSize: 24,
    flex: .1,
    textAlign: 'center',
  },

  inputField: {
    fontFamily: 'Karla-Medium',
    fontSize: 18,
    outlineStyle: 'none',
    flex: .9
  },

  listHeading: {
    fontFamily: 'Karla-Bold',
    fontSize: 24,
    marginBottom: 10
  },

  listBody: {
    fontFamily: 'Karla-Medium',
    fontSize: 16,
    marginBottom: 10
  },

  listPrice: {
    fontFamily: 'Karla-Bold',
    fontSize: 20,
    color: '#31511E',
    marginTop: 'auto'
  },


})

export default Home