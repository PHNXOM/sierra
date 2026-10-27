import { useContext, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { validatePassword, validateUsername } from "../../utils/validation";
import AuthLayout from "../../components/auth/AuthLayout";
import { Button, TextInput, useTheme } from "react-native-paper";
import { ROUTES } from "../../navigation/routes";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  async function handleLogin() {
    const error = validateUsername(username) ?? validatePassword(password);
    if (error) {
      Alert.alert("Validation Error", error);
      return;
    }

    setLoading(true);
    try {
      await login(username.trim(), password);
    } catch (error) {
      const message = error.response?.data?.message || "An error occurred.";
      Alert.alert("Login Error", message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Welcome Back" subtitle="Log in to your account" showLogo>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        secureTextEntry
      />
      <Button
        mode="contained"
        style={{ marginBottom: 15, minWidth: "50%" }}
        onPress={handleLogin}
      >
        {loading ? (
          <ActivityIndicator color={theme.colors.onPrimary} />
        ) : (
          "Login"
        )}
      </Button>
      <Button
        mode="contained-tonal"
        style={{ minWidth: "50%" }}
        onPress={() => {
          navigation.navigate(ROUTES.REGISTER);
        }}
      >
        Register
      </Button>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  input: { width: "100%", marginBottom: 15 },
});
