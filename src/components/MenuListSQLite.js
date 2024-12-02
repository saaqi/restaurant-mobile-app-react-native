import {
  Text,
  StyleSheet,
  FlatList,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Pressable
} from 'react-native'
import { useEffect, useState } from 'react'
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabaseSync('littleLemon');

const MenuListSQLite = () => {

  const [isLoading, setLoading] = useState(true)
  const [menuItems, setMenuItems] = useState([])
  const windowWidth = Dimensions.get('window').width


  const fetchMenuData = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'
      )
      const data = await response.json()
      return data.menu
    } catch (e) {
      console.error(e)
      return []
    } finally {
      setLoading(false)
    }
  }

  // Initialize SQLite database
  const initDatabase = async () => {
    try {
      await db.execAsync(
        `create table if not exists menu (
          id text primary key,
          name text,
          price real,
          description text,
          image text
        )`
      );
    } catch (error) {
      console.error('Error initializing database:', error)
    }
  }

  // Save menu data to SQLite
  const saveMenuToDatabase = async (menu) => {
    try {
      // Clear existing data
      await db.execAsync(`delete from menu`);

      // Insert new data
      const values = menu
        .map(
          (item) =>
            `('${item.id}', '${item.name}', '${item.price}', '${item.description}', '${item.image}')`
        )
        .join(',');

      await db.execAsync(
        `insert into menu (id, name, price, description, image) values ${values}`
      );
    } catch (error) {
      console.error('Error saving menu data to database:', error);
    }
  }

  // Load menu data from SQLite
  const loadMenuFromDatabase = async () => {
    try {
      const result = await db.execAsync(`select * from menu`);
      return result.rows._array || [];
    } catch (error) {
      console.error('Error loading menu data from database:', error);
      return [];
    }
  };

  // Load menu items on component mount
  useEffect(() => {
    const loadMenu = async () => {
      await initDatabase();

      const storedMenu = await loadMenuFromDatabase();
      if (storedMenu.length === 0) {
        const menu = await fetchMenuData();
        await saveMenuToDatabase(menu);
        setMenuItems(menu);
      } else {
        setMenuItems(storedMenu);
      }
    };
    loadMenu();
  }, []);

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
  const Foods = ({ name, price, description, image }) => {
    return (
      <View style={{
        flex: 1,
        paddingVertical: 20,
        flexDirection: 'row',
        gap: 10
      }}>
        <View style={{ width: windowWidth - 200 }}>
          <Text style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>{name} </Text>
          <Text style={{ fontSize: 18 }}>{description}</Text>
          <Text style={{ fontSize: 20, fontWeight: 500, marginTop: 'auto' }}>{price}</Text>
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
            data={menuItems}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <Foods
                name={item.name}
                description={item.description}
                price={'$' + item.price}
                image={item.image}
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

export default MenuListSQLite

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