import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '../../styles/theme';
import { styles } from './styles';

interface Props {
  counter: number;
  onAdd: () => void;
  onRemove: () => void;
}

const AddToCart = ({ counter, onAdd, onRemove }: Props) => {
  return (
    <>
      {!counter ? (
        <View style={styles.buttonOuter}>
          <Pressable
            onPress={onAdd}
            style={styles.container}
            android_ripple={{ color: colors.rippleColor }}
          >
            <Text style={styles.addBtnText}>ADD</Text>
          </Pressable>
        </View>
      ) : (
        <View style={[styles.container, styles.containerSelected]}>
          <Pressable style={styles.button} onPress={onRemove}>
            <Text style={styles.removeBtnIcon}>–</Text>
          </Pressable>

          <Text style={styles.counter}>{counter}</Text>

          <Pressable style={styles.button} onPress={onAdd}>
            <Text style={styles.addBtnIcon}>+</Text>
          </Pressable>
        </View>
      )}
    </>
  );
};

export default AddToCart;
