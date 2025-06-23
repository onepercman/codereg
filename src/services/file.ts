import fs from "fs/promises"
import path from "path"

/**
 * Checks if a file exists at the given path.
 * @param filePath Absolute or relative file path
 * @returns Promise<boolean>
 */
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

/**
 * Ensures the directory for the given file path exists.
 * @param filePath File path whose directory should be created
 */
export async function ensureDir(filePath: string): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
}

/**
 * Reads a text file, returns its content as string.
 * @param filePath File path
 */
export async function readTextFile(filePath: string): Promise<string> {
  return fs.readFile(filePath, "utf-8")
}

/**
 * Writes text to a file, ensuring the directory exists first.
 * @param filePath File path
 * @param content Text content
 */
export async function safeWriteFile(
  filePath: string,
  content: string,
): Promise<void> {
  await ensureDir(filePath)
  await fs.writeFile(filePath, content, "utf-8")
}
