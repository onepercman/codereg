import fs from "fs/promises"
import path from "path"

// for example
export async function writeJsonFile(info: any) {
  const filePath = path.resolve(process.cwd(), `${info.name}.json`)
  const data = {
    name: info.name,
    description: info.description,
    createdAt: new Date().toISOString(),
  }
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8")
  return filePath
}
