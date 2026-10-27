import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import countries from "../../constants/countries";
import { register } from "../../services/authService";
import {
  validatePasswordMatch,
  validatePassword,
  validatePhone,
  validateUsername,
} from "../../utils/validation";
import AuthLayout from "../../components/auth/AuthLayout";
import { Button, TextInput, useTheme } from "react-native-paper";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  async function handleRegister() {
    const error =
      validateUsername(username) ??
      validatePhone(phone) ??
      validatePassword(password) ??
      validatePasswordMatch(password, confirmPassword);
    if (error) {
      Alert.alert("Validation Error", error);
      return;
    }

    setLoading(true);
    try {
      await register({
        username: username.trim(),
        phone: countryCode + phone.trim(),
        password,
      });
      Alert.alert("Success", "Registration successful!");
      navigation.goBack();
    } catch (error) {
      const message = error.response?.data?.message || "An error occurred.";
      Alert.alert("Registration Error", message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Create an Account" subtitle="Sign up to get started">
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <View style={styles.phoneRow}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={{ color: theme.colors.onSurfaceVariant }}
          selectedTextStyle={{ color: theme.colors.onSurface }}
          itemTextStyle={{ color: theme.colors.onSurface }}
          containerStyle={{ backgroundColor: theme.colors.surface }}
          activeColor={theme.colors.surfaceVariant}
          data={countries}
          labelField="label"
          valueField="code"
          placeholder="Select country"
          searchPlaceholder="Search..."
          maxHeight={300}
          search
          value={countryCode}
          onChange={(country) => setCountryCode(country.code)}
        />
        <TextInput
          style={styles.phoneInput}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        autoCapitalize="none"
        secureTextEntry
      />

      <Button
        onPress={handleRegister}
        style={styles.registerButton}
        mode="contained"
      >
        Register
      </Button>
      <Button
        title="Already have an account? Login"
        mode="text"
        onPress={() => navigation.goBack()}
      >
        Already have an account? Login
      </Button>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  input: { width: "100%", marginBottom: 15 },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  dropdown: {
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  phoneInput: { flex: 1 },
  registerButton: { marginBottom: 15, minWidth: "50%" },
});
