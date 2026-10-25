import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

function MenuOption({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <Ionicons name={icon} size={30} />
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}

// The "Audio / Gallery" choice shown above the input bar.
export default function AttachmentMenu({ onPickAudio, onPickGallery }) {
  return (
    <View style={styles.container}>
      <MenuOption icon="musical-notes" label="Audio" onPress={onPickAudio} />
      <MenuOption icon="image" label="Gallery" onPress={onPickGallery} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 50,
  },
  option: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
});
