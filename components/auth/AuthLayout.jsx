import { Image, StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import ScreenBackground from "../ui/ScreenBackground";
import { Text, useTheme } from "react-native-paper";

// Shared layout of the Login and Register screens.
export default function AuthLayout({
  title,
  subtitle,
  showLogo = false,
  children,
}) {
  const theme = useTheme();

  return (
    <ScreenBackground variant="solid" style={styles.container}>
      {showLogo && (
        <Image
          source={require("../../assets/sierra.png")}
          resizeMode="contain"
          style={styles.logo}
        />
      )}
      <Text variant="displaySmall" style={{ color: theme.colors.onBackground }}>
        {title}
      </Text>
      <Text
        style={{
          color: theme.colors.outline,
          marginBottom: 25,
        }}
      >
        {subtitle}
      </Text>
      {children}
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: { height: 120, width: 120, marginBottom: 30 },
});
