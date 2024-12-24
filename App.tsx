import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
} from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <Text>theme mode: { isDarkMode ? 'dark' : 'light'}</Text>
      <Text>hello</Text>
    </SafeAreaView>
  );
};

export default App;
