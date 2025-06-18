# CodeReg

A powerful command-line tool for copying and managing source code directly from GitHub repositories. Instead of installing libraries as dependencies, CodeReg allows you to copy specific source code files into your project, giving you full control over the code and making it easier to customize.

## Key Features

- Copy source code directly from GitHub repositories instead of installing packages
- Perfect for modern React UI libraries that share source code rather than bundled packages
- Interactive GUI-like CLI interface for easy code registration
- Registry-based configuration system for managing multiple code sources
- Support for copying any public files from GitHub repositories
- Easy customization of copied code since it's directly in your project
- Branch and path-specific code copying
- Progress indicators and interactive prompts

## Why CodeReg?

In modern web development, especially with React UI libraries, there's a growing trend of sharing source code instead of bundled packages. This approach offers several advantages:

- Full control over the code in your project
- Easy customization and modification
- No need to deal with complex bundling configurations
- Direct access to source code for debugging and learning
- Ability to modify and adapt code to your specific needs

CodeReg makes this workflow seamless by providing a simple way to copy and manage source code from GitHub repositories.

## Installation

### Global Installation

You can install CodeReg globally using pnpm:

```bash
pnpm add -g codereg
```

### Local Project Installation

To install CodeReg as a development dependency in your project:

```bash
pnpm add -D codereg
```

After local installation, you can use it in your project's scripts in `package.json`:

```json
{
  "scripts": {
    "register": "codereg"
  }
}
```

Then run it using:

```bash
pnpm register
```

Or use it directly with npx:

```bash
npx codereg
```

## Usage

### Basic Commands

#### Initialize Project

Initialize a new CodeReg project in your current directory:

```bash
npx codereg init
```

This will create a default configuration file `.codereg.config.json` in your project root.

Example configuration:

```json
{
  "$schema": "https://cdn.jsdelivr.net/npm/codereg/dist/config.schema.json",
  "registry": [
    {
      "name": "ui", // name your entry
      "url": "https://github.com/xxx/ui",
      "branch": "main", // optional
      "path": "/packages/ui/src", // optional
      "dirname": "./components"
    }
  ]
}
```

#### Add Registration

Add a new code registration using the interactive CLI:

```bash
codereg add
```

The interactive prompt will guide you through:

- Selecting the registry
- Choosing the branch
- Specifying the source path
- Selecting files to copy
- Setting the destination directory

### Command Options

#### Add Command with options

```bash
codereg add -r ui -b main -p /packages/ui/src -f button.tsx
```

### Common Flags

- `-r, --registry`: Specify the registry name to add (e.g., 'ui')
- `-b, --branch`: Specify the branch name (e.g., 'main')
- `-p, --path`: Specify the source path in the registry (e.g., '/packages/ui/src')
- `-f, --file`: Specify the file to register (e.g., 'button.tsx')
- `--help` or `-h`: Show help information
- `--version` or `-V`: Show version information

## Use Cases

### React UI Libraries

CodeReg is particularly useful for modern React UI libraries that share source code. Instead of installing the entire package, you can copy only the components you need and customize them directly in your project.

### Custom Code Management

- Copy utility functions from public repositories
- Share code between projects
- Maintain a local registry of commonly used code snippets
- Version control your custom code modifications

### Learning and Experimentation

- Study and learn from open-source code
- Experiment with different implementations
- Create your own modified versions of existing code

## Development

### Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm

### Setup

1. Clone the repository:

```bash
git clone https://github.com/onepercman/codereg.git
cd codereg
```

2. Install dependencies:

```bash
pnpm install
```

### Available Scripts

- `pnpm build` - Build the project
- `pnpm dev` - Start development mode with watch
- `pnpm start` - Run the built project
- `pnpm test` - Run tests

### Building

To build the project:

```bash
pnpm build
```

This will create the distribution files in the `dist` directory.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Author

- onepercman

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/onepercman/codereg/issues) on GitHub.
