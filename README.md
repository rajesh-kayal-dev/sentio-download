# Sentio CLI
Sentio is a high-performance, agentic AI command-line interface designed to streamline developer workflows. It provides a standalone, zero-dependency environment for interacting with advanced AI models directly from your terminal.

## Key Features
- Standalone Execution: No Node.js or external runtime required.
- Secure Authentication: OAuth2 device-flow for seamless and secure access.
- Remote AI Processing: Optimized for low-latency responses without local compute requirements.
- Cross-Platform Support: Native binaries for Windows, macOS, and Linux.

## Installation

### Windows
1. Download the SentioCLI_Setup_Win.exe installer.
2. Run the installer and follow the on-screen instructions.
3. The installer will automatically configure your system PATH.
4. Restart your terminal and type `sentio` to begin.

### macOS and Linux
1. Download the appropriate binary for your architecture (sentio-macos or sentio-linux).
2. Grant execution permissions to the file:
   ```bash
   chmod +x sentio-macos
   ```
3. (Optional) Move the binary to a directory in your PATH for global access:
   ```bash
   sudo mv sentio-macos /usr/local/bin/sentio
   ```
4. Run `sentio` in your terminal to verify installation.

## Quick Start
To begin using Sentio, you must first authenticate your machine:

1. Execute the login command:
   ```bash
   sentio login
   ```
2. A unique device code will be displayed. Visit the provided URL and enter the code to authorize your session.
3. Once authorized, start the assistant:
   ```bash
   sentio start
   ```

## Available Commands
- sentio login: Authenticate your device with your Sentio account.
- sentio start: Launch the interactive AI assistant workspace.
- sentio whoami: Display information about the currently active session.
- sentio logout: Revoke access and remove local credentials.
- sentio --help: View detailed usage information and options.

## Technical Support
For documentation and support, please visit our official dashboard at https://sentio-cli.vercel.app.

Copyright (c) 2026 Sentio Systems Inc. All rights reserved.
