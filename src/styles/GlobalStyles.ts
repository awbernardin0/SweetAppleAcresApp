import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #fff;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const ProductList = styled.FlatList`
  margin-top: 16px;
`;

export const ProductItem = styled.TouchableOpacity`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

export const ProductName = styled.Text`
  font-size: 18px;
`;

export const ProductPrice = styled.Text`
  font-size: 16px;
  color: #888;
`;
