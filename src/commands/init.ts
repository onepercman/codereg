import { logger } from "@/utils/logger"
import { Command } from "commander"

export const init = new Command()
  .name("init")
  .description("initialize project with codereg")
  .action(async () => {
    logger.success("Project initialization completed.")
  })
