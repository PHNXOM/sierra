import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();
const DEFAULT_REGION = "IN";
const INTERNATIONAL_FORMAT = /^\+\d{1,3}\d{10}$/;

// Keep only digits and "+"
const cleanNumber = (phone) => phone.replace(/[^\d+]/g, "");

// Converts any phone number to E.164 (e.g. +919876543210). Returns "-1" if invalid.
export function normalizePhoneNumber(phone) {
  const cleaned = cleanNumber(phone);
  if (INTERNATIONAL_FORMAT.test(cleaned)) return cleaned;

  try {
    const parsed = phoneUtil.parse(cleaned, DEFAULT_REGION);
    return phoneUtil.format(parsed, PhoneNumberFormat.E164);
  } catch (error) {
    console.log(error);
    return "-1";
  }
}

// Registration form: a plain 10 digit number (country code is chosen separately)
export const isValidPhoneNumber = (phone) => /^\d{10}$/.test(phone);
