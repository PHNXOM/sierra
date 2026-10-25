import { isValidPhoneNumber } from "./phone";

// Each validator returns an error message, or null when the value is valid.

export function validateUsername(username) {
  if (!username.trim()) return "Username is required.";
  if (username.includes(" ")) return "Username cannot have spaces.";
  if (username.length < 3) return "Username must be at least 3 characters long.";
  return null;
}

export function validatePassword(password) {
  if (!password) return "Password is required.";
  if (password.length < 6) return "Password must be at least 6 characters long.";
  return null;
}

export function validatePhone(phone) {
  if (!phone.trim()) return "Phone number is required.";
  if (!isValidPhoneNumber(phone)) return "Invalid phone number.";
  return null;
}

export function validatePasswordMatch(password, confirmPassword) {
  return password === confirmPassword ? null : "Passwords must match.";
}
