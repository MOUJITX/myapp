import * as React from 'react';
import { AppNavigation } from './src/navigation/AppNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'rgba(0,0,0,0)'}
        translucent={true}
      />
      <AppNavigation />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
