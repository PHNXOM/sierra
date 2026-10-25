import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/colors";

export default function ImageViewerScreen({ route }) {
  const { mediaURL } = route.params;

  return (
    <View style={styles.container}>
      {mediaURL ? (
        <Image source={{ uri: mediaURL }} style={styles.image} resizeMode="contain" />
      ) : (
        <Text style={styles.empty}>No Profile Photo</Text>
      )}
      <StatusBar backgroundColor="black" barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  image: { flex: 1, width: "100%" },
  empty: { color: COLORS.muted },
});
