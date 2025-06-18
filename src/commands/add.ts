import { configSchema } from "@/schema"
import { logger } from "@/utils/logger"
import { Command } from "commander"
import { mkdir, readFile, writeFile } from "fs/promises"
import path from "path"

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
  .requiredOption("-r, --registry <name>", "Registry name defined in config")
  .requiredOption("-f, --file <name>", "File name to fetch")
  .option("-b, --branch <branch>", "Branch name (default: main)", "main")
  .action(async options => {
    const { registry: registryName, file: fileName, branch } = options

    // ✅ Validate config
    const rawConfig = await readFile(CONFIG_FILE, "utf-8")
    const config = configSchema.parse(JSON.parse(rawConfig))

    // ✅ find registry
    const registry = config.registry.find(r => r.name === registryName)
    if (!registry) {
      logger.error(`Registry '${registryName}' not found in ${CONFIG_FILE}`)
      process.exit(1)
    }

    const filePathInRepo = path.posix.join(registry.path, fileName)
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
