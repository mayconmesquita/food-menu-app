import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/core';
import { ParamListBase } from '@react-navigation/native';
import { colors } from '../../styles/theme';
import BottomBar from '../../components/bottom-bar';
import ProductList from '../../components/product-list';
import { formatPrice } from '../../helpers/format-price';
import { productBatchAdded } from '../../store/products';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { mockProducts } from '../../helpers/mock-product';
import { Product } from '../../interfaces/product';
import {
  cartItemAdded,
  cartItemRemoved,
  getCartSubtotal,
  getCartItemsCount,
} from '../../store/cart';

interface Navigation {
  navigation: NavigationProp<ParamListBase>;
}

const ITEMS_PER_BATCH = 10;
const BATCH_LIMIT = 5;

const MenuScreen = ({ navigation }: Navigation) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products);
  const cartItems = useAppSelector(state => state.cart);
  const cartSubtotal = useAppSelector(getCartSubtotal);
  const cartItemsCount = useAppSelector(getCartItemsCount);

  useEffect(() => {
    dispatch(productBatchAdded(mockProducts(ITEMS_PER_BATCH)));
  }, []);

  const onAddProduct = (product: Product) => {
    dispatch(cartItemAdded(product));
  };

  const onRemoveProduct = (product: Product) => {
    dispatch(cartItemRemoved(product));
  };

  /* istanbul ignore next */
  const loadMore = () => {
    if (products.page < BATCH_LIMIT) {
      dispatch(productBatchAdded(mockProducts(ITEMS_PER_BATCH)));
    }
  };

  return (
    <View style={styles.container}>
      <ProductList
        products={products.data}
        cartItems={cartItems.products}
        onAdd={onAddProduct}
        onRemove={onRemoveProduct}
        variant="menu"
        onEndReached={loadMore}
      />

      <BottomBar
        title={`Subtotal: ${formatPrice('$', cartSubtotal)}`}
        subtitle={`You order (${cartItemsCount})`}
        btnText="Continue"
        btnOnPress={() => navigation.navigate('Cart')}
        btnEnabled={cartItemsCount > 0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGray,
  },
});

export default MenuScreen;
