import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ChatContext } from "../../context/ChatContext";
import { ROUTES } from "../../navigation/routes";
import { getUserById } from "../../services/userService";
import ProfileCard from "../../components/profile/ProfileCard";
import LoadingView from "../../components/ui/LoadingView";
import ScreenBackground from "../../components/ui/ScreenBackground";

export default function ProfileScreen({ route, navigation }) {
  const { userId } = route.params;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        setProfile(await getUserById(userId));
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [userId]);

  function openChat() {
    navigation.navigate(ROUTES.CHAT, { otherUser: profile });
  }

  function openPhoto() {
    navigation.navigate(ROUTES.IMAGE_VIEWER, {
      mediaURL: profile.profilePhoto,
      username: profile.username,
    });
  }

  return (
    <ScreenBackground style={styles.container}>
      {loading ? (
        <LoadingView message="Loading Details..." />
      ) : (
        profile && (
          <ProfileCard
            user={profile}
            actionIcon="chat-outline"
            onActionPress={openChat}
            onAvatarPress={openPhoto}
          />
        )
      )}
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, justifyContent: "center" },
});
