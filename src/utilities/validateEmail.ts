const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isValidEmail(value: string): boolean {
  const email = value.trim()
  if (!email) {
    return false
  }

  return EMAIL_PATTERN.test(email)
}

export const EMAIL_VALIDATION_MESSAGE = 'Please enter a valid email address.'
