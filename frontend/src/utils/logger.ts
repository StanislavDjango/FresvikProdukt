type LogContext = {
  scope?: string
  meta?: Record<string, unknown>
}

export const logError = (message: string, error?: unknown, context?: LogContext) => {
  const payload = {
    message,
    error,
    scope: context?.scope,
    meta: context?.meta,
  }
  console.error(payload)
}
