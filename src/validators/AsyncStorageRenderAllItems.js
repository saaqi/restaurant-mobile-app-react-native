import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageRenderAllItems = () => {
  const [storageItems, setStorageItems] = useState([]);

  useEffect(() => {
    const fetchStorageData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const items = await AsyncStorage.multiGet(keys);
        setStorageItems(items);
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };

    fetchStorageData();
  }, []);

  return (
    <ScrollView style={{flex: .5}}>
      {storageItems.map(([key, value]) => (
        <View key={key} style={{ margin: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>{key}:</Text>
          <Text>{value}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default AsyncStorageRenderAllItems;
