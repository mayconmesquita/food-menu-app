import React from 'react';
import { View, Text, FlatList } from 'react-native';
import AddToCart from '../../components/add-to-cart';
import { formatPrice } from '../../helpers/format-price';
import { CartItems } from '../../interfaces/cart';
import { Product } from '../../interfaces/product';
import { styles } from './styles';

interface Props {
  products: Product[];
  cartItems: CartItems;
  variant: 'menu' | 'cart';
  onAdd: (product: Product) => void;
  onRemove: (product: Product) => void;
  onEndReached?: () => void;
}

const ProductList = (props: Props) => {
  const renderItem = ({ item }: { item: Product }) => {
    const { id, name, price } = item;

    const productPrice =
      props.variant === 'cart' && props.cartItems[id]
        ? formatPrice('$', props.cartItems[id].subtotal)
        : formatPrice('$', price);

    const containerVariant =
      props.variant === 'menu' ? styles.solidContainer : styles.lightContainer;

    return (
      <View style={[styles.itemContainer, containerVariant]}>
        <View style={styles.leftContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.price}>{productPrice}</Text>
        </View>

        <View style={styles.rightContainer}>
          <AddToCart
            counter={props.cartItems?.[id]?.quantity}
            onAdd={() => props.onAdd(item)}
            onRemove={() => props.onRemove(item)}
          />
        </View>
      </View>
    );
  };

  const keyExtractor = ({ id }: Product, index: number) => {
    return `item-${id || index}`;
  };

  return (
    <FlatList
      data={props.products || []}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.container}
      maxToRenderPerBatch={10}
      initialNumToRender={10}
      onEndReachedThreshold={0.3}
      onEndReached={props.onEndReached}
    />
  );
};

export default ProductList;
