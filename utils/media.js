import { getThumbnailAsync } from "expo-video-thumbnails";

const AUDIO_MIME_TYPES = {
  mp3: "audio/mpeg",
  wav: "audio/wav",
  ogg: "audio/ogg",
  m4a: "audio/mp4",
};

export const getMimeType = (type, extension) => {
  return type === "audio"
    ? getAudioMimeType(extension)
    : `${type}/${extension}`;
};

export const getAudioMimeType = (extension) =>
  AUDIO_MIME_TYPES[extension.toLowerCase()] ?? "audio/*";

export const getFileExtension = (uri) => uri.split(".").pop();

// Returns the thumbnail uri of a video, or null if it can't be generated.
export async function generateThumbnail(videoUri) {
  try {
    const { uri } = await getThumbnailAsync(videoUri, { time: 1500 });
    return uri;
  } catch (error) {
    console.log(error);
    return null;
  }
}
