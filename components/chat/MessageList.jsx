import { useMemo, useRef } from "react";
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
    <FlatList
      ref={listRef}
      data={messages}
      keyExtractor={(message) => message.id.toString()}
      renderItem={renderMessage}
      contentContainerStyle={styles.content}
      inverted={true}
      onEndReached={handleEndReached}
      ListFooterComponent={
        loadingMore && (
          <ActivityIndicator
            size="small"
            color={theme.colors.onBackground}
            style={{ marginVertical: 10 }}
          />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 10 },
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
