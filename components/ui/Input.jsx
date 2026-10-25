import { StyleSheet, TextInput } from "react-native";
import { COLORS } from "../../constants/colors";
import { useTheme } from "react-native-paper";

// A themed TextInput. Accepts every TextInput prop.
export default function Input({ style, ...props }) {
  const theme = useTheme();

  return (
    <TextInput
      placeholderTextColor={COLORS.muted}
      style={[
        styles.input,
        {
          backgroundColor: theme.colors.surface,
          color: theme.colors.onSurface,
        },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
  },
});
