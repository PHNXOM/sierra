import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { generateThumbnail } from "../../utils/media";

// Preview image of a video with a play icon on top. Size comes from `style`.
export default function VideoThumbnail({ uri, style }) {
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    const getThumb = async () => {
      try {
        const thumbnail = await generateThumbnail(uri);
        setThumbnail(thumbnail);
      } catch (error) {
        console.log(error);
      }
    };

    if (uri) getThumb();
  }, [uri]);

  return (
    <View style={[styles.container, style]}>
      {thumbnail && (
        <Image source={{ uri: thumbnail }} style={StyleSheet.absoluteFill} />
      )}
      <Ionicons name="play-circle" size={40} color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#222",
  },
});
