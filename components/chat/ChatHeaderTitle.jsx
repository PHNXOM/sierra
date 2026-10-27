import { StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/colors";
import { FONT_FAMILY } from "../../constants/config";
import { Avatar, Text, useTheme } from "react-native-paper";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const DEFAULT_AVATAR = require("../../assets/image/user.png");

// Avatar + username (+ "typing...") shown in the chat screen header.
export default function ChatHeaderTitle({ otherUser, onPress }) {
  const { typingUsers } = useContext(ChatContext);
  const theme = useTheme();

  const isTyping = typingUsers[otherUser.id];

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Avatar.Image
        source={
          otherUser.profilePhoto
            ? { uri: otherUser.profilePhoto }
            : DEFAULT_AVATAR
        }
        size={40}
      />
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.username,
            {
              color: theme.dark
                ? theme.colors.onBackground
                : theme.colors.onPrimary,
            },
          ]}
          variant="titleLarge"
        >
          {otherUser.username}
        </Text>
        {isTyping && <Text style={styles.typing}>typing...</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: { flexDirection: "row", alignItems: "center", marginLeft: 10 },
  username: { fontFamily: FONT_FAMILY },
  typing: { color: COLORS.typing, marginLeft: 10 },
});
