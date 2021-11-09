import React from "react";
import { View, StyleSheet } from "react-native";
import faker from "faker";
import { NavigationProp } from "@react-navigation/core";
import { ParamListBase } from "@react-navigation/native";
import { colors } from "../../styles/theme";
import BottomBar from "../../components/bottom-bar";
import ProductList, { Item } from "../../components/product-list";
import { formatPrice } from "../../helpers/format-price";

interface Navigation {
  navigation: NavigationProp<ParamListBase>;
}

const CartScreen = ({ navigation }: Navigation) => {
  const mockItems = (length: number): Item[] => {
    return new Array(length).fill(null).map((elm, index) => ({
      id: ++index,
      name: faker.fake("{{commerce.productName}}"),
      price: Number(faker.fake("{{commerce.price}}")),
    }));
  };

  const items = mockItems(50);

  const onAddProduct = (itemId: number) => {};
  const onRemoveProduct = (itemId: number) => {};

  return (
    <View style={styles.container}>
      <ProductList
        items={items}
        onAdd={onAddProduct}
        onRemove={onRemoveProduct}
        variant="light"
      />

      <BottomBar
        title={`Subtotal: ${formatPrice("$", 500.0)}`}
        subtitle={`You order (3)`}
        btnText="Checkout"
        btnOnPress={() => {}}
        bgColor={colors.lightGray}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
});

export default CartScreen;
