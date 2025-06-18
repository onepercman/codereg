export async function confirmOrQuit(message: string) {
  const proceed = await confirm(message)

  if (!proceed) {
    process.exit(0)
  }
}
