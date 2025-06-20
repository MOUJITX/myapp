import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigation } from './src/navigation/AppNavigation';
import { navigationRef } from './src/navigation/AppNavigationRef';
import 'react-native-reanimated';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <SafeAreaProvider style={styles.container}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'rgba(0,0,0,0)'}
          translucent={true}
        />
        <NavigationContainer ref={navigationRef}>
          <BottomSheetModalProvider>
            <AppNavigation />
          </BottomSheetModalProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  gestureHandlerRootView: {
    flex: 1,
  },
});
