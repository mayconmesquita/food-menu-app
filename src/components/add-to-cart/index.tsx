import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '../../styles/theme';
import { styles } from './styles';

interface Props {
  counter: number;
  onAdd: (counter: number) => void;
  onRemove: (counter: number) => void;
}

const AddToCart = (props: Props) => {
  const [counter, setCounter] = useState(props.counter || 0);

  const add = () => {
    setCounter(counter + 1);
    props.onAdd?.(counter + 1);
  };

  const remove = () => {
    if (!counter) return;
    setCounter(counter - 1);
    props.onRemove?.(counter - 1);
  };

  return (
    <>
      {!counter ? (
        <View style={styles.buttonOuter}>
          <Pressable
            onPress={add}
            style={styles.container}
            android_ripple={{ color: colors.rippleColor }}
          >
            <Text style={styles.addBtnText}>ADD</Text>
          </Pressable>
        </View>
      ) : (
        <View style={[styles.container, styles.containerSelected]}>
          <Pressable style={styles.button} onPress={remove}>
            <Text style={styles.removeBtnIcon}>—</Text>
          </Pressable>

          <Text style={styles.counter}>{counter}</Text>

          <Pressable style={styles.button} onPress={add}>
            <Text style={styles.addBtnIcon}>+</Text>
          </Pressable>
        </View>
      )}
    </>
  );
};

export default AddToCart;
