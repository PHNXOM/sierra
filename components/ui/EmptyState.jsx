import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function EmptyState({ message }) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={{ color: theme.colors.outline }}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
