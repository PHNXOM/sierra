import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../navigation/routes";
import AudioPlayer from "../media/AudioPlayer";
import VideoThumbnail from "../media/VideoThumbnail";

// The image, video or audio attached to a message (renders nothing for text-only).
export default function MessageMedia({ message }) {
  const navigation = useNavigation();
  const { mediaURL, mediaType } = message;

  if (!mediaURL) return null;

  switch (mediaType) {
    case "image":
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.IMAGE_VIEWER, { mediaURL })}
        >
          <Image source={{ uri: mediaURL }} style={styles.media} />
        </TouchableOpacity>
      );
    case "video":
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.VIDEO_PLAYER, { mediaURL })}
        >
          <VideoThumbnail uri={mediaURL} style={styles.media} />
        </TouchableOpacity>
      );
    case "audio":
      return <AudioPlayer uri={mediaURL} />;
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  media: {
    maxWidth: "100%",
    minWidth: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
});
