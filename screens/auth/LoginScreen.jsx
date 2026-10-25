import { useContext, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { ROUTES } from "../../navigation/routes";
import { validatePassword, validateUsername } from "../../utils/validation";
import AuthLayout from "../../components/auth/AuthLayout";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
      <Input
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <Input
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} loading={loading} style={styles.loginButton} />
      <Button
        title="New User? Register"
        variant="secondary"
        onPress={() => navigation.navigate(ROUTES.REGISTER)}
      />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  input: { width: "100%", marginBottom: 15 },
  loginButton: { marginBottom: 15 },
});
