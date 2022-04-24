import React from 'react';
import { SafeAreaView } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import ChatScreen from './src/components/ChatScreen';
import { store, persistor } from './store/configureStore';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SafeAreaView>
        <ChatScreen />
      </SafeAreaView>
    </PersistGate>
  </Provider>
);

export default App;
