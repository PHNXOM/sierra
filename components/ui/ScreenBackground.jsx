import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "react-native-paper";

export default function ScreenBackground({ children, style }) {
  const theme = useTheme();
  const isDark = theme.dark;

  if (!isDark) {
    return (
      <LinearGradient
        colors={[
          "rgb(215, 236, 250)",
          "rgb(239, 239, 255)",
          "rgb(255, 235, 253)",
        ]}
        style={[styles.fill, style]}
      >
        {children}
      </LinearGradient>
    );
  }

  return (
    <View style={[styles.fill, { backgroundColor: "#000" }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
