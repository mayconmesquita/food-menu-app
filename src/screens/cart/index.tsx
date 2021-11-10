import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/core';
import { ParamListBase } from '@react-navigation/native';
import { colors } from '../../styles/theme';
import BottomBar from '../../components/bottom-bar';
import ProductList from '../../components/product-list';
import { formatPrice } from '../../helpers/format-price';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Product } from '../../interfaces/product';
import {
  cartItemAdded,
  cartItemRemoved,
  getCartProducts,
  getCartSubtotal,
  getCartItemsCount,
} from '../../store/cart';

interface Navigation {
  navigation: NavigationProp<ParamListBase>;
}

const CartScreen = ({ navigation }: Navigation) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getCartProducts);
  const cartItems = useAppSelector(state => state.cart);
  const cartSubtotal = useAppSelector(getCartSubtotal);
  const cartItemsCount = useAppSelector(getCartItemsCount);

  const onAddProduct = (product: Product) => {
    dispatch(cartItemAdded(product));
  };

  const onRemoveProduct = (product: Product) => {
    dispatch(cartItemRemoved(product));
  };

  return (
    <View style={styles.container}>
      {products.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        </View>
      ) : (
        <ProductList
          products={products}
          cartItems={cartItems.products}
          onAdd={onAddProduct}
          onRemove={onRemoveProduct}
          variant="cart"
        />
      )}

      <BottomBar
        title={`Subtotal: ${formatPrice('$', cartSubtotal)}`}
        subtitle={`You order (${cartItemsCount})`}
        btnText="Checkout"
        btnEnabled={products.length > 0}
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
  emptyCart: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 17,
    color: colors.darkGray,
  },
});

export default CartScreen;
