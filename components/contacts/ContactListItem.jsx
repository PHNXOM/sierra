import { StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/colors";
import { Avatar, Text, useTheme } from "react-native-paper";

const DEFAULT_AVATAR = require("../../assets/image/user.png");

export default function ContactListItem({ contact, onPress }) {
  const theme = useTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Avatar.Image
        source={
          contact.profilePhoto ? { uri: contact.profilePhoto } : DEFAULT_AVATAR
        }
        size={56}
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        <Text numberOfLines={1} variant="titleMedium">
          {contact.username} ({contact.savedName})
        </Text>
        <Text
          numberOfLines={1}
          variant="bodyMedium"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          {contact.bio}
        </Text>
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
  bio: { fontSize: 14, color: COLORS.muted, marginTop: 3 },
});
