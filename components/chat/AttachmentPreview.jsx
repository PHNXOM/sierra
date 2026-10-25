import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../constants/colors";
import VideoThumbnail from "../media/VideoThumbnail";

function RemoveButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.removeButton} onPress={onPress}>
      <Text style={styles.removeText}>✖</Text>
    </TouchableOpacity>
  );
}

// Preview of the attachment the user is about to send.
export default function AttachmentPreview({ attachment, onRemove, onPlayVideo }) {
  if (!attachment) return null;
  const { type, uri, name } = attachment;

  function renderPreview() {
    switch (type) {
      case "image":
        return <Image source={{ uri }} style={styles.image} />;
      case "video":
        return (
          <TouchableOpacity style={styles.fill} onPress={onPlayVideo}>
            <VideoThumbnail uri={uri} style={styles.fill} />
          </TouchableOpacity>
        );
      case "audio":
        return (
          <View style={styles.audio}>
            <Ionicons name="musical-notes" size={30} />
            <Text style={styles.audioName}>{name}</Text>
          </View>
        );
      default:
        return null;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {renderPreview()}
        <RemoveButton onPress={onRemove} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  box: { width: 150, height: 150 },
  fill: { width: "100%", height: "100%", borderRadius: 8 },
  image: { width: "100%", height: "100%", borderRadius: 8 },
  audio: {
    width: "100%",
    height: "100%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  audioName: { marginTop: 10, color: "#575757" },
  removeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: COLORS.dangerSoft,
    justifyContent: "center",
    alignItems: "center",
  },
  removeText: { color: COLORS.white },
});
