import { StyleSheet, Text } from "react-native";
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionSpecs,
} from "@react-navigation/stack";
import { FONT_FAMILY } from "../constants/config";
import HomeTabs from "./HomeTabs";
import { ROUTES } from "./routes";

import ChatScreen from "../screens/chats/ChatScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import MyProfileScreen from "../screens/profile/MyProfileScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import ImageViewerScreen from "../screens/media/ImageViewerScreen";
import VideoPlayerScreen from "../screens/media/VideoPlayerScreen";
import { useTheme } from "react-native-paper";

const Stack = createStackNavigator();

export default function MainStack() {
  const theme = useTheme();
  const isDark = theme.dark;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? theme.colors.surface : theme.colors.primary,
          borderBottomWidth: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.25,
          shadowRadius: 5,
          elevation: 5,
        },
        headerTintColor: isDark
          ? theme.colors.onSurface
          : theme.colors.onPrimary,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: FONT_FAMILY,
          fontSize: theme.fonts.titleLarge.fontSize,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
      }}
    >
      <Stack.Screen
        name={ROUTES.HOME}
        component={HomeTabs}
        options={({ navigation }) => ({
          title: "",
          headerLeft: ({ tintColor }) => (
            <Text style={[styles.logo, { color: tintColor }]}>Sierra</Text>
          ),
        })}
      />

      {/* The chat screen sets its own header (avatar + name) */}
      <Stack.Screen
        name={ROUTES.CHAT}
        component={ChatScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name={ROUTES.PROFILE}
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
      <Stack.Screen
        name={ROUTES.MY_PROFILE}
        component={MyProfileScreen}
        options={{ title: "User Details" }}
      />
      <Stack.Screen
        name={ROUTES.EDIT_PROFILE}
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
      <Stack.Screen
        name={ROUTES.IMAGE_VIEWER}
        component={ImageViewerScreen}
        options={({ route }) => ({
          title: route.params?.username ?? "Viewing Image",
          headerStyle: { backgroundColor: "black" },
        })}
      />
      <Stack.Screen
        name={ROUTES.VIDEO_PLAYER}
        component={VideoPlayerScreen}
        options={{
          title: "Playing Video",
          headerStyle: { backgroundColor: "black" },
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  logo: { fontFamily: FONT_FAMILY, fontSize: 32, marginLeft: 15 },
  settingsButton: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
});
