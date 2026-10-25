import { useContext } from "react";
import { StatusBar } from "react-native";
import { AuthContext } from "../context/AuthContext";
import SplashView from "../components/ui/SplashView";
import AuthStack from "./AuthStack";
import { useTheme } from "react-native-paper";
import AuthenticatedLayout from "./AuthenticatedLayout";

// Shows the splash while loading, then the login flow or the main app.
export default function RootNavigator({ fontsLoaded }) {
  const { user, loading } = useContext(AuthContext);
  const theme = useTheme();
  const isDark = theme.dark;

  function renderContent() {
    if (loading || !fontsLoaded) return <SplashView />;
    return user ? <AuthenticatedLayout /> : <AuthStack />;
  }

  return (
    <>
      {renderContent()}
      <StatusBar
        backgroundColor={isDark ? theme.colors.surface : theme.colors.primary}
        barStyle="default"
      />
    </>
  );
}
