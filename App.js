import { NavigationContainer } from "@react-navigation/native";
import { Orbitron_400Regular, useFonts } from "@expo-google-fonts/orbitron";
import RootNavigator from "./navigation/RootNavigator";
import { TextEncoder, TextDecoder } from "text-encoding";

import MaterialDesignIconsFont from "@react-native-vector-icons/material-design-icons/fonts/MaterialDesignIcons.ttf";
import { useTheme } from "react-native-paper";
import AppProvider from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";

globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;

function RenderNavigationContainer({ children }) {
  const theme = useTheme();
  return <NavigationContainer theme={theme}>{children}</NavigationContainer>;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Orbitron_400Regular,
    MaterialDesignIcons: MaterialDesignIconsFont,
  });

  return (
    <AppProvider>
      <AuthProvider>
        <RenderNavigationContainer>
          <RootNavigator fontsLoaded={fontsLoaded} />
        </RenderNavigationContainer>
      </AuthProvider>
    </AppProvider>
  );
}
