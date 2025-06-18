#!/usr/bin/env node
import { init } from "@/commands/init"
import { Command } from "commander"
import packageJson from "../package.json"

const program = new Command()
  .name("codereg")
  .version(packageJson.version, "-v, --version", "display the version number")
  .description("Code Registry CLI")

program.addCommand(init)

program.parse()
