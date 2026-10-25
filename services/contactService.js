import * as Contacts from "expo-contacts";
import api from "../config/api";
import { normalizePhoneNumber } from "../utils/phone";

async function requestContactsPermission() {
  const { status } = await Contacts.getPermissionsAsync();
  if (status === "granted") return true;

  const { status: newStatus } = await Contacts.requestPermissionsAsync();
  return newStatus === "granted";
}

/**
 * Reads the phone's contacts and returns the ones registered on Sierra,
 * each with the name the user saved it under (`savedName`).
 * Returns null when the contacts permission was denied.
 */
export async function fetchRegisteredContacts(currentUserPhone) {
  if (!(await requestContactsPermission())) return null;

  const { data: deviceContacts } = await Contacts.getContactsAsync({
    fields: [Contacts.Fields.PhoneNumbers],
  });

  // Map every normalized number to the name it is saved under
  const savedNames = new Map();
  deviceContacts.forEach((contact) => {
    (contact.phoneNumbers || []).forEach(({ number }) => {
      if (!number) return;
      const normalized = normalizePhoneNumber(number);
      if (!savedNames.has(normalized)) savedNames.set(normalized, contact.name);
    });
  });

  const numbers = [...savedNames.keys()].filter((number) => number !== "-1");
  const { data: registeredUsers } = await api.post(
    "/api/users/contacts/match",
    {
      phoneNumbers: numbers,
    },
  );

  return registeredUsers
    .filter((contact) => contact.phone !== currentUserPhone)
    .map((contact) => ({
      ...contact,
      savedName: savedNames.get(contact.phone) || "No Name",
    }));
}

export function uploadContacts(contacts) {
  return api.post("/contacts", contacts);
}
