import React, {useEffect} from 'react';
import {FlatList, ListRenderItem, Text, Button, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {fetchProducts, Product} from '../store/slices/productsSlice';
import {
  Container,
  Title,
  ProductItem,
  ProductName,
  ProductPrice,
} from '../styles/GlobalStyles';
import {RootStackParamList} from '../AppNavigator';
import {StackNavigationProp} from '@react-navigation/stack';

type ProductsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Products'
>;

const ProductsScreen: React.FC = () => {
  const navigation = useNavigation<ProductsScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const {products, status, error} = useAppSelector(state => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const renderItem: ListRenderItem<Product> = ({item}) => (
    <ProductItem
      onPress={() => {
        navigation.navigate('ProductDetails', {productId: item.id});
      }}>
      <ProductName>{item.name}</ProductName>
      <ProductPrice>${item.price}</ProductPrice>
    </ProductItem>
  );

  return (
    <Container>
      <Title>Products</Title>
      {status === 'loading' && <Text>Loading...</Text>}
      {status === 'failed' && <Text>Error: {error}</Text>}
      {status === 'succeeded' && (
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      )}
      <View style={{marginTop: 20}}>
        <Button
          title="Go to Checkout"
          onPress={() => navigation.navigate('Checkout')}
        />
      </View>
    </Container>
  );
};

export default ProductsScreen;
