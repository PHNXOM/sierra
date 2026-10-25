import { getFileExtension, getMimeType } from "../utils/media";
import api, { MULTIPART_HEADERS } from "../config/api";

export async function getLatestMessages() {
  const { data } = await api.get("/api/messages/inbox");
  return data;
}

export async function getMessages(otherUserId) {
  const { data } = await api.get(`/api/messages/${otherUserId}`);
  return data;
}

export function sendMessage({ senderId, receiverId, text, attachment }) {
  const formData = new FormData();
  formData.append("senderId", senderId);
  formData.append("receiverId", receiverId);
  formData.append("message", text);

  if (attachment) {
    const extension = getFileExtension(attachment.uri);
    formData.append("attachment", {
      uri: attachment.uri,
      name: attachment.name,
      type: getMimeType(attachment.type, extension),
    });
  }

  return api.post("/api/messages", formData, {
    headers: MULTIPART_HEADERS,
  });
}

export function markMessagesReadDB(otherUserId) {
  return api.patch(`/api/messages/${otherUserId}/read`, {});
}

export function deleteConversation(otherUserId) {
  return api.delete(`/api/messages/${otherUserId}`);
}
