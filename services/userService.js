import api, { MULTIPART_HEADERS } from "../config/api";
import { getFileExtension } from "../utils/media";

export async function getUserById(userId) {
  const { data } = await api.get(`/api/users/${userId}`);
  return data;
}

export function updateProfile({ bio, photoURI, removePhoto }) {
  const formData = new FormData();
  formData.append("bio", bio);

  if (photoURI) {
    const extension = getFileExtension(photoURI);
    formData.append("profilePhoto", {
      uri: photoURI,
      name: `photo.${extension}`,
      type: `image/${extension}`,
    });
  } else {
    formData.append("unsetProfilePhoto", String(removePhoto));
  }

  return api.patch(`/api/users`, formData, {
    headers: MULTIPART_HEADERS,
  });
}

export async function fetchProfile() {
  const { data } = await api.get("/api/profile");
  return data;
}

export function deleteProfile() {
  return api.delete("/api/profile");
}

export function savePushToken(pushToken) {
  return api.post("/api/users/push-tokens", { pushToken });
}

export function deletePushToken(pushToken) {
  return api.delete("/api/users/push-tokens", { pushToken });
}
