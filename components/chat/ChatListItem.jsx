import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../constants/colors";
import { Avatar, Text, useTheme } from "react-native-paper";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const DEFAULT_AVATAR = require("../../assets/image/user.png");

const MEDIA_ICONS = {
  image: "image",
  video: "videocam",
  audio: "musical-notes",
};

export default function ChatListItem({
  otherUser,
  latestMessage,
  isSentByMe,
  onPress,
}) {
  const theme = useTheme();
  const { typingUsers } = useContext(ChatContext);

  const isTyping = typingUsers[otherUser.id];

  function renderPreview() {
    if (isTyping) return <Text style={styles.typing}>typing...</Text>;

    return (
      <>
        <Ionicons
          name={isSentByMe ? "arrow-back" : "arrow-forward"}
          size={16}
          color={theme.colors.onSurfaceVariant}
          style={styles.arrow}
        />
        {latestMessage.message ? (
          <Text
            numberOfLines={1}
            variant="bodyMedium"
            style={{
              color: theme.colors.onSurfaceVariant,
              flex: 1,
            }}
          >
            {latestMessage.message}
          </Text>
        ) : (
          <Ionicons
            name={MEDIA_ICONS[latestMessage.mediaType]}
            size={16}
            color={COLORS.muted}
          />
        )}
      </>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Avatar.Image
        source={
          otherUser.profilePhoto
            ? { uri: otherUser.profilePhoto }
            : DEFAULT_AVATAR
        }
        size={56}
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        <Text numberOfLines={1} variant="titleMedium">
          {otherUser.username}
        </Text>
        <View style={styles.previewRow}>{renderPreview()}</View>

        {latestMessage.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text variant="labelLarge" style={{ color: "#fff" }}>
              {latestMessage.unreadCount > 99
                ? "99+"
                : latestMessage.unreadCount}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  avatar: { marginRight: 15 },
  textContainer: { flex: 1, justifyContent: "center" },
  name: { fontSize: 18, fontWeight: "bold" },
  previewRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  arrow: { marginRight: 4 },
  typing: { color: COLORS.typing },
  unreadBadge: {
    position: "absolute",
    top: 2,
    right: 15,
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
});
