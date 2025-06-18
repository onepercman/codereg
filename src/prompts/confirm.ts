import prompts from "prompts"

export async function confirm(message: string) {
  if (process.env.YES) return true

  const { proceed } = await prompts({
    type: "confirm",
    name: "proceed",
    message,
    initial: true,
  })

  return Boolean(proceed)
}
