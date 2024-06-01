import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './src/AppNavigator';
import store from './src/store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
