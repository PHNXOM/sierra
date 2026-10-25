import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/colors";

export default function Button({
  title,
  onPress,
  variant = "primary", // "primary" | "secondary"
  loading = false,
  disabled = false,
  style,
}) {
  const isSecondary = variant === "secondary";

  return (
    <TouchableOpacity
      style={[styles.button, isSecondary && styles.secondaryButton, style]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        <Text style={[styles.text, isSecondary && styles.secondaryText]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  secondaryButton: {
    backgroundColor: "#ccc",
    borderWidth: 1,
    borderColor: "#95a5a6",
  },
  text: {
    color: COLORS.white,
    fontWeight: "600",
    textAlign: "center",
  },
  secondaryText: {
    color: "#333",
  },
});
