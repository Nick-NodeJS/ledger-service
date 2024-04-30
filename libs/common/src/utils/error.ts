export function formatError(e: Error) {
  return {
    error: e.message.toString(),
    stack: e.stack?.toString().replace(/\r\n/, ''),
  };
}
