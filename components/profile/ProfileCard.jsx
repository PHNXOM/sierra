import { TouchableOpacity } from "react-native";
import { Avatar, Card, IconButton, Text, useTheme } from "react-native-paper";

const DEFAULT_AVATAR = require("../../assets/image/user.png");

export default function ProfileCard({
  user,
  actionIcon,
  onActionPress,
  onAvatarPress,
}) {
  const theme = useTheme();

  return (
    <Card
      contentStyle={{ alignItems: "center" }}
      style={{ padding: 20 }}
      mode="elevated"
    >
      <TouchableOpacity onPress={onAvatarPress}>
        <Avatar.Image
          source={
            user.profilePhoto ? { uri: user.profilePhoto } : DEFAULT_AVATAR
          }
          size={120}
          style={{ marginBottom: 15 }}
        />
      </TouchableOpacity>

      <Text variant="displaySmall" style={{ marginBottom: 10 }}>
        {user.username}
      </Text>
      <Text
        style={{ color: theme.colors.onSurfaceVariant, marginBottom: 15 }}
        variant="bodyLarge"
      >
        {user.bio}
      </Text>
      <Text
        style={{ marginBottom: 15, color: theme.colors.outline }}
        variant="bodyMedium"
      >
        {user.phone}
      </Text>

      <IconButton
        icon={actionIcon}
        size={40}
        onPress={onActionPress}
        iconColor={theme.colors.primary}
      />
    </Card>
  );
}
