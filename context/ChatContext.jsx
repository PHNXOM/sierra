import { createContext, useContext, useEffect, useState } from "react";
import { moveConversationToTop } from "../utils/chat";
import { AuthContext } from "./AuthContext";
import { SocketContext } from "./SocketContext";
import { markMessagesReadDB } from "../services/messageService";
import { AppContext } from "./AppContext";
import { useNavigation } from "@react-navigation/native";

export const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const { user } = useContext(AuthContext);
  const { on } = useContext(SocketContext);
  const { play, showAlert } = useContext(AppContext);
  const [chats, setChats] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const navigation = useNavigation();

  const deleteChat = (otherUserId) => {
    setChats((chats) =>
      chats.filter(
        (chat) =>
          !(chat.sender.id === otherUserId || chat.receiver.id === otherUserId),
      ),
    );
  };

  useEffect(() => {
    const off_new_message = on("NEW_MESSAGE", (data) => {
      play("received");
      setChats((prev) => moveConversationToTop(prev, data, user.id));
    });

    const off_message_sent = on("MESSAGE_SENT", (data) => {
      setChats((prev) => moveConversationToTop(prev, data, user.id));
    });

    const off_delete_chat = on("DELETE_CHAT", ({ otherUserId }) => {
      deleteChat(otherUserId);
      showAlert("Chats Deleted", "The other user deleted the chats");
      if (navigation.canGoBack()) navigation.goBack();
    });

    const off_typing = on("TYPING", ({ otherUserId }) => {
      setTypingUsers((prev) => ({ ...prev, [otherUserId]: true }));
    });

    const off_stop_typing = on("STOP_TYPING", ({ otherUserId }) => {
      setTypingUsers((prev) => ({ ...prev, [otherUserId]: false }));
    });

    return () => {
      off_new_message();
      off_message_sent();
      off_delete_chat();
      off_typing();
      off_stop_typing();
    };
  }, [on, play]);

  const markMessagesRead = async (otherUserId) => {
    setChats((prev) =>
      prev.map((prev) =>
        prev.sender?.id === otherUserId
          ? { ...prev, isRead: true, unreadCount: 0 }
          : prev,
      ),
    );

    await markMessagesReadDB(otherUserId);
  };

  // forget the previous user's chats on logout
  useEffect(() => {
    if (!user.id) setChats([]);
  }, [user.id]);

  const value = { chats, setChats, markMessagesRead, typingUsers, deleteChat };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
