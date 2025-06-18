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

    // Get file name interactively if not provided
    let fileName = options.file
    if (!fileName) {
      const fileResponse = await prompts({
        type: "text",
        name: "file",
        message: "Enter the file name to fetch:",
        validate: value => (value.length > 0 ? true : "File name is required"),
      })
      fileName = fileResponse.file
    }

    // Get path interactively if not provided
    let repoPath = options.path
    if (!repoPath) {
      const pathResponse = await prompts({
        type: "text",
        name: "path",
        message:
          "Enter the path from repository root to the code directory (press enter to use root):",
      })
      repoPath = pathResponse.path
    }

    const branch = options.branch || "main"
    const filePathInRepo = repoPath
      ? path.posix.join(repoPath, fileName)
      : fileName
    const rawUrl = getRawFileUrl(registry.url, branch, filePathInRepo)

    logger.info(`Downloading: ${rawUrl}`)

    const res = await fetch(rawUrl)
    if (!res.ok) {
      logger.error(`Failed to fetch file: ${res.status} ${res.statusText}`)
      process.exit(1)
    }
    const fileContent = await res.text()

    const localFilePath = path.resolve(registry.dirname, fileName)
    await mkdir(path.dirname(localFilePath), { recursive: true })
    await writeFile(localFilePath, fileContent, "utf-8")

    logger.success(`File saved to ${localFilePath}`)
  })
