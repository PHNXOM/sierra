import { useContext, useState } from "react";
import { Alert, Image, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { ROUTES } from "../../navigation/routes";
import ScreenBackground from "../../components/ui/ScreenBackground";
import {
  Dialog,
  Divider,
  List,
  Portal,
  Switch,
  Text,
  useTheme,
} from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import ScreenHeader from "../../components/ui/ScreenHeader";
import { AppContext } from "../../context/AppContext";

export default function SettingsScreen({ navigation }) {
  const { showAlert, dismissAlert, toggleTheme } = useContext(AppContext);
  const { logout, deleteProfile } = useContext(AuthContext);
  const [showAboutDialog, setShowAboutDialog] = useState(false);

  const theme = useTheme();
  const isDark = theme.dark;

  function confirmLogout() {
    showAlert("Confirm Logout", "Are you sure you want to logout?", [
      { title: "Cancel", onPress: dismissAlert },
      { title: "Logout", onPress: logout },
    ]);
  }

  async function handleDeleteProfile() {
    try {
      await deleteProfile();
    } catch (error) {
      Alert.alert("Error", "Unable to delete your profile. Please try again.");
    }
  }

  // Two confirmations, because this can't be undone
  function confirmDeleteProfile() {
    showAlert(
      "Delete Profile",
      "Are you sure you want to delete your profile and all data related to it?",
      [
        { title: "Cancel", onPress: dismissAlert },
        {
          title: "Yes",
          onPress: () =>
            showAlert("Warning", "This action cannot be undone", [
              { title: "Cancel", onPress: dismissAlert },
              {
                title: "I Understand",
                onPress: handleDeleteProfile,
              },
            ]),
        },
      ],
    );
  }

  return (
    <ScreenBackground>
      <Portal>
        <Dialog
          visible={showAboutDialog}
          onDismiss={() => setShowAboutDialog(false)}
        >
          <Dialog.Title style={{ textAlign: "center" }}>About</Dialog.Title>
          <Dialog.Content>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../assets/icon.png")}
                style={{
                  width: 100,
                  height: 100,
                }}
              />
              <Text
                style={{ fontFamily: "Orbitron_400Regular", marginTop: 8 }}
                variant="bodyLarge"
              >
                Sierra
              </Text>
              <Text
                variant="bodyMedium"
                style={{ textAlign: "center", marginTop: 16 }}
              >
                Sierra is a cross-platform real-time multimedia chat application
                integrated with FCM and custom backend
              </Text>
              <Text
                variant="bodyMedium"
                style={{ textAlign: "center", marginTop: 16 }}
              >
                Designed by Om Kumar {"\n"}
                ©2026
              </Text>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>

      <ScrollView>
        <ScreenHeader title={"Settings"} />

        <List.Section>
          <List.Subheader>General</List.Subheader>

          <List.Item
            title="Dark Mode"
            description="Toggle dark mode"
            right={() => <Switch value={isDark} onValueChange={toggleTheme} />}
          />

          <List.Item
            title="Profile Details"
            description="View and Edit your personal details"
            onPress={() => navigation.navigate(ROUTES.MY_PROFILE)}
          />
          <List.Item
            title="Logout"
            onPress={confirmLogout}
            description="End current session"
          />
          <List.Item
            title="Delete Profile"
            description="Erase all user chats and data"
            onPress={confirmDeleteProfile}
          />
        </List.Section>

        <Divider />
        <List.Section>
          <List.Subheader>Support</List.Subheader>
          <List.Item
            title="Help & Feedback"
            description="View help articles or contact support"
          />
        </List.Section>

        <Divider />
        <List.Section>
          <List.Subheader>App</List.Subheader>
          <List.Item
            title="About"
            description="View app description"
            onPress={() => setShowAboutDialog(true)}
          />

          <List.Item title="Version" description="1.7.6" />
          <List.Item
            title="Check for Updates"
            description="Check if a newer version is available"
          />
          <List.Item
            title="Rate on Google Play"
            description="Consider rating the app if you like it :)"
          />
        </List.Section>
      </ScrollView>
    </ScreenBackground>
  );
}
