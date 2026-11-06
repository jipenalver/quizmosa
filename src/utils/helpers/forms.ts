export function handleFormError(error: unknown) {
  const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.'
  const status =
    typeof error === 'object' && error !== null && 'status' in error
      ? Number(error.status) || 500
      : 500

  return { message, status }
}
