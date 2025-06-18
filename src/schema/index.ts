import { z } from "zod"

export const sourceSchema = z.object({
  name: z.string(),
  url: z.string(),
})

export const registrySchema = z.object({
  name: z.string(),
  url: z.string(),
  dirname: z.string(),
  sources: z.array(sourceSchema),
})

export const configSchema = z.object({
  registry: z.array(registrySchema),
})
