// Admin email addresses
const ADMIN_EMAILS = [
  'saadrehman1710000@gmail.com',
  'mateeqsahil@gmail.com'
];

/**
 * Check if an email address belongs to an admin
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

/**
 * Get all admin emails
 */
export function getAdminEmails(): string[] {
  return ADMIN_EMAILS;
} 