import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  AppState,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useIsFocused, useTheme } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { ROUTES } from "../../navigation/routes";
import { getLatestMessages } from "../../services/messageService";
import { getOtherUser } from "../../utils/chat";
import ChatListItem from "../../components/chat/ChatListItem";
import EmptyState from "../../components/ui/EmptyState";
import LoadingView from "../../components/ui/LoadingView";
import ScreenBackground from "../../components/ui/ScreenBackground";
import ScreenHeader from "../../components/ui/ScreenHeader";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ChatListScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const { chats, setChats } = useContext(ChatContext);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const theme = useTheme();

  const [refreshing, setRefreshing] = useState(false);

  const loadChats = async () => {
    setRefreshing(true);
    try {
      setChats(await getLatestMessages());
    } catch (error) {
      console.error("Error fetching chats", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // load all chats once, and when the app returns from background
  useEffect(() => {
    loadChats();

    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active" && isFocused) loadChats();
    });

    return () => subscription.remove();
  }, []);

  function renderChat({ item: chat }) {
    const otherUser = getOtherUser(chat, user.id);

    return (
      <ChatListItem
        otherUser={otherUser}
        latestMessage={chat}
        isSentByMe={chat.sender.id === user.id}
        onPress={() => {
          navigation.navigate(ROUTES.CHAT, { otherUser: otherUser });
        }}
      />
    );
  }

  function renderContent() {
    if (loading) return <LoadingView message="Fetching Chats..." />;
    if (chats.length === 0) return <EmptyState message="No Chats Found" />;

    return (
      <FlatList
        data={chats}
        keyExtractor={(chat) => getOtherUser(chat, user.id).id.toString()}
        renderItem={renderChat}
        contentContainerStyle={styles.list}
      />
    );
  }

  const headerButtons = !loading && (
    <View>
      {refreshing ? (
        <ActivityIndicator color={theme.colors.onBackground} size={24} />
      ) : (
        <TouchableOpacity onPress={loadChats}>
          <Ionicons name="refresh" size={24} color={theme.colors.outline} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScreenBackground>
      <ScreenHeader
        title="Chats"
        style={{ marginBottom: 15 }}
        right={headerButtons}
      />
      {renderContent()}
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  list: { paddingBottom: 20 },
});
