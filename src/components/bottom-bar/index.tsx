import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '../../styles/theme';
import { styles } from './styles';

interface Props {
  title: string;
  subtitle?: string;
  bgColor?: string;
  btnText?: string;
  btnEnabled?: boolean;
  btnOnPress?: () => void;
}

const BottomBar = (props: Props) => {
  const bgColor = props.bgColor ? { backgroundColor: colors.lightGray } : null;

  return (
    <View style={[styles.container, bgColor]}>
      <View style={styles.leftCol}>
        <Text style={styles.title}>{props.title}</Text>
        {!!props.subtitle && (
          <Text style={styles.subtitle}>{props.subtitle}</Text>
        )}
      </View>

      <View style={styles.rightCol}>
        <View style={styles.buttonOuter}>
          {!!props.btnEnabled && (
            <Pressable
              onPress={props.btnOnPress}
              style={styles.button}
              android_ripple={{ color: colors.rippleColor }}
            >
              <Text style={styles.buttonText}>{props.btnText}</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default BottomBar;
