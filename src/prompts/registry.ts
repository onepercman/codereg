import prompts from "prompts"

export async function promptSelectRegistry(
  registries: { name: string; url: string }[],
) {
  const registryResponse = await prompts({
    type: "select",
    name: "registry",
    message: "Select a registry:",
    choices: registries.map(r => ({
      title: r.name,
      value: r.name,
      description: r.url,
    })),
  })
  return registryResponse.registry
}
