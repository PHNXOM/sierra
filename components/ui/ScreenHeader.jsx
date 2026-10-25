import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

// Big title at the top of a tab screen, with optional buttons on the right.
export default function ScreenHeader({ title, right, style }) {
  const theme = useTheme();

  return (
    <View style={[styles.header, style]}>
      <Text variant="titleLarge">{title}</Text>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
});
