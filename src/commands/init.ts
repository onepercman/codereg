import { logger } from "@/utils/logger"
import { Command } from "commander"
import { writeFile } from "fs/promises"

export const init = new Command()
  .name("init")
  .description("initialize project with codereg")
  .action(async () => {
    const minimalConfig = {
      $schema: "https://cdn.jsdelivr.net/npm/codereg/dist/config.schema.json",
      registry: [],
    }
    await writeFile(
      ".codereg.config.json",
      JSON.stringify(minimalConfig, null, 2),
      "utf-8",
    )
    logger.success("Project initialization completed.")
  })
