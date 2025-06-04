import { NativeBaseProvider } from 'native-base';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/Navigators/AppNavigator';
import { LogBox, View } from 'react-native';

function App(): React.JSX.Element {

  useEffect(() => {
    LogBox.ignoreAllLogs(true);
  }, [])

  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NativeBaseProvider>
          <AppNavigator />
        </NativeBaseProvider>
      </GestureHandlerRootView>
    </View>
  );
}

export default App;