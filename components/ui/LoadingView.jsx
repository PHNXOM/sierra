import { ActivityIndicator, StyleSheet, View } from "react-native";
import { COLORS } from "../../constants/colors";
import { Text, useTheme } from "react-native-paper";

export default function LoadingView({ message }) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text style={{ marginTop: 10, color: theme.colors.outline }}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
