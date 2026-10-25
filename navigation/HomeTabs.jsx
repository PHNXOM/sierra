import ChatListScreen from "../screens/chats/ChatListScreen";
import ContactsScreen from "../screens/contacts/ContactsScreen";
import { ROUTES } from "./routes";
import { useTheme } from "react-native-paper";
import SettingsScreen from "../screens/settings/SettingsScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

export default function HomeTabs() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      sceneAnimationEnabled
      sceneAnimationType="shifting"
      barStyle={{ backgroundColor: theme.colors.surface }}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.onSurfaceVariant}
      activeIndicatorStyle={{
        backgroundColor: theme.colors.secondaryContainer,
      }}
    >
      <Tab.Screen
        name={ROUTES.CHATS}
        component={ChatListScreen}
        options={{
          tabBarLabel: "Chats",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name="chat-outline"
              size={24}
              color={
                focused
                  ? theme.colors.onSecondaryContainer
                  : theme.colors.onSurfaceVariant
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.CONTACTS}
        component={ContactsScreen}
        options={{
          tabBarLabel: "Contacts",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name="account-multiple"
              size={24}
              color={
                focused
                  ? theme.colors.onSecondaryContainer
                  : theme.colors.onSurfaceVariant
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.SETTINGS}
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name="cog"
              size={24}
              color={
                focused
                  ? theme.colors.onSecondaryContainer
                  : theme.colors.onSurfaceVariant
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
