import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";
import { useIsFocused } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import { formatDuration } from "../../utils/date";

// Only one audio message plays at a time: starting one pauses the other.
let currentlyPlaying = null;

export default function AudioPlayer({ uri }) {
  const isFocused = useIsFocused();
  const soundRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  // Load the audio, and unload it when the message disappears
  useEffect(() => {
    let isActive = true;

    function handleStatusUpdate(status) {
      if (!status.isLoaded) return;
      setPosition(status.positionMillis);
      setDuration(status.durationMillis ?? 0);
      setIsPlaying(status.isPlaying);
      if (status.didJustFinish) soundRef.current?.stopAsync(); // rewind
    }

    async function loadSound() {
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: false },
        handleStatusUpdate,
      );
      if (isActive) {
        soundRef.current = sound;
      } else {
        sound.unloadAsync();
      }
    }

    loadSound().catch((error) => console.log(error));

    return () => {
      isActive = false;
      const sound = soundRef.current;
      if (sound) {
        sound.unloadAsync();
        if (currentlyPlaying === sound) currentlyPlaying = null;
      }
      soundRef.current = null;
    };
  }, [uri]);

  // Stop playing when leaving the screen
  useEffect(() => {
    if (!isFocused) soundRef.current?.stopAsync();
  }, [isFocused]);

  async function togglePlayback() {
    const sound = soundRef.current;
    if (!sound) return;

    try {
      if (isPlaying) {
        await sound.pauseAsync();
        return;
      }
      if (currentlyPlaying && currentlyPlaying !== sound) {
        await currentlyPlaying.pauseAsync();
      }
      currentlyPlaying = sound;
      await sound.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={togglePlayback}>
        <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="#fff" />
      </TouchableOpacity>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={(value) => soundRef.current?.setPositionAsync(value)}
        minimumTrackTintColor="#fff"
        thumbTintColor="#fff"
      />

      <Text style={[styles.time]}>
        {formatDuration(position)} / {formatDuration(duration)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    minWidth: 200,
    maxWidth: "100%",
  },
  slider: { flex: 1, marginHorizontal: 10 },
  time: { fontSize: 12 },
});
