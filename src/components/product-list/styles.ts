import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../styles/theme';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 88,
  },
  itemContainer: {
    flex: 4,
    height: 80,
    width: screenWidth - 26,
    backgroundColor: colors.white,
    marginHorizontal: 4,
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
