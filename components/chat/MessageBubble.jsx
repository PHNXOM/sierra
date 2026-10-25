import { StyleSheet, View } from "react-native";
import { formatTime } from "../../utils/date";
import MessageMedia from "./MessageMedia";
import { Avatar, Text, useTheme } from "react-native-paper";

const DEFAULT_AVATAR = require("../../assets/image/user.png");

export default function MessageBubble({ message, isOwnMessage, avatarURI }) {
  const showUnreadMarker = !isOwnMessage && !message.isRead;
  const theme = useTheme();

  return (
    <View style={[styles.row, isOwnMessage ? styles.ownRow : styles.otherRow]}>
      {!isOwnMessage && (
        <Avatar.Image
          source={avatarURI ? { uri: avatarURI } : DEFAULT_AVATAR}
          size={40}
          style={styles.avatar}
        />
      )}

      <View
        style={[
          styles.bubble,
          {
            backgroundColor: isOwnMessage
              ? theme.colors.surfaceVariant
              : theme.colors.primaryContainer,
          },
        ]}
      >
        <MessageMedia message={message} />
        {!!message.message && (
          <Text
            style={{
              color: isOwnMessage
                ? theme.colors.onSurfaceVariant
                : theme.colors.onPrimaryContainer,
            }}
            variant="bodyLarge"
          >
            {message.message}
          </Text>
        )}
        {showUnreadMarker && <View style={styles.unreadMarker} />}
        <Text
          style={{
            color: theme.colors.outline,
            alignSelf: "flex-end",
          }}
          variant="labelSmall"
        >
          {formatTime(message.sentAt)}
        </Text>
      </View>

      {isOwnMessage && (
        <Avatar.Image
          source={avatarURI ? { uri: avatarURI } : DEFAULT_AVATAR}
          size={40}
          style={styles.avatar}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "flex-start", marginBottom: 15 },
  ownRow: { justifyContent: "flex-end" },
  otherRow: { justifyContent: "flex-start" },
  avatar: { marginHorizontal: 8 },
  bubble: { maxWidth: "75%", padding: 10, borderRadius: 15 },
  unreadMarker: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "green",
  },
});
