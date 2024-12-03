import {
  Text,
  StyleSheet,
  FlatList,
  View,
  Image,
  // ScrollView,
  ActivityIndicator,
  Dimensions,
  Pressable
} from 'react-native'
import { useEffect, useState } from 'react'

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
      setMenuList(json.menu.map((item) => {
        return {
          ...item,
          picture: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`
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
    console.log(menuList)
  }, [])

  const menuHeader = () => <Text style={styles.menuHeader}>Our Menu</Text>
  const menuFooter = () => <Text style={styles.menuFooter}>All Rights Reserved 2024</Text>
  const Separator = () => <View style={styles.separator}></View>

  // const FoodCats = ({ category }) => {
  //   return (
  //     <ScrollView >
  //       <Pressable>
  //         <Text>{category}</Text>
  //       </Pressable>
  //     </ScrollView>
  //   )
  // }
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
            // source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true` }}
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

  return (
    <View style={styles.listContainer}>
      {isLoading ? (<ActivityIndicator />) : (
        <View>
          {/* <FlatList
            data={menuList}
            keyExtractor={(item, index) => item + index + 'cats'}
            renderItem={({ item }) => (
              <FoodCats
                category={item.category}
              />
            )}
          /> */}
          <FlatList
            data={menuList}
            keyExtractor={(item, index) => item + index}
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