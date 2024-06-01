import React, {useEffect} from 'react';
import {Text, ActivityIndicator, Button} from 'react-native';
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  fetchProductDetails,
  resetProductDetails,
} from '../store/slices/productDetailsSlice';
import {addToCart} from '../store/slices/cartSlice';
import {RootStackParamList} from '../AppNavigator';
import {Container, Title} from '../styles/GlobalStyles';

type ProductDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetails'
>;

const ProductDetailsScreen: React.FC = () => {
  const route = useRoute<ProductDetailsScreenRouteProp>();
  const {productId} = route.params;
  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  const {product, status, error} = useAppSelector(
    state => state.productDetails,
  );

  useEffect(() => {
    const fetchDetails = () => {
      dispatch(fetchProductDetails(productId));
    };

    const unsubscribe = navigation.addListener('focus', fetchDetails);

    return () => {
      unsubscribe();
      dispatch(resetProductDetails());
    };
  }, [dispatch, productId, navigation]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        }),
      );
    }
  };

  if (status === 'loading') {
    return (
      <Container>
        <ActivityIndicator size="large" color="#0000ff" />
      </Container>
    );
  }

  if (status === 'failed') {
    return (
      <Container>
        <Title>Error</Title>
        <Text>{error}</Text>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <Title>Product Not Found</Title>
        <Text>The product with the specified ID could not be found.</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Product Details</Title>
      <Text>Name: {product.name}</Text>
      <Text>Price: ${product.price}</Text>
      <Text>Description: {product.description}</Text>
      <Text>Rating: {product.rating}</Text>
      <Text>
        Availability: {product.isAvailable ? 'Available' : 'Out of Stock'}
      </Text>
      <Button title="Add to Cart" onPress={handleAddToCart} />
    </Container>
  );
};

export default ProductDetailsScreen;
