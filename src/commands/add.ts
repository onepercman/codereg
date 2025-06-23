import { confirmOrQuit } from "@/prompts/confirm-or-quit"
import { promptSelectFiles } from "@/prompts/file"
import { promptSelectRegistry } from "@/prompts/registry"
import { configSchema } from "@/schema"
import { getFilesList, getRawFileUrl } from "@/services/registry"
import { logger } from "@/utils/logger"
import { Command } from "commander"
import { mkdir, readFile, writeFile } from "fs/promises"
import path from "path"

const CONFIG_FILE = ".codereg.config.json"

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
    // Read and validate config file
    const rawConfig = await readFile(CONFIG_FILE, "utf-8")
    const config = configSchema.parse(JSON.parse(rawConfig))

    // Select registry interactively if not provided
    let registryName = options.registry
    if (!registryName) {
      registryName = await promptSelectRegistry(config.registry)
    }

    // Find registry by name
    const registry = config.registry.find(r => r.name === registryName)
    if (!registry) {
      logger.error(`Registry '${registryName}' not found in ${CONFIG_FILE}`)
      process.exit(1)
    }

    const branch = options.branch || registry.branch || "main"
    const repoPath = options.path || registry.path || ""

    // Select files interactively if not provided
    let selectedFiles: string[] = []
    if (!options.file) {
      try {
        const files = await getFilesList(registry.url, branch, repoPath)
        selectedFiles = await promptSelectFiles(files)
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
      let shouldWrite = true
      try {
        // Check if file already exists
        await readFile(localFilePath, "utf-8")
        // Ask user for confirmation before overwriting
        await confirmOrQuit(`File ${localFilePath} exists. Overwrite?`)
      } catch (e) {
        // File does not exist, proceed to write
      }
      if (shouldWrite) {
        await mkdir(path.dirname(localFilePath), { recursive: true })
        await writeFile(localFilePath, fileContent, "utf-8")
        logger.success(`File saved to ${localFilePath}`)
      }
    }
  })
