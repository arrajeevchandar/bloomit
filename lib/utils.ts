import bcrypt from "bcryptjs";

/**
 * Hashes a password using bcrypt.
 * @param password - The plain text password.
 * @returns A hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

/**
 * Compares a plain text password with a hashed password.
 * @param password - The plain text password.
 * @param hashedPassword - The hashed password from the database.
 * @returns Boolean indicating whether passwords match.
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

/**
 * Capitalizes the first letter of a string.
 * @param str - The input string.
 * @returns A string with the first letter capitalized.
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Checks if a user has the required role.
 * @param userRole - The user's role (buyer or seller).
 * @param allowedRoles - The roles allowed to access a feature.
 * @returns Boolean indicating whether access is granted.
 */
export function hasRole(userRole: string, allowedRoles: string[]): boolean {
  return allowedRoles.includes(userRole);
}

/**
 * Validates an email format.
 * @param email - The input email.
 * @returns Boolean indicating whether the email is valid.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Formats a price to include currency symbol.
 * @param price - The numeric price.
 * @param currency - The currency symbol (default: `$`).
 * @returns A formatted price string.
 */
export function formatPrice(price: number, currency: string = "$"): string {
  return `${currency}${price.toFixed(2)}`;
}
export function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }