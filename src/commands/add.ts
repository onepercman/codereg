import { configSchema } from "@/schema"
import { logger } from "@/utils/logger"
import { Command } from "commander"
import { mkdir, readFile, writeFile } from "fs/promises"
import path from "path"
import prompts from "prompts"

const CONFIG_FILE = ".codereg.config.json"

function getRawFileUrl(repoUrl: string, branch: string, filePath: string) {
  const repoPath = repoUrl
    .replace("https://github.com/", "")
    .replace(/\.git$/, "")
  return `https://raw.githubusercontent.com/${repoPath}/${branch}/${filePath}`
}

async function getFilesList(repoUrl: string, branch: string, path: string) {
  const repoPath = repoUrl
    .replace("https://github.com/", "")
    .replace(/\.git$/, "")
  const apiUrl = `https://api.github.com/repos/${repoPath}/contents/${path}?ref=${branch}`

  const res = await fetch(apiUrl)
  if (!res.ok) {
    throw new Error(
      `Failed to fetch files list: ${res.status} ${res.statusText}`,
    )
  }

  const data = await res.json()
  return data
    .filter((item: any) => item.type === "file")
    .map((item: any) => ({
      title: item.name,
      value: item.name,
      description: item.path,
    }))
}

// ✅ Command add
export const add = new Command()
  .name("add")
  .description("add a file from a registry repository to the project")
  .option("-r, --registry <name>", "Registry name defined in config")
  .option("-f, --file <name>", "File name to fetch")
  .option("-b, --branch <branch>", "Branch name (default: main)", "main")
  .option(
    "-p, --path <path>",
    "Path from repository root to the code directory",
  )
  .action(async options => {
    // ✅ Validate config
    const rawConfig = await readFile(CONFIG_FILE, "utf-8")
    const config = configSchema.parse(JSON.parse(rawConfig))

    // Get registry name interactively if not provided
    let registryName = options.registry
    if (!registryName) {
      const registryResponse = await prompts({
        type: "select",
        name: "registry",
        message: "Select a registry:",
        choices: config.registry.map(r => ({
          title: r.name,
          value: r.name,
          description: r.url,
        })),
      })
      registryName = registryResponse.registry
    }

    // ✅ find registry
    const registry = config.registry.find(r => r.name === registryName)
    if (!registry) {
      logger.error(`Registry '${registryName}' not found in ${CONFIG_FILE}`)
      process.exit(1)
    }

    const branch = options.branch || "main"
    const repoPath = options.path || registry.path || ""

    // Get files list and let user select
    let selectedFiles: string[] = []
    if (!options.file) {
      try {
        const files = await getFilesList(registry.url, branch, repoPath)
        const response = await prompts({
          type: "multiselect",
          name: "files",
          message: "Select files to fetch:",
          choices: [{ title: "Select All", value: "all" }, ...files],
          hint: "- Space to select. Return to submit",
          suggest: async (input: string, choices: any[]) => {
            const searchTerm = input.toLowerCase()
            return choices.filter(choice =>
              choice.title.toLowerCase().startsWith(searchTerm),
            )
          },
        })

        if (response.files.includes("all")) {
          selectedFiles = files.map((f: any) => f.value)
        } else {
          selectedFiles = response.files
        }
      } catch (error) {
        logger.error(`Failed to fetch files list: ${error}`)
        process.exit(1)
      }
    } else {
      selectedFiles = [options.file]
    }

    // Download and save each selected file
    for (const fileName of selectedFiles) {
      const filePathInRepo = repoPath
        ? path.posix.join(repoPath, fileName)
        : fileName
      const rawUrl = getRawFileUrl(registry.url, branch, filePathInRepo)

      logger.info(`Downloading: ${rawUrl}`)

      const res = await fetch(rawUrl)
      if (!res.ok) {
        logger.error(
          `Failed to fetch file ${fileName}: ${res.status} ${res.statusText}`,
        )
        continue
      }
      const fileContent = await res.text()

      const localFilePath = path.resolve(registry.dirname, fileName)
      await mkdir(path.dirname(localFilePath), { recursive: true })
      await writeFile(localFilePath, fileContent, "utf-8")

      logger.success(`File saved to ${localFilePath}`)
    }
  })
