import { useRef } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { isSameDay } from "date-fns";
import { formatDate } from "../../utils/date";
import MessageBubble from "./MessageBubble";
import { useTheme } from "react-native-paper";
import { BlurView } from "expo-blur";

function DateSeparator({ date }) {
  return (
    <View style={styles.separator}>
      <Text style={styles.separatorText}>{formatDate(date)}</Text>
    </View>
  );
}

export default function MessageList({
  messages,
  user,
  otherUser,
  handleEndReached,
  loadingMore,
}) {
  const listRef = useRef(null);
  const theme = useTheme();

  function renderMessage({ item, index }) {
    const previous = messages[index + 1];
    const startsNewDay =
      !previous || !isSameDay(new Date(previous.sentAt), new Date(item.sentAt));
    const isOwnMessage = item.sender.id === user.id;
    const sender = isOwnMessage ? user : otherUser;

    return (
      <>
        <MessageBubble
          message={item}
          isOwnMessage={isOwnMessage}
          avatarURI={sender?.profilePhoto}
        />
        {startsNewDay && <DateSeparator date={item.sentAt} />}
      </>
    );
  }

  return (
    <>
      {loadingMore && (
        <BlurView
          style={{
            position: "absolute",
            zIndex: 10,
            top: 0,
            width: "100%",
            paddingVertical: 20,
          }}
          tint={theme.dark ? "dark" : "light"}
          intensity={50}
          experimentalBlurMethod="dimezisBlurView"
        >
          <ActivityIndicator size="small" color={theme.colors.onBackground} />
        </BlurView>
      )}
      <FlatList
        style={{ flex: 1 }}
        ref={listRef}
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.content}
        inverted={true}
        onEndReached={handleEndReached}
      />
    </>
  );
}

const styles = StyleSheet.create({
  content: { position: "relative", paddingBottom: 10 },
  separator: { alignItems: "center", marginVertical: 10 },
  separatorText: {
    backgroundColor: "#fff",
    color: "#555",
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
});
