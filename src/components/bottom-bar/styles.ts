import { StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { colors } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 64 + getBottomSpace() * 0.9,
    paddingBottom: getBottomSpace() * 0.5,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderTopColor: colors.lightGray,
    borderTopWidth: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
  },
  leftCol: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  rightCol: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  buttonOuter: {
    borderRadius: 8,
    overflow: "hidden",
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 24,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
  },
  subtitle: {
    fontSize: 16,
    color: colors.darkGray,
  },
});
