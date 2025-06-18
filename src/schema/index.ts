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
  path: z
    .string()
    .describe(
      "Path from repository root to the directory containing source code",
    )
    .optional(),
  branch: z
    .string()
    .describe(
      "The branch name to use when fetching files from the repository (default: main)",
    )
    .optional(),
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
