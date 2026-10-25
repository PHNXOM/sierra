import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

export async function pickFromGallery(
  mediaTypes = ImagePicker.MediaTypeOptions.All,
) {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    Alert.alert(
      "Permissions denied",
      "Permission to access image is required to proceed.",
    );
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    quality: 1,
    mediaTypes,
  });
  if (result.canceled) return null;

  const { type, uri, fileName: name } = result.assets[0];
  return { type, uri, name };
}

export const MEDIA_TYPES = ImagePicker.MediaTypeOptions;

export async function pickAudioFile() {
  try {
    const result = await DocumentPicker.getDocumentAsync({ type: "audio/*" });
    if (result.canceled) return null;

    const { uri, name } = result.assets[0];
    return { type: "audio", uri, name };
  } catch (error) {
    console.log(error);
    return null;
  }
}
