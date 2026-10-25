import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../constants/config";
import { setAuthToken } from "../config/api";
import * as authService from "../services/authService";
import * as userService from "../services/userService";
import { registerForPushNotifications } from "../services/notificationService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pushToken, setPushToken] = useState(null);

  // restore the session saved on this device
  useEffect(() => {
    async function restoreSession() {
      try {
        const savedToken = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
        console.log("Retrieved token:", savedToken);
        if (savedToken) {
          setAuthToken(savedToken);
          const fetchedUser = await userService.fetchProfile();
          setUser(fetchedUser);
        }
      } catch (error) {
        console.log("Error restoring session:", error);
        setAuthToken(null);
        Alert.alert("Error", "Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  // register this device for push notifications once logged in
  useEffect(() => {
    if (!user) return;

    async function registerPushToken() {
      try {
        const token = await registerForPushNotifications();
        if (!token) return;
        setPushToken(token);
        await userService.savePushToken(token);
      } catch (error) {
        console.error("Push notification setup failed", error);
      }
    }

    registerPushToken();
  }, [user?.id]);

  async function login(username, password) {
    const token = await authService.login(username, password);
    await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
    setAuthToken(token);
    setUser(await userService.fetchProfile());
  }

  async function refreshUser() {
    setUser(await userService.fetchProfile());
  }

  async function removePushToken() {
    if (!pushToken) return;
    try {
      await userService.deletePushToken(pushToken);
    } catch (error) {
      console.log("Could not remove push token", error);
    }
  }

  async function clearSession() {
    await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
    setAuthToken(null);
    setUser(null);
    setPushToken(null);
  }

  async function logout() {
    await removePushToken();
    await clearSession();
  }

  async function deleteProfile() {
    await removePushToken();
    await userService.deleteProfile();
    await clearSession();
  }

  const value = { user, loading, login, logout, refreshUser, deleteProfile };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
