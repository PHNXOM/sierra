import { Image, StyleSheet, Text } from "react-native";
import { COLORS } from "../../constants/colors";
import ScreenBackground from "../ui/ScreenBackground";
import { useTheme } from "react-native-paper";

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
      <Text style={[styles.title, { color: theme.colors.onBackground }]}>
        {title}
      </Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.muted,
    marginBottom: 25,
    textAlign: "center",
  },
});
