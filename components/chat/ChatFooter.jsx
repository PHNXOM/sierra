import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

// The bar at the bottom of the chat screen (input, attachments, emoji picker).
export default function ChatFooter({ children }) {
  const theme = useTheme();

  return (
    <View style={[styles.footer, { backgroundColor: theme.colors.surface }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
});
