import { Image } from "react-native";

const DEFAULT_AVATAR = require("../../assets/image/user.png");

// Round profile picture with a default image when the user has none.
export default function Avatar({ uri, size = 50, style }) {
  return (
    <Image
      source={uri ? { uri } : DEFAULT_AVATAR}
      style={[{ width: size, height: size, borderRadius: size / 2 }, style]}
    />
  );
}
