import { Image, StyleSheet, View } from "react-native";
import * as Progress from "react-native-progress";
import ScreenBackground from "./ScreenBackground";
import { Text, useTheme } from "react-native-paper";

// Shown while the saved session and fonts are loading.
export default function SplashView() {
  const theme = useTheme();

  return (
    <ScreenBackground variant="solid">
      <View style={styles.logoArea}>
        <Image
          source={require("../../assets/sierra.png")}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
      <View style={styles.progressArea}>
        <Progress.Bar
          indeterminate
          width={150}
          borderWidth={0}
          color={theme.colors.onSurfaceVariant}
          unfilledColor={theme.colors.surfaceVariant}
        />
        <Text style={[styles.credit, theme.colors.outline]}>
          Designed by Om Kumar
        </Text>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  logoArea: { flex: 1, justifyContent: "flex-end", alignItems: "center" },
  logo: { width: 150, height: 150 },
  progressArea: { flex: 1, justifyContent: "center", alignItems: "center" },
  credit: { marginTop: 20 },
});
