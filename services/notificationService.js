import { Alert, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

export async function registerForPushNotifications() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  let { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    ({ status } = await Notifications.requestPermissionsAsync());
  }
  if (status !== "granted") {
    Alert.alert(
      "Permission denied",
      "Permission needed to push notifications.",
    );
    return null;
  }

  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ??
    Constants?.easConfig?.projectId;
  if (!projectId) throw new Error("Project ID not found");

  const { data } = await Notifications.getExpoPushTokenAsync({ projectId });
  return data;
}
