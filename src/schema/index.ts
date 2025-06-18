import { z } from "zod"

export const sourceSchema = z.object({
  name: z.string(),
  url: z.string(),
})

export const registrySchema = z.object({
  name: z.string().describe("The unique name of the registry (e.g., 'ui')"),
  url: z.string().url().describe("The URL of the GitHub repository"),
  dirname: z
    .string()
    .describe(
      "Destination directory path in the local project where files from this registry will be copied",
    ),
})

export const configSchema = z
  .object({
    $schema: z.string().url().optional(),
    registry: z
      .array(registrySchema)
      .describe(
        "List of registry entries containing repository and source definitions",
      ),
  })
  .strict()
