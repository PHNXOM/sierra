import { createContext, useEffect, useRef } from "react";
import { Audio } from "expo-av";

export const SoundContext = createContext();

export function SoundProvider({ children }) {
  const sounds = useRef({ sent: null, received: null });

  // load both sounds once
  useEffect(() => {
    async function loadSounds() {
      try {
        const received = await Audio.Sound.createAsync(
          require("../assets/audio/message_received.mp3"),
        );
        const sent = await Audio.Sound.createAsync(
          require("../assets/audio/message_sent.mp3"),
        );
        sounds.current = { received: received.sound, sent: sent.sound };
      } catch (error) {
        console.error("Failed to load sounds", error);
      }
    }

    loadSounds();

    return () => {
      sounds.current.received?.unloadAsync();
      sounds.current.sent?.unloadAsync();
    };
  }, []);

  // play sound specified by name
  const play = async (name) => {
    try {
      await sounds.current[name]?.replayAsync();
    } catch (error) {
      console.log("Could not play sound", error);
    }
  };

  const value = {
    playMessageSentSound: () => play("sent"),
    playMessageReceivedSound: () => play("received"),
  };

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}
