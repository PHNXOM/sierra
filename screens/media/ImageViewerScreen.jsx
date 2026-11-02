import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function ImageViewerScreen({ route }) {
  const { mediaURL } = route.params;
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {mediaURL ? (
        <Image
          source={{ uri: mediaURL }}
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <Text style={{ color: theme.colors.outline }}>No Profile Photo</Text>
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
});
