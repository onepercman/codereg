import { confirmOrQuit } from "@/prompts/confirm-or-quit"
import { logger } from "@/utils/logger"
import { Command } from "commander"
import { readFile, writeFile } from "fs/promises"

export const init = new Command()
  .name("init")
  .description("initialize project with codereg")
  .action(async () => {
    const minimalConfig = {
      $schema: "https://cdn.jsdelivr.net/npm/codereg/dist/config.schema.json",
      registry: [],
    }
    try {
      // Check if config file already exists
      await readFile(".codereg.config.json", "utf-8")
      // Ask user for confirmation before overwriting
      await confirmOrQuit(".codereg.config.json exists. Overwrite?")
    } catch (e) {
      // File does not exist, proceed to write
    }
    await writeFile(
      ".codereg.config.json",
      JSON.stringify(minimalConfig, null, 2),
      "utf-8",
    )
    logger.success("Project initialization completed.")
  })
