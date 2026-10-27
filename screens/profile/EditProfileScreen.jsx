import { useContext, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { MEDIA_TYPES, pickFromGallery } from "../../services/mediaPicker";
import { updateProfile } from "../../services/userService";
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import ScreenBackground from "../../components/ui/ScreenBackground";
const DEFAULT_AVATAR = require("../../assets/image/user.png");

export default function EditProfileScreen({ navigation }) {
  const { user, refreshUser } = useContext(AuthContext);
  const theme = useTheme();

  const [bio, setBio] = useState(user.bio ?? "");
  const [newPhotoURI, setNewPhotoURI] = useState(null);
  const [photoURI, setPhotoURI] = useState(user.profilePhoto);
  const [loading, setLoading] = useState(false);

  async function handlePickPhoto() {
    const image = await pickFromGallery(MEDIA_TYPES.Images);
    if (image) {
      setNewPhotoURI(image.uri);
      setPhotoURI(image.uri);
    }
  }

  function handleRemovePhoto() {
    setNewPhotoURI(null);
    setPhotoURI("");
  }

  async function handleSave() {
    setLoading(true);
    try {
      await updateProfile({
        bio,
        photoURI: newPhotoURI,
        removePhoto: !photoURI,
      });
      await refreshUser();
      ToastAndroid.show("Profile updated successfully", ToastAndroid.LONG);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenBackground style={styles.container}>
      <Card
        contentStyle={{ alignItems: "center" }}
        style={{ padding: 20 }}
        mode="elevated"
      >
        <View style={{ marginBottom: 25 }}>
          <Avatar.Image
            source={photoURI ? { uri: photoURI } : DEFAULT_AVATAR}
            size={120}
          />
          <IconButton
            style={[styles.photoButton, styles.editButton]}
            onPress={handlePickPhoto}
            icon={"pencil"}
            mode="contained-tonal"
            iconColor={theme.colors.primary}
          />

          <IconButton
            style={[styles.photoButton, styles.removeButton]}
            onPress={handleRemovePhoto}
            icon={"delete"}
            mode="contained-tonal"
            iconColor={theme.colors.error}
          />
        </View>

        <View style={styles.bioContainer}>
          <Text variant="bodyLarge">Your Bio</Text>
          <TextInput
            mode="flat"
            style={[styles.bioInput]}
            placeholder="Enter bio"
            value={bio}
            onChangeText={setBio}
            multiline
          />
        </View>

        <Button
          mode="contained"
          style={{ marginBottom: 15, minWidth: "50%" }}
          onPress={handleSave}
        >
          {loading ? (
            <ActivityIndicator color={theme.colors.onPrimary} />
          ) : (
            "Update Profile"
          )}
        </Button>
        <Button
          mode="outlined"
          style={{ width: "50%" }}
          onPress={navigation.goBack}
        >
          Cancel
        </Button>
      </Card>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  photoButton: {
    position: "absolute",
    right: -10,
    opacity: 0.7,
  },
  editButton: { top: 0 },
  removeButton: { bottom: 0 },
  bioContainer: { width: "100%", marginBottom: 25 },
  bioInput: { maxHeight: 100 },
});
