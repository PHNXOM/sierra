import { createContext, useContext, useEffect, useState } from "react";
import { moveConversationToTop, removeConversation } from "../utils/chat";
import { AuthContext } from "./AuthContext";
import { SocketContext } from "./SocketContext";
import { SoundContext } from "./SoundContext";
import { markMessagesReadDB } from "../services/messageService";

export const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const { user } = useContext(AuthContext);
  const { on } = useContext(SocketContext);
  const { playMessageReceivedSound } = useContext(SoundContext);
  const [chats, setChats] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});

  useEffect(() => {
    const off_new_message = on("NEW_MESSAGE", (data) => {
      playMessageReceivedSound();
      setChats((prev) => moveConversationToTop(prev, data, user.id));
    });

    const off_message_sent = on("MESSAGE_SENT", (data) => {
      setChats((prev) => moveConversationToTop(prev, data, user.id));
    });

    const off_delete_chat = on("DELETE_CHAT", ({ receiverId }) => {
      setChats((prev) => removeConversation(prev, receiverId));
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
  }, [on]);

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

  const value = { chats, setChats, markMessagesRead, typingUsers };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
