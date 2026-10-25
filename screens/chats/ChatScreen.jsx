import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Alert, Keyboard, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import EmojiSelector from "react-native-emoji-selector";

import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { SoundContext } from "../../context/SoundContext";
import { ROUTES } from "../../navigation/routes";
import {
  deleteConversation,
  getMessages,
  sendMessage,
} from "../../services/messageService";
import { pickAudioFile, pickFromGallery } from "../../services/mediaPicker";

import AttachmentMenu from "../../components/chat/AttachmentMenu";
import AttachmentPreview from "../../components/chat/AttachmentPreview";
import ChatFooter from "../../components/chat/ChatFooter";
import ChatHeaderTitle from "../../components/chat/ChatHeaderTitle";
import MessageInput from "../../components/chat/MessageInput";
import MessageList from "../../components/chat/MessageList";
import LoadingView from "../../components/ui/LoadingView";
import { SocketContext } from "../../context/SocketContext";
import ScreenBackground from "../../components/ui/ScreenBackground";

export default function ChatScreen({ route, navigation }) {
  const { otherUser } = route.params;
  const { user } = useContext(AuthContext);
  const { playMessageSentSound } = useContext(SoundContext);
  const { markMessagesRead, removeChat } = useContext(ChatContext);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const isFocused = useIsFocused();
  const { on } = useContext(SocketContext);

  // ---------- Load the conversation ----------
  useEffect(() => {
    async function loadConversation() {
      try {
        const messagesData = await getMessages(otherUser.id);
        setMessages(messagesData);
      } catch (error) {
        console.error("Error loading conversation", error);
      } finally {
        setLoading(false);
      }
    }

    loadConversation();
  }, [otherUser]);

  // ---------- Realtime updates ----------
  useEffect(() => {
    const addMessage = (msg) => setMessages((prev) => [...prev, msg]);

    const offNew = on("NEW_MESSAGE", (data) => {
      if (data.sender.id === otherUser.id) addMessage(data);
    });

    const offSent = on("MESSAGE_SENT", (data) => {
      if (data.receiver.id === otherUser.id) addMessage(data);
    });

    return () => {
      offNew();
      offSent();
    };
  }, [on, otherUser.id]);

  // ---------- Mark messages as read when leaving the screen ----------
  useEffect(() => {
    const readMessages = async () => {
      try {
        await markMessagesRead(otherUser.id);
      } catch (error) {
        console.log(error);
      }
    };

    if (!isFocused) readMessages();
  }, [isFocused]);

  // ---------- Header: avatar, name, delete button ----------
  function confirmDeleteChat() {
    Alert.alert(
      "Delete Chats",
      "Are you sure you want to delete all chats with this user?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteConversation(otherUser.id);
              removeChat(otherUser.id);
              Alert.alert("Chats Deleted", "All Chats have been erased.");
              navigation.goBack();
            } catch (error) {
              Alert.alert("Error", "Unable to delete chats.");
            }
          },
        },
      ],
    );
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: otherUser
        ? () => (
            <ChatHeaderTitle
              otherUser={otherUser}
              onPress={() =>
                navigation.navigate(ROUTES.PROFILE, { userId: otherUser.id })
              }
            />
          )
        : undefined,
      headerRight: ({ tintColor }) => (
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={confirmDeleteChat}
        >
          <Ionicons name="trash" size={25} color={tintColor} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, otherUser]);

  // ---------- Typing indicator ----------

  // ---------- Attachments ----------
  async function handlePickGallery() {
    const media = await pickFromGallery();
    if (media) setAttachment(media);
    setShowAttachMenu(false);
  }

  async function handlePickAudio() {
    const audio = await pickAudioFile();
    if (audio) setAttachment(audio);
    setShowAttachMenu(false);
  }

  function toggleAttachMenu() {
    setShowAttachMenu((visible) => !visible);
    setAttachment(null);
  }

  function toggleEmojiPicker() {
    setShowEmojiPicker((visible) => !visible);
    Keyboard.dismiss();
  }

  // ---------- Sending ----------
  async function handleSend() {
    if (!text.trim() && !attachment) return;

    console.log({ user, otherUser });

    setIsSending(true);
    try {
      await sendMessage({
        senderId: user.id,
        receiverId: otherUser.id,
        attachment: attachment,
        text: text,
      });

      // The sent message arrives through the socket ("message-sent")
      setText("");
      setAttachment(null);
      await playMessageSentSound();
    } catch (error) {
      console.error("Error sending message", error);
    } finally {
      setIsSending(false);
    }
  }

  // ---------- Render ----------
  return (
    <ScreenBackground>
      {loading ? (
        <LoadingView message="Loading Chats..." />
      ) : (
        <MessageList messages={messages} user={user} otherUser={otherUser} />
      )}

      <ChatFooter>
        {showAttachMenu && (
          <AttachmentMenu
            onPickAudio={handlePickAudio}
            onPickGallery={handlePickGallery}
          />
        )}

        <AttachmentPreview
          attachment={attachment}
          onRemove={() => setAttachment(null)}
          onPlayVideo={() =>
            navigation.navigate(ROUTES.VIDEO_PLAYER, {
              mediaURL: attachment.uri,
            })
          }
        />

        <MessageInput
          value={text}
          onChangeText={setText}
          onFocus={() => setShowEmojiPicker(false)}
          onEmojiPress={toggleEmojiPicker}
          onAttachPress={toggleAttachMenu}
          onSend={handleSend}
          isSending={isSending}
        />

        {showEmojiPicker && (
          <EmojiSelector
            style={{ height: 250 }}
            onEmojiSelected={(emoji) => setText((prev) => prev + emoji)}
            showHistory
            showSearchBar={false}
          />
        )}
      </ChatFooter>
    </ScreenBackground>
  );
}
