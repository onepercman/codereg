# CodeReg

A powerful command-line tool for code registration and management.

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

## Features

- Command-line interface for code registration
- Configuration management
- Interactive prompts
- Progress indicators

## Usage

### Basic Commands

#### Initialize Project

Initialize a new CodeReg project in your current directory:

```bash
npx codereg init
```

This will create a default configuration file `.codereg.config.json` in your project root.

for example:

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

Add a new code registration:

```bash
codereg add
```

This will start an interactive prompt to guide you through the registration process.

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
