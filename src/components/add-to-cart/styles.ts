/* istanbul ignore file */
import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    width: 84,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '15',
    justifyContent: 'center',
  },
  containerSelected: {
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
  },
  buttonOuter: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    width: 28,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.primary,
  },
  removeBtnIcon: {
    color: colors.white,
    fontSize: 18,
    marginTop: Platform.OS === 'android' ? 2 : 0,
  },
  addBtnIcon: {
    color: colors.white,
    fontSize: 18,
  },
  counter: {
    color: colors.white,
    fontSize: 15,
  },
});
