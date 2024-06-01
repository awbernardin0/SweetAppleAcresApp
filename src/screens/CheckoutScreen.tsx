import React from 'react';
import {FlatList, Text, Button, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {placeOrder} from '../store/slices/cartSlice';
import {
  Container,
  Title,
  ProductItem,
  ProductName,
  ProductPrice,
} from '../styles/GlobalStyles';

const CheckoutScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const {items, status, error} = useAppSelector(state => state.cart);

  const handlePlaceOrder = () => {
    dispatch(placeOrder());
  };

  const renderItem = ({
    item,
  }: {
    item: {productId: string; name: string; price: number; quantity: number};
  }) => (
    <ProductItem>
      <ProductName>{item.name}</ProductName>
      <ProductPrice>
        ${item.price} x {item.quantity}
      </ProductPrice>
    </ProductItem>
  );

  return (
    <Container>
      <Title>Checkout</Title>
      {status === 'loading' && <Text>Placing order...</Text>}
      {status === 'failed' && <Text>Error: {error}</Text>}
      {status === 'succeeded' && <Text>Order placed successfully!</Text>}
      <FlatList
        data={items}
        keyExtractor={item => item.productId}
        renderItem={renderItem}
      />
      <View style={{marginTop: 20}}>
        <Button
          title="Place Order"
          onPress={handlePlaceOrder}
          disabled={status === 'loading'}
        />
      </View>
    </Container>
  );
};

export default CheckoutScreen;
