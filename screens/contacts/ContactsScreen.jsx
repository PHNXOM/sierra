import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AuthContext } from "../../context/AuthContext";
import { ROUTES } from "../../navigation/routes";
import { fetchRegisteredContacts } from "../../services/contactService";
import ContactListItem from "../../components/contacts/ContactListItem";
import EmptyState from "../../components/ui/EmptyState";
import ScreenBackground from "../../components/ui/ScreenBackground";
import ScreenHeader from "../../components/ui/ScreenHeader";
import { useTheme } from "react-native-paper";

export default function ContactsScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  async function loadContacts() {
    setLoading(true);
    try {
      const registeredContacts = await fetchRegisteredContacts(user.phone);
      if (registeredContacts === null) {
        Alert.alert(
          "Permission denied",
          "Cannot access contacts without permission.",
        );
      } else {
        setContacts(registeredContacts);
      }
    } catch (error) {
      console.error("Failed to fetch contacts", error);
      Alert.alert("Error", "Unable to fetch contacts.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContacts();
  }, []);

  const headerButtons = (
    <View style={styles.headerButtons}>
      {loading ? (
        <ActivityIndicator color={theme.colors.onBackground} size={24} />
      ) : (
        <TouchableOpacity onPress={loadContacts}>
          <Ionicons name="refresh" size={24} color={theme.colors.outline} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScreenBackground>
      <ScreenHeader
        title="Contacts"
        right={headerButtons}
        style={{ marginBottom: 15 }}
      />

      {contacts.length > 0 ? (
        <FlatList
          data={contacts}
          keyExtractor={(contact) => contact.id.toString()}
          renderItem={({ item }) => (
            <ContactListItem
              contact={item}
              onPress={() =>
                navigation.navigate(ROUTES.PROFILE, { userId: item.id })
              }
            />
          )}
          contentContainerStyle={styles.list}
        />
      ) : (
        <EmptyState
          message={loading ? "Fetching Contacts..." : "No Contacts Found"}
        />
      )}
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  list: { paddingBottom: 20 },
});
