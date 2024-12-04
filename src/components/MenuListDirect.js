import {
  Text,
  StyleSheet,
  FlatList,
  View,
  Image,
  ActivityIndicator,
  Dimensions,
  // Pressable
} from 'react-native'
import { useEffect, useState, useContext } from 'react'
import { GlobalContext } from '../GlobalState'


const MenuListDirect = () => {

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
          picture: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
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

  const Foods = ({ name, price, description, picture }) => {
    return (
      <View style={{
        flex: 1,
        paddingVertical: 20,
        flexDirection: 'row',
        gap: 10
      }}>
        <View style={{ width: windowWidth - 200 }}>
          <Text style={{ fontSize: 24, fontWeight: 700, marginBottom: 10 }}>{name} </Text>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>{description}</Text>
          <Text style={{ fontSize: 20, fontWeight: 500, marginTop: 'auto' }}>{price}</Text>
        </View>
        <View style={{}}>
          <Image
            source={{ uri: picture }}
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
    searchKeyword, setSearchKeyword
  } = useContext(GlobalContext);

  // Filtered menu based on the search keyword
  const filteredMenu = menuList.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchKeyword.toLowerCase())
    )
  )

  return (
    <View style={styles.listContainer}>
      {isLoading ? (<ActivityIndicator />) : (
        <View>
          <FlatList
            data={filteredMenu}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Foods
                name={item.name}
                description={item.description}
                price={'$' + item.price}
                picture={item.picture}
              />
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

export default MenuListDirect

//Style Sheet
const styles = StyleSheet.create({

  listContainer: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 20
  },

  menuHeader: {
    fontWeight: 'bold',
    fontSize: 24,
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
    borderColor: '#666',
    paddingTop: 1
  }

})