import { useRef, useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { ResizeMode, Video } from "expo-av";
import Slider from "@react-native-community/slider";
import { formatDuration } from "../../utils/date";

export default function VideoPlayerScreen({ route }) {
  const { mediaURL } = route.params;
  const videoRef = useRef(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);

  function handlePlaybackStatusUpdate(status) {
    if (!status?.isLoaded) return;
    setPosition(status.positionMillis);
    setDuration(status.durationMillis || 1);
  }

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: mediaURL }}
        style={StyleSheet.absoluteFill}
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        shouldPlay
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />

      <View style={styles.sliderRow}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingComplete={(value) => videoRef.current?.setPositionAsync(value)}
          minimumTrackTintColor="#1DB954"
          maximumTrackTintColor="#FFFFFF"
          thumbTintColor="#1DB954"
        />
        <Text style={styles.time}>
          {formatDuration(position)} / {formatDuration(duration)}
        </Text>
      </View>

      <StatusBar backgroundColor="black" barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  sliderRow: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  slider: { flex: 1 },
  time: { fontSize: 12, color: "#ccc", textAlign: "center" },
});
