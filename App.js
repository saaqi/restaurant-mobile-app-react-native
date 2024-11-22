import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, useColorScheme } from 'react-native';


export default function App() {
  const isDark = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={[
      styles.container,
      {
        backgroundColor: isDark ? '#1A1A19' : '#F6FCDF'
      }
    ]}>
      <View style={styles.innerContainer}>
        <Text style={{ color: isDark ? '#F6FCDF' : '#1A1A19' }}>Hello World! This is Saqib Islam.</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      alignItems: 'center',
    justifyContent: 'center',
  },

  innerContainer: {
    padding: 20,
  },
});
