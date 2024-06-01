import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ProductsScreen from './screens/ProductsScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import CheckoutScreen from './screens/CheckoutScreen';

export type RootStackParamList = {
  Products: undefined;
  ProductDetails: {productId: string};
  Checkout: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Products">
        <Stack.Screen name="Products" component={ProductsScreen} />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{title: 'Product Details'}}
        />
        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{title: 'Checkout'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
