export function handleFormError(error: unknown) {
  // Supabase errors are often plain objects, not Error instances.
  const hasMessage =
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'

  const message = hasMessage ? (error.message as string) : 'Something went wrong. Please try again.'
  const status =
    typeof error === 'object' && error !== null && 'status' in error
      ? Number(error.status) || 500
      : 500

  return { message, status }
}
