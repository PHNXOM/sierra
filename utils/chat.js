// Helpers for the chat list. A "chat" is the latest message of a conversation.

// The person the current user is talking to in this message/chat
export const getOtherUser = (message, currentUserId) =>
  message.sender.id === currentUserId ? message.receiver : message.sender;

export const involvesUser = (message, userId) =>
  message.sender.id === userId || message.receiver.id === userId;

// Puts `message` at the top, replacing the previous latest message of that conversation
export function moveConversationToTop(chats, message, currentUserId) {
  const otherUserId = getOtherUser(message, currentUserId).id;
  const otherChats = chats.filter(
    (chat) => getOtherUser(chat, currentUserId).id !== otherUserId,
  );
  return [message, ...otherChats];
}

export const removeConversation = (chats, otherUserId) =>
  chats.filter((chat) => !involvesUser(chat, otherUserId));
