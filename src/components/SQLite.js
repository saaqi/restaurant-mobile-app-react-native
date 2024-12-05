import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from "react-native";
import * as SQLite from "expo-sqlite";

// Open or create SQLite database
const db = await SQLite.openDatabaseAsync('little_lemon')

const MenuComponent = () => {
  const [menuList, setMenuList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize database and check for existing data
  useEffect(() => {
    const initializeDatabase = async () => {
      // Create the 'menu' table if it doesn't exist
      await db.execAsync(
        [
          {
            sql: `
              CREATE TABLE IF NOT EXISTS menu (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                description TEXT NOT NULL,
                image TEXT NOT NULL,
                category TEXT NOT NULL
              )
            `,
            args: [],
          },
        ],
        false
      );

      // Check if data already exists in the 'menu' table
      const result = await db.execAsync(
        [
          {
            sql: "SELECT * FROM menu",
            args: [],
          },
        ],
        true
      );

      if (result[0].rows.length > 0) {
        // Load existing data from the database
        setMenuList(result[0].rows);
        setIsLoading(false);
      } else {
        // Fetch data from remote server and insert into database
        fetchmenuList();
      }
    };

    initializeDatabase();
  }, []);

  // Fetch menu data from the remote server and store it in the database
  const fetchmenuList = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
      );
      const json = await response.json();
      const menuItems = json.menu;

      // Insert menu data into the database
      const insertQueries = menuItems.map((item) => ({
        sql: `
          INSERT INTO menu (name, price, description, image, category)
          VALUES (?, ?, ?, ?)
        `,
        args: [item.name, item.price, item.description, item.image, item.category],
      }));

      await db.execAsync(insertQueries, false);

      // Set the fetched data as state
      setMenuList(menuItems);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  }

}

export default MenuComponent;
