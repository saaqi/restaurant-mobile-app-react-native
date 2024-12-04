import {
  Text,
  StyleSheet,
  SectionList,
  View,
  Image,
  ActivityIndicator,
  Dimensions,
  Pressable
} from 'react-native'
import { useEffect, useState, useContext } from 'react'
import { GlobalContext } from '../GlobalState'


const MenuSectionListDirect = () => {

  const [isLoading, setLoading] = useState(true)
  const [menuList, setMenuList] = useState([])
  const windowWidth = Dimensions.get('window').width


  const getMenu = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'
      )
      const json = await response.json()
      setMenuList(json.menu.map((item, index) => {
        return {
          ...item,
          id: `menu-${index + 1}`
        }
      }))
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMenu()
  }, [])

  const menuHeader = () => <Text style={styles.menuHeader}>Our Menu</Text>
  const menuFooter = () => <Text style={styles.menuFooter}>All Rights Reserved &copy; 2024</Text>
  const Separator = () => <View style={styles.separator}></View>

  const Foods = ({ name, price, description, image }) => {
    return (
      <View style={{
        flex: 1,
        paddingVertical: 20,
        flexDirection: 'row',
        gap: 10
      }}>
        <View style={{ width: windowWidth - 200 }}>
          <Text style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{name}</Text>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>{description}</Text>
          <Text style={{ fontSize: 18, fontWeight: 500, marginTop: 'auto' }}>{price}</Text>
        </View>
        <View style={{}}>
          <Image
            source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true` }}
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

  const {
    searchQuery, setSearchQuery
  } = useContext(GlobalContext);

  const sections = [
    {
      title: "Starters",
      data: menuList.filter((item) => item.category === "starters"),
    },
    {
      title: "Mains",
      data: menuList.filter((item) => item.category === "mains"),
    },
    {
      title: "Desserts",
      data: menuList.filter((item) => item.category === "desserts"),
    },
  ]

  const filteredSectionMenu = sections
    .map((section) => {
      const filteredData = section.data.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      if (filteredData.length > 0) {
        return { ...section, data: filteredData }
      }

      return null
    })
    .filter(Boolean)

  return (
    <View style={styles.listContainer}>
      {isLoading ? (<ActivityIndicator />) : (
        <View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: 20,
            gap: 10
          }}>
            <Pressable
              style={[styles.menuSelector, searchQuery === '' && { backgroundColor: '#31511E' }]}
              onPress={() => setSearchQuery('')}
            >
              <Text
                style={[
                  searchQuery === '' && { color: '#F6FCDF' },
                  { textAlign: 'center', fontWeight: 500, fontFamily: 'Karla-Medium' }
                ]}
              >
                All
              </Text>
            </Pressable>
            <Pressable
              style={[styles.menuSelector, searchQuery === 'starters' && { backgroundColor: '#31511E' }]}
              onPress={() => setSearchQuery('starters')}
            >
              <Text
                style={[
                  searchQuery === 'starters' && { color: '#F6FCDF' },
                  { textAlign: 'center', fontWeight: 500, fontFamily: 'Karla-Medium' }
                ]}
              >
                Starters
              </Text>
            </Pressable>
            <Pressable
              style={[styles.menuSelector, searchQuery === 'mains' && { backgroundColor: '#31511E' }]}
              onPress={() => setSearchQuery('mains')}
            >
              <Text
                style={[
                  searchQuery === 'mains' && { color: '#F6FCDF' },
                  { textAlign: 'center', fontWeight: 500, fontFamily: 'Karla-Medium' }
                ]}
              >
                Mains
              </Text>
            </Pressable>
            <Pressable
              style={[styles.menuSelector, searchQuery === 'desserts' && { backgroundColor: '#31511E' }]}
              onPress={() => setSearchQuery('desserts')}
            >
              <Text
                style={[
                  searchQuery === 'desserts' && { color: '#F6FCDF' },
                  { textAlign: 'center', fontWeight: 500, fontFamily: 'Karla-Medium' }
                ]}
              >
                Desserts
              </Text>
            </Pressable>
          </View>
          <SectionList
            sections={filteredSectionMenu}
            keyExtractor={(item, index) => item.name + index} // Use a unique key
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
            ListHeaderComponent={menuHeader}
            ListFooterComponent={menuFooter}
          />
        </View>
      )}
    </View>
  )
}

export default MenuSectionListDirect

//Style Sheet
const styles = StyleSheet.create({

  listContainer: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 20
  },

  sectionHeader: {
    fontWeight: 500,
    fontFamily: 'MarkaziText-Medium',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 10,
    borderBottomColor: '#31511E',
    borderBottomWidth: 1,
  },

  menuSelector: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: '#333',
    borderWidth: 1,
    fontFamily: 'MarkaziText-Regular',
    flex: .25,
    borderRadius: 40
  },

  menuHeader: {
    fontFamily: 'Karla-Bold',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center'
  },

  menuFooter: {
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    marginTop: 10,
  },

  separator: {
    borderBottomWidth: 1,
    borderColor: '#31511E',
    borderStyle: 'dashed',
    paddingTop: 1
  }

})