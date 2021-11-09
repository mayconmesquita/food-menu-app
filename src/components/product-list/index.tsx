import React from 'react';
import { View, Text, FlatList } from 'react-native';
import AddToCart from '../../components/add-to-cart';
import { styles } from './styles';
import { formatPrice } from '../../helpers/format-price';

export interface Item {
  id: number;
  name: string;
  price: number;
}

interface Props {
  items: Item[];
  variant: 'solid' | 'light';
  onAdd: (itemId: number) => void;
  onRemove: (itemId: number) => void;
}

const ProductList = (props: Props) => {
  const renderItem = ({ item }: { item: Item }) => {
    const { name, price } = item;

    const containerVariant =
      props.variant === 'solid' ? styles.solidContainer : styles.lightContainer;

    return (
      <View style={[styles.itemContainer, containerVariant]}>
        <View style={styles.leftContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.price}>{formatPrice('$', price)}</Text>
        </View>

        <View style={styles.rightContainer}>
          <AddToCart
            counter={0}
            onAdd={props.onAdd}
            onRemove={props.onRemove}
          />
        </View>
      </View>
    );
  };

  const keyExtractor = ({ id }: Item, index: number) => {
    return `item-${id || index}`;
  };

  return (
    <FlatList
      data={props.items || []}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.container}
      maxToRenderPerBatch={10}
    />
  );
};

export default ProductList;
