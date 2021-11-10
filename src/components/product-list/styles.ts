/* istanbul ignore file */
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../../styles/theme';

const screenWidth = Dimensions.get('window').width;
const containerScrollOffset = Platform.select({ web: 18, native: 0 }) || 0;
const itemScrollOffset = Platform.select({ web: 48, native: 28 }) || 28;

export const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 88,
    alignItems: 'center',
    width: screenWidth - containerScrollOffset,
  },
  itemContainer: {
    width: screenWidth - itemScrollOffset,
    height: 80,
    backgroundColor: colors.white,
    marginBottom: 10,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
  },
  solidContainer: {
    backgroundColor: colors.white,
  },
  lightContainer: {
    backgroundColor: 'transparent',
    borderColor: colors.gray,
    borderBottomWidth: 1,
    borderRadius: 0,
  },
  name: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 2,
  },
  price: {
    fontSize: 15,
    color: colors.darkGray,
  },
  leftContainer: {
    flex: 3,
    paddingRight: 24,
  },
  rightContainer: {
    flex: 1,
    width: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
