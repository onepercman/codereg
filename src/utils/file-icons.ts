/**
 * ANSI Color codes for terminal output
 */
const COLORS = {
  reset: "\x1b[0m",
  yellow: "\x1b[33m", // JavaScript
  blue: "\x1b[34m", // TypeScript
  cyan: "\x1b[36m", // React
  magenta: "\x1b[35m", // CSS/Styling
  green: "\x1b[32m", // Data/Config
  red: "\x1b[31m", // HTML
  white: "\x1b[37m", // Documentation
  brightGreen: "\x1b[92m", // Environment
  brightBlue: "\x1b[94m", // Scripts
  brightYellow: "\x1b[93m", // Media
  brightMagenta: "\x1b[95m", // Images
  brightCyan: "\x1b[96m", // Database
  gray: "\x1b[90m", // Logs/Misc
} as const

/**
 * Map file extensions to their corresponding colors
 */
const FILE_EXTENSION_COLORS: Record<string, string> = {
  // JavaScript/TypeScript
  js: COLORS.yellow,
  ts: COLORS.blue,
  jsx: COLORS.cyan,
  tsx: COLORS.cyan,

  // Web technologies
  html: COLORS.red,
  css: COLORS.magenta,
  scss: COLORS.magenta,
  sass: COLORS.magenta,

  // Data & Config
  json: COLORS.green,
  yml: COLORS.green,
  yaml: COLORS.green,
  xml: COLORS.green,

  // Documentation
  md: COLORS.white,

  // Environment & Scripts
  env: COLORS.brightGreen,
  sh: COLORS.brightBlue,

  // Programming languages
  py: COLORS.brightGreen,
  java: COLORS.red,
  c: COLORS.blue,
  h: COLORS.blue,
  cpp: COLORS.brightBlue,
  rs: COLORS.red,
  go: COLORS.brightCyan,
  php: COLORS.magenta,

  // Database
  sql: COLORS.brightCyan,

  // Images
  svg: COLORS.brightMagenta,
  png: COLORS.brightMagenta,
  jpg: COLORS.brightMagenta,
  jpeg: COLORS.brightMagenta,
  gif: COLORS.brightMagenta,
  webp: COLORS.brightMagenta,

  // Media
  mp3: COLORS.brightYellow,
  wav: COLORS.brightYellow,
  mp4: COLORS.brightYellow,
  webm: COLORS.brightYellow,

  // Special files
  lock: COLORS.gray,
  log: COLORS.gray,
}

/**
 * Map file extensions to their corresponding emoji icons
 */
const FILE_EXTENSION_ICONS: Record<string, string> = {
  // JavaScript/TypeScript
  js: "🟨",
  ts: "🔵",
  jsx: "⚛️",
  tsx: "⚛️",

  // Web technologies
  html: "🌐",
  css: "🎨",
  scss: "💅",
  sass: "💅",

  // Data & Config
  json: "📦",
  yml: "⚙️",
  yaml: "⚙️",
  xml: "📰",

  // Documentation
  md: "📝",

  // Environment & Scripts
  env: "🌱",
  sh: "🐚",

  // Programming languages
  py: "🐍",
  java: "☕",
  c: "🔧",
  h: "🔧",
  cpp: "💠",
  rs: "🦀",
  go: "🌀",
  php: "🐘",

  // Database
  sql: "🗃️",

  // Images
  svg: "🖼️",
  png: "🖼️",
  jpg: "🖼️",
  jpeg: "🖼️",
  gif: "🖼️",
  webp: "🖼️",

  // Media
  mp3: "🎵",
  wav: "🎵",
  mp4: "🎞️",
  webm: "🎞️",

  // Special files
  lock: "🔒",
  log: "📄",
}

// Special filename patterns that need to be checked before extension
const SPECIAL_FILES: Record<string, { emoji: string; color: string }> = {
  Dockerfile: { emoji: "🐳", color: COLORS.blue },
  ".gitignore": { emoji: "🙈", color: COLORS.gray },
  ".dockerignore": { emoji: "🙈", color: COLORS.gray },
}

// Special patterns that contain multiple dots
const SPECIAL_PATTERNS: { pattern: RegExp; emoji: string; color: string }[] = [
  {
    pattern: /\.test\.(ts|js|tsx|jsx)$/,
    emoji: "🧪",
    color: COLORS.brightGreen,
  },
  { pattern: /\.config\.(js|ts|json)$/, emoji: "⚙️", color: COLORS.green },
  {
    pattern: /\.spec\.(ts|js|tsx|jsx)$/,
    emoji: "🧪",
    color: COLORS.brightGreen,
  },
  { pattern: /package\.json$/, emoji: "📦", color: COLORS.green },
  { pattern: /package-lock\.json$/, emoji: "🔒", color: COLORS.gray },
  { pattern: /yarn\.lock$/, emoji: "🔒", color: COLORS.gray },
  { pattern: /pnpm-lock\.yaml$/, emoji: "🔒", color: COLORS.gray },
]

const DEFAULT_ICON = "📄"
const DEFAULT_COLOR = COLORS.white

/**
 * Get emoji icon for a file based on its extension
 * @param fileName - The file name including extension
 * @returns The corresponding emoji icon
 */
export function getFileIcon(fileName: string): string {
  // Check special files first (exact filename match)
  if (SPECIAL_FILES[fileName]) {
    return SPECIAL_FILES[fileName].emoji
  }

  // Check special patterns (like .test.ts, .config.js, etc.)
  for (const { pattern, emoji } of SPECIAL_PATTERNS) {
    if (pattern.test(fileName)) {
      return emoji
    }
  }

  // Extract extension
  const extension = fileName.split(".").pop()?.toLowerCase()

  if (!extension) {
    return DEFAULT_ICON
  }

  return FILE_EXTENSION_ICONS[extension] || DEFAULT_ICON
}

/**
 * Get color for a file based on its extension
 * @param fileName - The file name including extension
 * @returns The corresponding ANSI color code
 */
export function getFileColor(fileName: string): string {
  // Check special files first (exact filename match)
  if (SPECIAL_FILES[fileName]) {
    return SPECIAL_FILES[fileName].color
  }

  // Check special patterns (like .test.ts, .config.js, etc.)
  for (const { pattern, color } of SPECIAL_PATTERNS) {
    if (pattern.test(fileName)) {
      return color
    }
  }

  // Extract extension
  const extension = fileName.split(".").pop()?.toLowerCase()

  if (!extension) {
    return DEFAULT_COLOR
  }

  return FILE_EXTENSION_COLORS[extension] || DEFAULT_COLOR
}

/**
 * Get formatted display name with emoji and colored filename
 * @param fileName - The file name including extension
 * @returns Formatted string with emoji and colored filename
 */
export function getFileDisplayName(fileName: string): string {
  const icon = getFileIcon(fileName)
  const color = getFileColor(fileName)
  return `${icon} ${color}${fileName}${COLORS.reset}`
}
