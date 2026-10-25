import { useContext } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../constants/colors";
import { TextInput, useTheme } from "react-native-paper";

// Emoji button, text field, attachment button and send button.
export default function MessageInput({
  value,
  onChangeText,
  onFocus,
  onEmojiPress,
  onAttachPress,
  onSend,
  isSending,
}) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.emojiButton} onPress={onEmojiPress}>
        <Ionicons name="happy-outline" size={30} color={theme.colors.primary} />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          multiline
          right={<TextInput.Icon icon="paperclip" onPress={onAttachPress} />}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.sendButton,
          { backgroundColor: theme.colors.primaryContainer },
        ]}
        onPress={onSend}
        disabled={isSending}
      >
        {isSending ? (
          <ActivityIndicator color={theme.colors.onPrimaryContainer} />
        ) : (
          <Ionicons
            name="send"
            size={20}
            color={theme.colors.onPrimaryContainer}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  emojiButton: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    borderColor: "#ccc",
    borderRadius: 20,
  },
  input: {
    flex: 1,
    maxHeight: 100,
  },
  attachButton: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  sendButton: {
    width: 40,
    height: 40,
    marginLeft: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
