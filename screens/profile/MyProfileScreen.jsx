import { useContext } from "react";
import { StyleSheet } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { ROUTES } from "../../navigation/routes";
import ProfileCard from "../../components/profile/ProfileCard";
import ScreenBackground from "../../components/ui/ScreenBackground";

export default function MyProfileScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  return (
    <ScreenBackground style={styles.container}>
      <ProfileCard
        user={user}
        actionIcon={"circle-edit-outline"}
        onActionPress={() => navigation.navigate(ROUTES.EDIT_PROFILE)}
        onAvatarPress={() =>
          navigation.navigate(ROUTES.IMAGE_VIEWER, {
            mediaURL: user.profilePhoto,
            username: user.username,
          })
        }
      />
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
});
