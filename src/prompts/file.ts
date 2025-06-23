import prompts from "prompts"

export async function promptSelectFiles(
  files: { title: string; value: string; description: string }[],
) {
  const response = await prompts({
    type: "multiselect",
    name: "files",
    message: "Select files to fetch:",
    choices: files,
    hint: "- Space to select. Return to submit",
    suggest: async (input: string, choices: any[]) => {
      const searchTerm = input.toLowerCase()
      return choices.filter(choice =>
        choice.title.toLowerCase().startsWith(searchTerm),
      )
    },
  })
  return response.files
}
