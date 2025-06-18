#!/usr/bin/env node
import { add } from "@/commands/add"
import { init } from "@/commands/init"
import { Command } from "commander"
import packageJson from "../package.json"

const program = new Command()
  .name("codereg")
  .version(packageJson.version, "-v, --version", "display the version number")
  .description("Code Registry CLI")

program.addCommand(init)
program.addCommand(add)

// Add help text with examples
program.addHelpText(
  "after",
  `
Examples:
  $ codereg add --registry my-registry --file example.ts
  $ codereg add -r my-registry -f example.ts -b develop
  $ codereg add -r my-registry -p src/components
  $ codereg add --help

Options for add command:
  -r, --registry <name>    Registry name defined in config
  -f, --file <name>       File name to fetch
  -b, --branch <branch>   Branch name (default: main)
  -p, --path <path>       Path from repository root to the code directory
`,
)

program.parse()
